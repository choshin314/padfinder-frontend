import React from 'react'
import styled from 'styled-components'

import FormButton from '../formElements/FormButton'
import FormInput from '../formElements/FormInput'
import FormInputRange from '../formElements/FormInputRange'
import FormSelect from '../formElements/FormSelect'
import FormDatePicker from '../formElements/FormDatePicker'
import ImageUpload from '../formElements/ImageUpload'

const stateAbbrevs = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
]

const PropertyForm = ({multi, values, errors, handlers, updateMode, setUpdatingPhotos }) => {
    const {inputValues, selectedImages} = values;
    const {inputErrors, imageSelectErrors, otherErrors} = errors;
    const {handleChange, handleDateChange, handleImageSelect} = handlers;

    return (
        <Container>
            <FormSection>
                <h3>Property Address</h3>
                <FormInput 
                    labelText="Street Address" 
                    id="update-street" 
                    name="street" 
                    placeholder="Street" 
                    type="text" 
                    value={inputValues.street}
                    errorMsg={inputErrors.street}
                    onChange={handleChange}
                    required
                    disabled={updateMode}
                />
                <FormInput 
                    labelText="City" 
                    id="update-city" 
                    name="city" 
                    placeholder="City" 
                    type="text" 
                    value={inputValues.city}
                    errorMsg={inputErrors.city}
                    onChange={handleChange}
                    required
                    disabled={updateMode}
                />
                <SplitContainer>
                    <FormSelect 
                        labelText="State" 
                        labelHidden
                        id="update-state" 
                        name="state" 
                        value={inputValues.state}
                        errorMsg={inputErrors.state}
                        placeholder="Select State"
                        onChange={handleChange}
                        required
                        disabled={updateMode}
                    >
                        {stateAbbrevs.map(abbrev => <option value={abbrev} key={abbrev}>{abbrev}</option>)}
                    </FormSelect>
                    <FormInput 
                        labelText="ZIP Code" 
                        id="update-zip" 
                        name="zip" 
                        placeholder="ZIP Code" 
                        type="text" 
                        value={inputValues.zip}
                        errorMsg={inputErrors.zip}
                        onChange={handleChange}
                        required
                        disabled={updateMode}
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
                    value={inputValues.type}
                    errorMsg={inputErrors.type}
                    placeholder="Select Property Type"
                    onChange={handleChange}
                    required
                    disabled={updateMode}
                >
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="single_family">House</option>
                </FormSelect> 
                <FormDatePicker 
                    id="update-available-date"
                    name="available_date"
                    stateValue={inputValues.available_date} 
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
                    value={inputValues.neighborhood}
                    errorMsg={inputErrors.neighborhood}
                    labelText="Neighborhood"
                    showLabel
                    placeholder={`e.g., "The Grove"`}
                    onChange={handleChange}
                />
                <SplitContainer>
                    { multi ?
                    (<>
                        <FormInputRange 
                            baseId="rent"
                            baseName="rent"
                            values={[inputValues.rent_min, inputValues.rent_max]}
                            placeholder="Rent $"
                            showLabel
                            onChange={handleChange}
                            required
                        />
                        <FormInputRange
                            baseId="size"
                            baseName="size"
                            values={[inputValues.size_min, inputValues.size_max]}
                            placeholder="Sq. Ft."
                            showLabel
                            onChange={handleChange}
                            required
                        />
                        <FormInputRange
                            baseId="beds"
                            baseName="beds"
                            values={[inputValues.beds_min, inputValues.beds_max]}
                            placeholder="Beds"
                            showLabel
                            onChange={handleChange}
                            required
                        />
                        <FormInputRange
                            baseId="baths"
                            baseName="baths"
                            values={[inputValues.baths_min, inputValues.baths_max]}
                            placeholder="Baths"
                            showLabel
                            onChange={handleChange}
                            required
                        />
                    </>)
                    :
                    (<>
                        <FormInput
                            name="rent_min"
                            type="number"
                            value={inputValues.rent_min}
                            placeholder="Monthly $$$"
                            labelText="Rent"
                            showLabel
                            onChange={handleChange}
                            required
                        />
                        <FormInput
                            name="size_min"
                            type="number"
                            value={inputValues.size_min}
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
                            value={inputValues.beds_min}
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
                            value={inputValues.baths_min}
                            placeholder="Baths"
                            labelText="Bathrooms"
                            showLabel
                            onChange={handleChange}
                            required
                        />
                    </>)
                    }
                </SplitContainer>
                <SplitContainer>
                    <FormSelect
                        labelText="Dogs Allowed?"
                        showLabel
                        id="update-dogs"
                        name="dogs"
                        value={inputValues.dogs}
                        errorMsg={inputErrors.dogs}
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
                        value={inputValues.cats}
                        errorMsg={inputErrors.cats}
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
                        value={inputValues.parking}
                        errorMsg={inputErrors.parking}
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
                        value={inputValues.laundry}
                        errorMsg={inputErrors.laundry}
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
                        value={inputValues.utilities}
                        errorMsg={inputErrors.utilities}
                        placeholder="Specify Required Utilities"
                        onChange={handleChange}
                        required
                    >
                        <option value="electric">Electric Only</option>
                        <option value="electric and gas">Electric and Gas</option>
                    </FormSelect>
                </SplitContainer>
            </FormSection> 
            {!updateMode && (<FormSection border>
                <ImageUpload
                    selectedImages={selectedImages}
                    handleSelect={handleImageSelect}
                    errorMsg={imageSelectErrors}
                />
            </FormSection>)}
            <FormSection border>
                {updateMode && (
                    <>
                    <FormButton type="button" onClick={(e) => setUpdatingPhotos(true)}>CONTINUE TO ADD/DELETE PHOTOS</FormButton>
                    <CtrText>-OR-</CtrText>
                    </>
                )}
                <FormButton type="submit">SUBMIT {updateMode ? 'UPDATES' : 'LISTING'}</FormButton>
            </FormSection>
            {otherErrors && <FormError>{otherErrors}</FormError>}
        </Container>
    )
}

export default PropertyForm


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    color: var(--dark-grey);
`
const SplitContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`

const CtrText = styled.p`
    text-align: center;
    color: var(--primary-color);
    font-weight: bold;
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