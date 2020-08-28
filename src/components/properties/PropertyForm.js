import React, {useState, useEffect} from 'react'
import styled, {css} from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import ImgSlider from '../shared/ImgSlider'
import {useForm} from '../../hooks/useForm'
import FormButton from '../formElements/FormButton'
import FormInput from '../formElements/FormInput'
import FormSelect from '../formElements/FormSelect'
import FormDatePicker from '../formElements/FormDatePicker'
import imgIcon from '../../assets/image-icon.jpg'

const initialState = {
    type: "apartment",
    available_date: null,
    multiple_units: false,
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
    },
    photos: [],
    creator: 'Shin'
}

const stateAbbrevs = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
]

const PropertyForm = ({multi}) => {
    const [state, dispatch, handleInputChange, handleInputChangeNested, handleMinMaxChange] = useForm(initialState);
    const { type, multiple_units, available_date, address, photos, details, creator } = state;

    const [selectedFiles, setSelectedFiles] = useState(null);
    const [inputError, setInputError] = useState({ });

    console.log(state);

    function handleSelectFiles(e) {
        let files = e.target.files; //this is a FileList
        files = [...files]; //convert FileList to Array
        if (files.every(file => (file.type === "image/png" || file.type == "image/jpeg"))) {
            setSelectedFiles(files);
            setInputError({ ...inputError, imageFormat: false })
        } else {
            setInputError({ ...inputError, imageFormat: true })
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let formData = new FormData();
            formData.append('type', JSON.stringify(type));
            formData.append('available_date', JSON.stringify(available_date));
            formData.append('address', JSON.stringify(address));
            formData.append('details', JSON.stringify({...details, pet_policy: { dogs: details.dogs, cats: details.cats }}));
            selectedFiles.forEach(file => formData.append('photos', file, `${uuidv4() + file.name}`))
            formData.append('creator', JSON.stringify(creator));

            const response = await fetch(
                'http://localhost:5000/api/properties/new',
                {
                    method: 'POST',
                    body: formData
                }
            );
            const createdProperty = await response.json();
            console.log(createdProperty);
        } catch(err) {
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

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormSection>
                    <h3>Property Address</h3>
                    <FormInput 
                        labelText="Street Address" 
                        id="address-street" 
                        name="address_street" 
                        placeholder="Street" 
                        type="text" 
                        value={address.street}
                        onChange={(e) => handleInputChangeNested(e,'address', 'street')}
                        required
                    />
                    <FormInput 
                        labelText="City" 
                        id="address-city" 
                        name="address_city" 
                        placeholder="City" 
                        type="text" 
                        value={address.city}
                        onChange={(e) => handleInputChangeNested(e, 'address', 'city')}
                        required
                    />
                    <SplitContainer>
                        <FormSelect 
                            labelText="State" 
                            labelHidden
                            id="address-state" 
                            name="address_state" 
                            placeholder="Select State"
                            onChange={(e) => handleInputChangeNested(e, 'address', 'state')}
                            required
                        >
                            {stateAbbrevs.map(abbrev => <option value={abbrev} key={abbrev}>{abbrev}</option>)}
                        </FormSelect>
                        <FormInput 
                            labelText="ZIP Code" 
                            id="address-zip" 
                            name="address_zip" 
                            placeholder="ZIP Code" 
                            type="number" 
                            value={address.zip}
                            onChange={(e) => handleInputChangeNested(e, 'address', 'zip')}
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
                                name="details_rent"
                                type="number"
                                value={details.rent}
                                placeholder="Monthly $$$"
                                labelText="Rent"
                                showLabel
                                onChange={[ 
                                    (e) => handleMinMaxChange(e, 'details', 'rent', true), 
                                    (e) => handleMinMaxChange(e, 'details', 'rent', false) 
                                ]}
                                required
                                minmax
                            />
                            <FormInput
                                name="details_size"
                                type="number"
                                value={details.size}
                                placeholder="Sq. Ft."
                                labelText="Square Footage"
                                showLabel
                                onChange={[ 
                                    (e) => handleMinMaxChange(e, 'details', 'size', true), 
                                    (e) => handleMinMaxChange(e, 'details', 'size', false) 
                                ]}
                                required
                                minmax
                            />
                            <FormInput
                                id="details-beds"
                                name="details_beds"
                                type="number"
                                value={details.beds}
                                placeholder="# of BDs"
                                labelText="Bedrooms"
                                showLabel
                                onChange={[ 
                                    (e) => handleMinMaxChange(e, 'details', 'beds', true), 
                                    (e) => handleMinMaxChange(e, 'details', 'beds', false) 
                                ]}
                                required
                                minmax
                            />
                            <FormInput
                                id="details-baths"
                                name="details_baths"
                                type="number"
                                value={details.baths}
                                placeholder="# of BAs"
                                labelText="Bathrooms"
                                showLabel
                                onChange={[ 
                                    (e) => handleMinMaxChange(e, 'details', 'baths', true), 
                                    (e) => handleMinMaxChange(e, 'details', 'baths', false) 
                                ]}
                                required
                                minmax
                            />
                        </>) 

                        :
                        
                        (<SplitContainer>
                            <FormInput
                                id="details-rent"
                                name="details_rent"
                                type="number"
                                value={details.rent[0]}
                                placeholder="Monthly $$$"
                                labelText="Rent"
                                showLabel
                                onChange={(e) => handleInputChangeNested(e, 'details', 'rent', true)}
                                required
                            />
                            <FormInput
                                id="details-size"
                                name="details_size"
                                type="number"
                                value={details.size[0]}
                                placeholder="Sq. Ft."
                                labelText="Square Footage"
                                showLabel
                                onChange={(e) => handleInputChangeNested(e, 'details', 'size', true)}
                                required
                            />
                            <FormInput
                                id="details-beds"
                                name="details_beds"
                                type="number"
                                value={details.beds[0]}
                                placeholder="# of BDs"
                                labelText="Bedrooms"
                                showLabel
                                onChange={(e) => handleInputChangeNested(e, 'details', 'beds', true)}
                                required
                            />
                            <FormInput
                                id="details-baths"
                                name="details_baths"
                                type="number"
                                value={details.baths[0]}
                                placeholder="# of BAs"
                                labelText="Bathrooms"
                                showLabel
                                onChange={(e) => handleInputChangeNested(e, 'details', 'baths', true)}
                                required
                            />
                        </SplitContainer>)
                    }
                    <SplitContainer>
                        <FormSelect
                            labelText="Dogs Allowed?"
                            showLabel
                            id="details-dogs"
                            name="details_dogs"
                            placeholder="Select Dog Policy"
                            onChange={(e) => handleInputChangeNested(e, 'details', 'dogs')}
                            required
                        >
                            <option value={false}>No Dogs</option>
                            <option value={true}>Dogs welcome</option>
                        </FormSelect>
                        <FormSelect
                            labelText="Cats Allowed?"
                            showLabel
                            id="details-cats"
                            name="details_cats"
                            placeholder="Select Cat Policy"
                            onChange={(e) => handleInputChangeNested(e, 'details', 'cats')}
                            required
                        >
                            <option value={false}>No Cats</option>
                            <option value={true}>Cats welcome (but why?)</option>
                        </FormSelect>
                        <FormSelect
                            labelText="Parking Facilities"
                            showLabel
                            id="details-parking"
                            name="details_parking"
                            placeholder="Select Parking Options"
                            onChange={(e) => handleInputChangeNested(e, 'details', 'parking')}
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
                            name="details_laundry"
                            placeholder="Select Laundry Options"
                            onChange={(e) => handleInputChangeNested(e, 'details', 'laundry')}
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
                            name="details_utilities"
                            placeholder="Specify Required Utilities"
                            onChange={(e) => handleInputChangeNested(e, 'details', 'utilities')}
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
                        {inputError.imageFormat && <p>Images must be .png, .jpg, or .jpeg format</p>}
                        {!selectedFiles ? <PreviewDivFiller /> : <ImgSlider images={getImgArr()}/>}
                    </PreviewDiv>
                    <ImageUploadLabel htmlFor="propertyImgUpload" bg="black">SELECT PHOTOS</ImageUploadLabel>
                    <FileInput id="propertyImgUpload" type="file" multiple accept=".png, .jpg, .jpeg" onChange={handleSelectFiles} /> 
                </FormSection>
                <FormSection border>
                    <FormButton type="submit">SUBMIT LISTING</FormButton>
                </FormSection>
            </Form>
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