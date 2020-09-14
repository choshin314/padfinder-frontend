import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import {useForm} from '../../hooks/useForm'
import {useImageUpload} from '../../hooks/useImageUpload'
import LoadingModal from '../shared/LoadingModal'
import FormButton from '../formElements/FormButton'
import FormInput from '../formElements/FormInput'
import FormSelect from '../formElements/FormSelect'
import FormDatePicker from '../formElements/FormDatePicker'
import ImageUpload from '../formElements/ImageUpload'
import {AuthContext} from '../../context/AuthContext'

const stateAbbrevs = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
]

const validateForm = values => {
    let errors = {};
    if (!/^[0-9]{5}$/.test(values.zip)) {
        errors.zip = '5-digit ZIP code required'
    }
    if (values.neighborhood && values.neighborhood.length < 4) {
        errors.neighborhood = 'Must be at least 4 characters'
    }
    return errors;
}

const PropertyForm = ({multi, initialState, fetchConfig, updateMode}) => {
    const {selectedImages, imageSelectErr, handleImageSelect, getImageArr} = useImageUpload();
    const {inputValues, setInputValues, inputErrors, handleChange, validateAndSubmit, isSubmitting, otherErrors, setOtherErrors, resetForm } = useForm(initialState, submitForm, validateForm);
    const {type, available_date, street, city, state, zip, rent_min, rent_max, beds_min, beds_max, baths_min, baths_max, size_min, size_max, dogs, cats, neighborhood, parking, laundry, utilities} = inputValues;
    const authContext = useContext(AuthContext);
    const history = useHistory();

    function handleDateChange(date) {
        setInputValues({
            ...inputValues,
            available_date: date
        })
    }

    //rent, beds, baths, and size needs to be 2-value array even if property is single-unit
    function getMinMaxArr(min, max) {
        return (multi ? [min, max] : [min, min])
    }

    /*
    Gatekeepers on submit:
    1.) Check if logged in && isLister -> if no, setFormErrorMsg('must log in...')
    2.) Check if at least 3 photos are being uploaded.  
    */

    async function submitForm() {
        setOtherErrors(null);
        if (!authContext.user || !authContext.user.isLister) return setOtherErrors('You must be logged in as a Listing Agent/Property Manager to create a listing.')
        if (!selectedImages || selectedImages.length < 3) return setOtherErrors('At least 3 photos are required for every listing.')
        try {
            let formData = new FormData();
            formData.append('type', JSON.stringify(type));
            formData.append('available_date', JSON.stringify(available_date));
            formData.append('address', JSON.stringify({ 
                street: street.trim(),
                city: city.trim(),
                state,
                zip
            }));
            formData.append('details', JSON.stringify({
                rent: getMinMaxArr(rent_min, rent_max),
                beds: getMinMaxArr(beds_min, beds_max),
                baths: getMinMaxArr(baths_min, baths_max),
                size: getMinMaxArr(size_min, size_max),
                pet_policy: { dogs, cats },
                neighborhood,
                laundry,
                utilities,
                parking
            }));
            selectedImages.forEach(file => formData.append('photos', file, `${uuidv4() + file.name}`));

            const response = await fetch(
                fetchConfig.url,
                {
                    method: fetchConfig.method,
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${authContext.user.token}`
                    }
                }
            );
            const data = await response.json();
            if (response.status !== 201) throw new Error(data.message);
            history.push('/listings')
        } catch(err) {
            setOtherErrors(err.message);
        }
    }

    return (
        <Container>
            {isSubmitting && <LoadingModal />}
            <Form onSubmit={validateAndSubmit}>
                <FormSection>
                    <h3>Property Address</h3>
                    <FormInput 
                        labelText="Street Address" 
                        id="update-street" 
                        name="street" 
                        placeholder="Street" 
                        type="text" 
                        value={street}
                        errorMsg={inputErrors.street}
                        onChange={handleChange}
                        required
                    />
                    <FormInput 
                        labelText="City" 
                        id="update-city" 
                        name="city" 
                        placeholder="City" 
                        type="text" 
                        value={city}
                        errorMsg={inputErrors.city}
                        onChange={handleChange}
                        required
                    />
                    <SplitContainer>
                        <FormSelect 
                            labelText="State" 
                            labelHidden
                            id="update-state" 
                            name="state" 
                            placeholder="Select State"
                            onChange={handleChange}
                            required
                        >
                            {stateAbbrevs.map(abbrev => <option value={abbrev} key={abbrev}>{abbrev}</option>)}
                        </FormSelect>
                        <FormInput 
                            labelText="ZIP Code" 
                            id="update-zip" 
                            name="zip" 
                            placeholder="ZIP Code" 
                            type="text" 
                            value={zip}
                            errorMsg={inputErrors.zip}
                            onChange={handleChange}
                            required
                        />    
                    </SplitContainer>
                </FormSection>
                <FormSection border> 
                    <h3>Property Details</h3>

                    <FormSelect
                        labelText="Property Type"
                        showLabel
                        id="update-type"
                        name="type"
                        placeholder="Select Property Type"
                        onChange={handleChange}
                        required
                    >
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="single_family">House</option>
                    </FormSelect> 
                    <FormDatePicker 
                        id="update-available-date"
                        name="available_date"
                        stateValue={available_date} 
                        handleChange={handleDateChange}
                        minDate={new Date()}
                        placeholderText="Available Date"
                        className="datepicker"
                        labelText="Available Date"
                        showLabel
                        required
                    />
                    <FormInput
                        id="neighborhood"
                        name="neighborhood"
                        value={neighborhood}
                        errorMsg={inputErrors.neighborhood}
                        labelText="Neighborhood"
                        showLabel
                        placeholder={`e.g., "The Grove"`}
                        onChange={handleChange}
                    />

                    {
                        multi ?

                        (<SplitContainer>
                            <FormInput
                                name="rent_min"
                                type="number"
                                value={rent_min}
                                placeholder="Monthly $$$"
                                labelText="Min. Rent"
                                showLabel
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                name="rent_max"
                                type="number"
                                value={rent_max}
                                placeholder="Monthly $$$"
                                labelText="Max. Rent"
                                showLabel
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                name="size_min"
                                type="number"
                                value={size_min}
                                placeholder="Sq. Ft."
                                labelText="Min. Size"
                                showLabel
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                name="size_max"
                                type="number"
                                value={size_max}
                                placeholder="Sq. Ft."
                                labelText="Max Size"
                                showLabel
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                id="update-beds"
                                name="beds_min"
                                type="number"
                                value={beds_min}
                                placeholder="Beds"
                                labelText="Min. Bedrooms"
                                showLabel
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                id="update-beds"
                                name="beds_max"
                                type="number"
                                value={beds_max}
                                placeholder="Beds"
                                labelText="Max. Bedrooms"
                                showLabel
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                id="update-baths"
                                name="baths_min"
                                type="number"
                                value={baths_min}
                                placeholder="Baths"
                                labelText="Min. Bathrooms"
                                showLabel
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                id="update-baths"
                                name="baths_max"
                                type="number"
                                value={baths_max}
                                placeholder="Baths"
                                labelText="Max. Bathrooms"
                                showLabel
                                onChange={handleChange}
                                required
                            />
                        </SplitContainer>) 

                        :
                        
                        (<SplitContainer>
                            <FormInput
                                name="rent_min"
                                type="number"
                                value={rent_min}
                                placeholder="Monthly $$$"
                                labelText="Rent"
                                showLabel
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                name="size_min"
                                type="number"
                                value={size_min}
                                placeholder="Sq. Ft."
                                labelText="Size"
                                showLabel
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                id="update-beds"
                                name="beds_min"
                                type="number"
                                value={beds_min}
                                placeholder="Beds"
                                labelText="Bedrooms"
                                showLabel
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                id="update-baths"
                                name="baths_min"
                                type="number"
                                value={baths_min}
                                placeholder="Baths"
                                labelText="Bathrooms"
                                showLabel
                                onChange={handleChange}
                                required
                            />
                        </SplitContainer>)
                    }
                    <SplitContainer>
                        <FormSelect
                            labelText="Dogs Allowed?"
                            showLabel
                            id="update-dogs"
                            name="dogs"
                            placeholder="Select Dog Policy"
                            onChange={handleChange}
                            required
                        >
                            <option value={true}>Dogs welcome</option>
                            <option value={false}>No Dogs</option>
                        </FormSelect>
                        <FormSelect
                            labelText="Cats Allowed?"
                            showLabel
                            id="update-cats"
                            name="cats"
                            placeholder="Select Cat Policy"
                            onChange={handleChange}
                            required
                        >
                            <option value={true}>Cats welcome</option>
                            <option value={false}>No Cats</option>
                        </FormSelect>
                        <FormSelect
                            labelText="Parking Facilities"
                            showLabel
                            id="update-parking"
                            name="parking"
                            placeholder="Select Parking Options"
                            onChange={handleChange}
                            required
                        >
                            <option value="on street">On-Street</option>
                            <option value="gated lot">Gated Lot</option>
                            <option value="covered garage">Covered Garage</option>
                        </FormSelect>
                        <FormSelect
                            labelText="Laundry Options"
                            showLabel
                            id="update-laundry"
                            name="laundry"
                            placeholder="Select Laundry Options"
                            onChange={handleChange}
                            required
                        >
                            <option value="in unit">In-Unit</option>
                            <option value="shared on site">Shared On-Site</option>
                            <option value="none">None</option>
                        </FormSelect>
                        <FormSelect
                            labelText="Utiities Required"
                            showLabel
                            id="update-utilities"
                            name="utilities"
                            placeholder="Specify Required Utilities"
                            onChange={handleChange}
                            required
                        >
                            <option value="electric">Electric Only</option>
                            <option value="gas">Gas Only</option>
                            <option value="electric and gas">Electric and Gas</option>
                        </FormSelect>
                    </SplitContainer>
                </FormSection> 
                <FormSection border>
                    <ImageUpload
                        selectedImages={selectedImages}
                        handleSelect={handleImageSelect}
                        getImageArr={getImageArr}
                        errorMsg={imageSelectErr}
                    />
                </FormSection>
                <FormSection border>
                    <FormButton type="submit">SUBMIT {updateMode ? 'UPDATES' : 'LISTING'}</FormButton>
                </FormSection>
            </Form>
            {otherErrors && <FormError>{otherErrors}</FormError>}
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

const FormError = styled.p`
    padding: .5rem;
    color: red;
    font-weight: bold;
    font-size: 1rem;
    width: 100%;
`