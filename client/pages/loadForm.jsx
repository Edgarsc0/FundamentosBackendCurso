import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const ImageForm = () => {
    const [imageData, setImageData] = useState(null);
    const [sizeImage, setSizeImage] = useState(null);
    const [autor, setAutor] = useState(null);

    useEffect(() => {
        setSizeImage(getStringSizeInMB(imageData))
        console.log(imageData)
    }, [imageData])

    const handleAutorChange = (e) => {
        setAutor(e.target.value);
    }

    const handleSubmit = async () => {
        const totalStringSize = getStringSizeInMB(imageData.split(",")[1]);
        if (totalStringSize > 1) {
            const totalRequest = Math.floor(Math.log(totalStringSize) / Math.log(2)) + 1;
            console.log(totalRequest);
            let partialStrings = [];
            for (let i = 0; i < totalRequest; i++) {
                if (partialStrings.length == 0) {
                    partialStrings.push(...splitStringInHalf(imageData.split(",")[1]))
                } else {
                    let arrayProv = [];
                    partialStrings.map((item, index) => {
                        if (index == partialStrings.length - 1) {
                            arrayProv.push(...splitStringInHalf(item));
                            partialStrings = [...arrayProv];
                        } else {
                            arrayProv.push(...splitStringInHalf(item));
                        }
                    });
                }
            }
            partialStrings.map(item => console.log(getStringSizeInMB(item)))
            console.log(imageData.split(",")[1].length);
            console.log(partialStrings);
            partialStrings.map(async (item, index) => {
                console.log(item);
                const { data } = await axios.post("http://localhost:8080/api/v0/instaClone/image", {
                    id: CryptoJS.SHA1(imageData).toString(CryptoJS.enc.Hex),
                    partialString: item,
                    requestNumber: index + 1,
                    totalRequest: 2 ** totalRequest,
                    autor: autor
                });
                console.log(data);
            })
        } else {
            const { data } = await axios.post("http://localhost:8080/api/v0/instaClone/image", {
                imageData: imageData.split(",")[1],
                id: CryptoJS.SHA1(imageData).toString(CryptoJS.enc.Hex)
            });
            console.log(data);
        }
    }

    const splitStringInHalf = (str) => {
        const middleIndex = Math.floor(str.length / 2);
        const firstHalf = str.substring(0, middleIndex);
        const secondHalf = str.substring(middleIndex);
        return [firstHalf, secondHalf];
    };

    const getStringSizeInMB = (str) => {
        const bytes = new Blob([str]).size;
        const megabytes = bytes / (1024 * 1024);
        return megabytes.toFixed(2);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(CryptoJS.SHA1(reader.result).toString(CryptoJS.enc.Hex))
                setImageData(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h2>Adjuntar imagen</h2>
            <input type="file" onChange={handleImageChange} />
            <br></br>
            <input type='text' onChange={handleAutorChange}></input>
            {imageData && sizeImage && (
                <div>
                    <h3>Vista previa de la imagen:</h3>
                    <p>
                        Peso de la cadena: {sizeImage} MB
                    </p>
                    <img src={imageData} alt="Imagen adjuntada" style={{ maxWidth: '300px' }} />
                    <br></br>
                    <button onClick={handleSubmit}>Subir imagen</button>
                </div>
            )}
        </div>
    );
};

export default ImageForm;
