import React, {useState, useContext } from 'react'
import styled, {css} from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import ImgSlider from '../shared/ImgSlider'
import {useForm} from '../../hooks/useForm'
import FormButton from '../formElements/FormButton'
import FormInput from '../formElements/FormInput'
import FormSelect from '../formElements/FormSelect'
import FormDatePicker from '../formElements/FormDatePicker'
import imgIcon from '../../assets/image-icon.jpg'
import {AuthContext} from '../../context/AuthContext'

const initialState = {
    type: "apartment",
    available_date: null,
    address: {
        street: undefined,
        city: undefined,
        state: undefined,
        zip: undefined
    },
    details: {
        rent: [undefined, undefined],
        beds: [undefined, undefined],
        baths: [undefined, undefined],
        size: [undefined, undefined],
        dogs: false,
        cats: false,
        neighborhood: undefined,
        parking: undefined,
        laundry: undefined,
        utilities: undefined
    }
}

const stateAbbrevs = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
]

const PropertyForm = ({multi}) => {
    const [state, dispatch, handleInputChange, handleInputChangeNested, handleMinMaxChange] = useForm(initialState);
    const { type, available_date, address, details, creator } = state;
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [ formErrorMsg, setFormErrorMsg ] = useState(null);
    const authContext = useContext(AuthContext);

    function handleSelectFiles(e) {
        let files = e.target.files; //this is a FileList
        files = [...files]; //convert FileList to Array
        //only set selectedFiles if they are in jpeg OR png AND 300kb or less, otherwise display error message
        if (files.some(file => (!(file.type === 'image/jpeg' || file.type == 'image/png')))) {
            setFormErrorMsg('Photos must be .jpeg, .jpg, or .png format')
            return
        } else if (files.some(file => file.size > 300000)) {
            setFormErrorMsg('Photos must be 300kb or smaller')
            return
        } else {
            setFormErrorMsg(null)
            setSelectedFiles(files);
        }
    }

    /*
    Gatekeepers on submit:
    1.) Check if logged in && isLister -> if no, setFormErrorMsg('must log in...')
    2.) Check if photos -> if no, setFormErrorMsg('pics required...')
    */

    async function handleSubmit(e) {
        e.preventDefault();
        setFormErrorMsg(null);
        if (!authContext.user || !authContext.user.isLister) return setFormErrorMsg('You must be logged in as a Listing Agent/Property Manager to create a listing.')
        if (!selectedFiles || selectedFiles.length < 4) return setFormErrorMsg('At least 4 photos are required for every listing.  Otherwise what\'s the point?')

        try {
            let formData = new FormData();
            formData.append('type', JSON.stringify(type));
            formData.append('available_date', JSON.stringify(available_date));
            formData.append('address', JSON.stringify({ 
                ...address,
                street: address.street.trim(),
                city: address.city.trim(),
            }));
            formData.append('details', JSON.stringify({
                rent: details.rent,
                beds: details.beds,
                baths: details.baths,
                size: details.size,
                pet_policy: { dogs: details.dogs, cats: details.cats },
                neighborhood: details.neighborhood,
                laundry: details.laundry,
                utilities: details.utilities,
                parking: details.parking
            }));
            selectedFiles.forEach(file => formData.append('photos', file, `${uuidv4() + file.name}`));
            console.log(authContext.user.token);
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/properties/new`,
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${authContext.user.token}`
                    }
                }
            );
            const data = await response.json();
            if (response.status !== 201) throw new Error(data.message);
            console.log(data);
        } catch(err) {
            setFormErrorMsg(err.message);
            console.log(err);
        }
    }

    //convert FileList to array, to pass down to ImgSlider
    function getImgArr() {
        return selectedFiles.map(file => {
            let image = { src: URL.createObjectURL(file) };
            return image;
        });
    }

    console.log(state);

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormSection>
                    <h3>Property Address</h3>
                    <FormInput 
                        labelText="Street Address" 
                        id="address-street" 
                        name="street" 
                        placeholder="Street" 
                        type="text" 
                        value={address.street}
                        onChange={(e) => handleInputChangeNested(e,'address')}
                        required
                    />
                    <FormInput 
                        labelText="City" 
                        id="address-city" 
                        name="city" 
                        placeholder="City" 
                        type="text" 
                        value={address.city}
                        onChange={(e) => handleInputChangeNested(e, 'address')}
                        required
                    />
                    <SplitContainer>
                        <FormSelect 
                            labelText="State" 
                            labelHidden
                            id="address-state" 
                            name="state" 
                            placeholder="Select State"
                            onChange={(e) => handleInputChangeNested(e, 'address')}
                            required
                        >
                            {stateAbbrevs.map(abbrev => <option value={abbrev} key={abbrev}>{abbrev}</option>)}
                        </FormSelect>
                        <FormInput 
                            labelText="ZIP Code" 
                            id="address-zip" 
                            name="zip" 
                            placeholder="ZIP Code" 
                            type="text" 
                            value={address.zip}
                            onChange={(e) => handleInputChangeNested(e, 'address')}
                            required
                        />    
                    </SplitContainer>
                </FormSection>
                <FormSection border> 
                    <h3>Property Details</h3>

                    <FormSelect
                        labelText="Property Type"
                        showLabel
                        id="type"
                        name="type"
                        placeholder="Select Property Type"
                        onChange={(e) => handleInputChange(e, false)}
                        required
                    >
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="house">House</option>
                    </FormSelect> 
                    <FormDatePicker 
                        id="available-date"
                        name="available_date"
                        stateValue={available_date} 
                        dispatch={dispatch} 
                        minDate={new Date()}
                        placeholderText="Available Date"
                        className="datepicker"
                        labelText="Available Date"
                        showLabel
                        required
                    />
                    {
                        multi ?

                        (<>
                            <FormInput
                                name="rent"
                                type="number"
                                value={details.rent}
                                placeholder="Monthly $$$"
                                labelText="Rent"
                                showLabel
                                onChange={[ 
                                    (e) => handleMinMaxChange(e, 'details', true), 
                                    (e) => handleMinMaxChange(e, 'details', false) 
                                ]}
                                required
                                minmax
                            />
                            <FormInput
                                name="size"
                                type="number"
                                value={details.size}
                                placeholder="Sq. Ft."
                                labelText="Square Footage"
                                showLabel
                                onChange={[ 
                                    (e) => handleMinMaxChange(e, 'details', true), 
                                    (e) => handleMinMaxChange(e, 'details', false) 
                                ]}
                                required
                                minmax
                            />
                            <FormInput
                                id="details-beds"
                                name="beds"
                                type="number"
                                value={details.beds}
                                placeholder="# of BDs"
                                labelText="Bedrooms"
                                showLabel
                                onChange={[ 
                                    (e) => handleMinMaxChange(e, 'details', true), 
                                    (e) => handleMinMaxChange(e, 'details', false) 
                                ]}
                                required
                                minmax
                            />
                            <FormInput
                                id="details-baths"
                                name="baths"
                                type="number"
                                value={details.baths}
                                placeholder="# of BAs"
                                labelText="Bathrooms"
                                showLabel
                                onChange={[ 
                                    (e) => handleMinMaxChange(e, 'details', true), 
                                    (e) => handleMinMaxChange(e, 'details', false) 
                                ]}
                                required
                                minmax
                            />
                        </>) 

                        :
                        
                        (<SplitContainer>
                            <FormInput
                                id="details-rent"
                                name="rent"
                                type="number"
                                value={details.rent[0]}
                                placeholder="Monthly $$$"
                                labelText="Rent"
                                showLabel
                                onChange={(e) => handleInputChangeNested(e, 'details', true)}
                                required
                            />
                            <FormInput
                                id="details-size"
                                name="size"
                                type="number"
                                value={details.size[0]}
                                placeholder="Sq. Ft."
                                labelText="Square Footage"
                                showLabel
                                onChange={(e) => handleInputChangeNested(e, 'details', true)}
                                required
                            />
                            <FormInput
                                id="details-beds"
                                name="beds"
                                type="number"
                                value={details.beds[0]}
                                placeholder="# of BDs"
                                labelText="Bedrooms"
                                showLabel
                                onChange={(e) => handleInputChangeNested(e, 'details', true)}
                                required
                            />
                            <FormInput
                                id="details-baths"
                                name="baths"
                                type="number"
                                value={details.baths[0]}
                                placeholder="# of BAs"
                                labelText="Bathrooms"
                                showLabel
                                onChange={(e) => handleInputChangeNested(e, 'details', true)}
                                required
                            />
                        </SplitContainer>)
                    }
                    <SplitContainer>
                        <FormSelect
                            labelText="Dogs Allowed?"
                            showLabel
                            id="details-dogs"
                            name="dogs"
                            placeholder="Select Dog Policy"
                            onChange={(e) => handleInputChangeNested(e, 'details')}
                            required
                        >
                            <option value={true}>Dogs welcome</option>
                            <option value={false}>No Dogs</option>
                        </FormSelect>
                        <FormSelect
                            labelText="Cats Allowed?"
                            showLabel
                            id="details-cats"
                            name="cats"
                            placeholder="Select Cat Policy"
                            onChange={(e) => handleInputChangeNested(e, 'details')}
                            required
                        >
                            <option value={true}>Cats welcome</option>
                            <option value={false}>No Cats</option>
                        </FormSelect>
                        <FormSelect
                            labelText="Parking Facilities"
                            showLabel
                            id="details-parking"
                            name="parking"
                            placeholder="Select Parking Options"
                            onChange={(e) => handleInputChangeNested(e, 'details')}
                            required
                        >
                            <option value="street">On-Street</option>
                            <option value="gated">Gated Lot</option>
                            <option value="garage">Covered Garage</option>
                        </FormSelect>
                        <FormSelect
                            labelText="Laundry Options"
                            showLabel
                            id="details-laundry"
                            name="laundry"
                            placeholder="Select Laundry Options"
                            onChange={(e) => handleInputChangeNested(e, 'details')}
                            required
                        >
                            <option value="in unit">In-Unit</option>
                            <option value="shared">Shared On-Site</option>
                            <option value="none">None</option>
                        </FormSelect>
                        <FormSelect
                            labelText="Utiities Required"
                            showLabel
                            id="details-utilities"
                            name="utilities"
                            placeholder="Specify Required Utilities"
                            onChange={(e) => handleInputChangeNested(e, 'details')}
                            required
                        >
                            <option value="electric">Electric Only</option>
                            <option value="gas">Gas Only</option>
                            <option value="both">Electric and Gas</option>
                        </FormSelect>
                    </SplitContainer>
                </FormSection> 
                <FormSection border>
                    <PreviewDiv>
                        <h3>Upload Photos and Review</h3>
                        {!selectedFiles ? <PreviewDivFiller /> : <ImgSlider images={getImgArr()}/>}
                    </PreviewDiv>
                    <ImageUploadLabel htmlFor="propertyImgUpload" bg="black">SELECT PHOTOS</ImageUploadLabel>
                    <FileInput id="propertyImgUpload" type="file" multiple accept=".png, .jpg, .jpeg" onChange={handleSelectFiles} /> 
                </FormSection>
                <FormSection border>
                    <FormButton type="submit">SUBMIT LISTING</FormButton>
                </FormSection>
            </Form>
            {formErrorMsg && <FormError>{formErrorMsg}</FormError>}
        </Container>
    )
}

export default PropertyForm


const Container = styled.div`
    width: 100%;
    padding: 1rem;
    border: 2px solid rgba(0,0,0,.2);
    border-radius: 3px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
`
const SplitContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`
const Form = styled.form`
    width: 100%;
`

const FormSection = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
    border-top: ${props => props.border ? '2px solid rgba(0,0,0,.2)' : 'none'};
    padding: 1rem 0;
    h3 {
        font-size: 1.3rem;
        margin: .5rem 0;
        text-align: center;
    }
`

const Fieldset = styled.fieldset`
    height: 100%;
`

const ImageUploadLabel = styled.label`
    width: 100%;
    background-color: ${props => props.bg || 'var(--primary-color)'};
    color: ${props => props.color || 'white'};
    text-align: center;
    font-family: 'Roboto';
    font-size: 1.1rem;
    line-height: 2;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`

const FileInput = styled.input`
    display: none;
`
const PreviewDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const PreviewDivFiller = styled.div`
    width: 100%;
    height: 300px;
    background: url(${imgIcon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
`

const FormError = styled.p`
    padding: .5rem;
    color: red;
    font-weight: bold;
    font-size: 1rem;
    width: 100%;
`