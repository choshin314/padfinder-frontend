import React from 'react'

import FormInput from './FormInput'

const FormInputRange = ({baseId, baseName, values, placeholder, showLabel, onChange, required}) => {
    return (
        <>
        <FormInput 
            id={`${baseId}_min`}
            name={`${baseName}_min`}
            type="number"
            value={values[0]}
            placeholder={placeholder}
            labelText={`Min. ${baseName}`}
            showLabel={showLabel}
            onChange={onChange}
            required={required}
        />
        <FormInput 
            id={`${baseId}_max`}
            name={`${baseName}_max`}
            type="number"
            value={values[1]}
            placeholder={placeholder}
            labelText={`Max. ${baseName}`}
            showLabel={showLabel}
            onChange={onChange}
            required={required}
        />
        </>
    )
}

export default FormInputRange