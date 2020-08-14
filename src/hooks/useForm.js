import {useReducer} from 'react'

export const useForm = (initialState) => {

    function reducer(state, action) {
        switch(action.type) {
            case "CHANGE_INPUT": return { ...state, [action.inputName]: action.value };
            case "RESET": return { ...initialState };
        }
    };
    
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleInputChange(e) {
        let { name, value, checked, type } = e.target;
        if (type === "checkbox") { value = checked };
        dispatch({ type: "CHANGE_INPUT", inputName: name, value: value });
    }

    return [state, dispatch, handleInputChange];
}

//basically handleInputChange should work for all text-ish inputs (text, email, phone, textarea) and checkboxes
//handleInputChange will NOT work for the datepicker since it doesn't give direct access to event. Will need to dispatch custom action