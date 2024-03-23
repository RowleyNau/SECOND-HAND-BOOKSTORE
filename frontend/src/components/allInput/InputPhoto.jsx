import style from './AllInput.module.css';
import {BiSolidCameraPlus } from "react-icons/bi";
import {IoClose } from "react-icons/io5";
import React, { useState } from 'react';
import CloseButton from '../allButtons/closeButton/CloseButton';

const InputPhoto = (props) => {
    const { val, setVal, text, id, ...inputProps } = props;
    
    const [images, setImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = e.target.files;

        if (files) {
        var Arrval=[]
        Arrval.push(val)
        Arrval.push(files[0]['name'])
        setVal(Arrval);
        console.log(val)
        const imageArray = [];
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
            imageArray.push(e.target.result);
            if (imageArray.length === files.length) {
                setImages((prevImages) => [...prevImages, ...imageArray]);
                // setVal((prevVal) => prevVal + ', ' + files.map(file => file.name));
            }
            };
            reader.readAsDataURL(files[i]);
        }
        }
    };

    const handleImageRemove = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        // setVal((prevVal) => prevVal.split(', ').filter((_, i) => i !== index).join(', '));
        var Arrval=[]
        Arrval.push(val)
        if (index !== -1) {
            Arrval.splice(index, 1);
            setVal(Arrval);
        }
        
        console.log(val)

    };


    return(
    <>
     <div className={style.PhotoBlock}>
        <label  htmlFor="formId" >
            <input className={style.InputPhoto} type="file" accept="image/*" onChange={handleImageUpload}id="formId" hidden/>
            <BiSolidCameraPlus className={style.InputPhoto}/>
        </label>
        {images.map((image, index) => (
            <div className={style.InputPhotoBlock} key={index} style={{ display: "flex", alignItems: "center" }}>
            <img src={image} alt={`Uploaded ${index}`} style={{ maxWidth: "70px" }} />
            <CloseButton Click={() => handleImageRemove(index)}/>
            </div>
        ))}
    </div>
    </>
    )
}
export default InputPhoto
// onChange={handleFile}
