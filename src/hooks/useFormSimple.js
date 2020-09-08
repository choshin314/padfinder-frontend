import {useState} from 'react'

export const useFormSimple = (initialState, submitCallback, validateForm) => {
    const [formValues, setFormValues] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const [backendError, setBackendError] = useState(null);

    function handleChange(e) {
        let { name, value, checked, type } = e.target;
        if (type === "checkbox") { value = checked };
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    function validateAndSubmit(e) {
        e.preventDefault();
        let errors = {};
        //run validation only if a validation argument was passed into the hook
        if (validateForm) {
            errors = validateForm(formValues); //returns errors object
            setFormErrors(errors);
        } 
        //if no errors, submit form, else exit operation and display errors
        Object.entries(errors).length === 0 && submitCallback(formValues)
    }
    //submitCallback is passed in as param to this hook - contains any form-specific submit handling logic
    
    function resetForm() {
        setFormValues({...initialState})
    }

    return { 
        formValues, 
        setFormValues,
        formErrors, 
        handleChange,
        validateAndSubmit, 
        backendError, 
        setBackendError, 
        resetForm 
    }
}