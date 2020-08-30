import {useState} from 'react'
import { validateInput, validateForm } from '../util/validation'

export const useFormSimple = (initialState) => {
    const [formState, setFormState] = useState({ ...initialState, formValid: true }); 

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
        if (!validateForm(formState)) {
            setFormState( { ...formState, formValid: false })
            console.log('Invalid inputs');
            return false;
        } 
    }
    
    function resetForm() {
        setFormState({ ...initialState, formValid: true})
    }

    return [ formState, setFormState, handleChange, checkFormValidity, resetForm ]
}