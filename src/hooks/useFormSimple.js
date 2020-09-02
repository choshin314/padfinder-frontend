import {useState} from 'react'

function validateInput(name, value) {
    switch (name) {
        case 'email': {
            return /^\S+@\S+\.\S+$/.test(value)
        }
        case 'phone': {
            return /^\d{10}$/.test(value)
        }
        case 'password': {
            return value.length >= 8
        } 
        default: {
            return true
        }
    }
}

function validateForm(formState) {
    const formValuesArr = Object.values(formState).filter(el => typeof el !== 'boolean');
    return formValuesArr.every(val => val.isValid); //true if all inputs are valid, false if not
}

export const useFormSimple = (initialState) => {
    const [formState, setFormState] = useState({ ...initialState, formValid: true, formError: null }); 

    function handleChange(e) {
        let { name, value, checked, type } = e.target;
        if (type === "checkbox") { value = checked };
        setFormState({
            ...formState,
            [name]: {
                ...formState[name],
                isValid: validateInput(name, value),  
                //all formState items (except 'formValid') should follow format { value: 'some value', isValid: bool, errorMsg: 'msg to display if !isValid && !formValid'}
                value: value
            }
        })
    }

    function checkFormValidity() {
        setFormState( { ...formState, formValid: true })
        let isValid = true;
        if (!validateForm(formState)) {
            setFormState( { ...formState, formValid: false })
            console.log('Invalid inputs');
            isValid = false;
        } 
        return isValid;
    }
    
    function resetForm() {
        setFormState({ ...initialState, formValid: true})
    }

    return [ formState, setFormState, handleChange, checkFormValidity, resetForm ]
}