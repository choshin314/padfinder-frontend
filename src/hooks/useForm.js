import {useReducer} from 'react'

export const useForm = (initialState) => {

    function reducer(state, action) {
        switch(action.type) {
            case "CHANGE_INPUT": return { ...state, [action.key]: action.value };
            case "CHANGE_MINMAX_INPUT": {
                return ( action.min ? 
                    { 
                        ...state, 
                        [action.key]: {
                            ...state[action.key],
                            [action.subKey]:  [ action.value, state[action.key][action.subKey][1] ]
                        }
                    } :
                    { 
                        ...state, 
                        [action.key]: {
                            ...state[action.key],
                            [action.subKey]: [ state[action.key][action.subKey][0], action.value ]
                        }
                    }
                )
            };
            case "CHANGE_NESTED_INPUT": return { 
                ...state, 
                [action.key]: {
                    ...state[action.key],
                    ...action.updateSubKey
                }
            }
            case "RESET": return { ...initialState };
        }
    };
    
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleInputChange(e, array) {
        let { name, value, checked, type } = e.target;
        if (typeof value === "string") { value = value.trim()}
        if (type === "checkbox") { value = checked };
        array ?
            dispatch({ type: "CHANGE_INPUT", key: name, value: [value, value] }) :
            dispatch({ type: "CHANGE_INPUT", key: name, value: value })
    }       
    // param 'array' is for properties that can potentially have minmax ranges (rent, beds, baths, size) - if they DO have ranges, they'll be handled by handleMinMaxChange, but if they DON'T have ranges, I still wanna keep the value as an array just to keep things simpler.  The array values in this case would just be [same, same]

    function handleInputChangeNested(e, topState, nestedState, array=false) {
        let { value } = e.target;
        if (typeof value === "string") {value = value.trim()};
        array ? 
            dispatch({type: "CHANGE_NESTED_INPUT", key: topState, updateSubKey: { [nestedState]: [ value, value ] }}) :
            dispatch({type: "CHANGE_NESTED_INPUT", key: topState, updateSubKey: { [nestedState]: value }})
    }

    function handleMinMaxChange(e, topState, nestedState, min) {
        dispatch({ type: "CHANGE_MINMAX_INPUT", key: topState, subKey: nestedState, min: min, value: parseFloat(e.target.value) })
    }

    return [state, dispatch, handleInputChange, handleInputChangeNested, handleMinMaxChange];
}

//basically handleInputChange should work for all text-ish inputs (text, email, phone, textarea) and checkboxes
//handleInputChange will NOT work for the datepicker since datepicker doesn't give direct access to event. Will need to dispatch custom action