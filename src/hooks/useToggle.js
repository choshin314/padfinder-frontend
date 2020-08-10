import {useState} from "react"

export const useToggle = (value=false) => {
    const [isOn, setIsOn] = useState(value);
    const toggle = () => setIsOn(!isOn);
    return [isOn, toggle];
}
