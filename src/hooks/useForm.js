import {useState} from 'react'

import {useToggle} from './useToggle'

export const useForm = (initialState, submitCallback, validateForm) => {
    const [isSubmitting, toggleIsSubmitting] = useToggle();
    const [inputValues, setInputValues] = useState(initialState);
    const [inputErrors, setInputErrors] = useState({});
    const [otherErrors, setOtherErrors] = useState(null);

    function handleChange(e) {
        let { name, value, checked, type } = e.target;
        if (type === "checkbox") { value = checked };
        setInputValues({
            ...inputValues,
            [name]: value
        })
    }

    async function validateAndSubmit(e) {
        e.preventDefault();
        let errors = {};
        //run validation only if a validation argument was passed into the hook
        if (validateForm) {
            errors = validateForm(inputValues); //returns errors object
            setInputErrors(errors);
        } 
        //if no errors, submit form, else exit operation and display errors
        if(Object.keys(errors).length === 0) {
            toggleIsSubmitting();
            submitCallback(inputValues);
            toggleIsSubmitting();
        }
    }
    //submitCallback is passed in as param to this hook - contains any form-specific submit handling logic
    
    function resetForm() {
        setInputValues({...initialState})
    }

    return { 
        inputValues, 
        setInputValues,
        inputErrors, 
        handleChange,
        validateAndSubmit, 
        isSubmitting,
        otherErrors, 
        setOtherErrors, 
        resetForm 
    }
}