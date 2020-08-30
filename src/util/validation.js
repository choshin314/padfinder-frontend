export function validateInput(name, value) {
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

export function validateForm(formState) {
    const formValuesArr = Object.values(formState).filter(el => typeof el !== 'boolean');
    return formValuesArr.every(val => val.isValid); //true if all inputs are valid, false if not
}