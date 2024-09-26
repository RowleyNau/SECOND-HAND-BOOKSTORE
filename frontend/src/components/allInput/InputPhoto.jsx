import style from './AllInput.module.css';
import {BiSolidCameraPlus } from "react-icons/bi";
import {IoClose } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
import CloseButton from '../allButtons/closeButton/CloseButton';


const InputPhoto = ({  val, setVal, text, id, severalPhotos }) => {
    const [images, setImages] = useState([]);
    const [showInput, setShowInput] = useState(true);
    // useEffect (()=>{
    //     setImages(val);
    //     console.log(val)
    //     if (val && val.length > 0) {
    //         if (!severalPhotos) {
    //             setShowInput(false);
    //         }
    //     }
    // },[])
    useEffect (()=>{
        setImages(val);
        console.log(val)
        if (val && val.length > 0) {
            if (!severalPhotos) {
                setShowInput(false);
            }
        }
    },[val])
    const handleImageUpload = (e) => {
        const files = e.target.files;
    
        if (files && files.length > 0) {
            if (!severalPhotos) {
                setShowInput(false);
            }
    
            const imageArray = [];
            let counter = 0; // Счетчик для отслеживания количества обработанных файлов
    
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imageArray.push(e.target.result);
                    counter++;
    
                    // Проверяем, все ли файлы были обработаны
                    if (counter === files.length) {
                        setImages((prevImages) => {
                            const newImages = [...prevImages, ...imageArray];
                            setVal(newImages); // Устанавливаем новое значение val после обновления images
                            return newImages;
                        });
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        }
    };
    
    const handleImageRemove = (index) => {
        setImages((prevImages) => {
            const newImages = prevImages.filter((_, i) => i !== index);
            setVal(newImages); // Устанавливаем новое значение val после удаления изображения
            return newImages;
        });
    
        if (images.length === 1) {
            setShowInput(true);
        }
    };
    
    return (
        <div className={style.PhotoBlock}>
            {severalPhotos ? (
                <>
                    <label htmlFor={id}>
                        <input className={style.InputPhoto} type="file" accept="image/*" onChange={handleImageUpload} id={id} hidden />
                        <BiSolidCameraPlus className={style.InputPhoto} />
                    </label>
                    {images.map((image, index) => (
                   
                        
                        <div className={style.InputPhotoBlock} key={index} style={{ display: "flex", alignItems: "center" }}>
                            <img src={image} alt={`Uploaded ${index}`} style={{ maxWidth: "70px" }} />
                            <CloseButton Click={() => handleImageRemove(index)} />
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {showInput && (
                        <label htmlFor={id}>
                            <input className={style.InputPhoto} type="file" accept="image/*" onChange={handleImageUpload} id={id} hidden />
                            <BiSolidCameraPlus className={style.InputPhoto} />
                        </label>
                    )}
                    {val.map((image, index) => (
                        // console.log(image)
                        (<div className={style.InputPhotoBlock} key={index} style={{ display: "flex", alignItems: "center" }}>
                            <img src={image} alt={`Uploaded ${index}`} style={{ maxWidth: "70px" }} />
                            <CloseButton Click={() => handleImageRemove(index)} />
                        </div>)
                    ))}
                </>
            )}
        </div>
    );
};

export default InputPhoto;
