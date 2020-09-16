import {useState} from 'react'

export const useImageUpload = () => {
    const [selectedImages, setSelectedImages] = useState(null);
    const [imageSelectErrors, setImageSelectErrors] = useState(null);

    function handleImageSelect(e) {
        let files = e.target.files; //this is a FileList
        if (files.length === 0) return; //exit if no files selected (e.g., user clicked 'cancel')
        files = [...files]; //convert FileList to Array
        //only set selectedFiles if they are in jpeg OR png AND 300kb or less, otherwise display error message
        if (files.some(file => (!(file.type === 'image/jpeg' || file.type === 'image/png')))) {
            return setImageSelectErrors('Photos must be .jpeg, .jpg, or .png format')
        } else if (files.some(file => file.size > 300000)) {
            return setImageSelectErrors('Photos must be 300kb or smaller')
        } else {
            setImageSelectErrors(null)
            setSelectedImages(files);
        }
    }

    return ({
        selectedImages, 
        imageSelectErrors, 
        handleImageSelect
    })
}