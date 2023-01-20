import {toast} from 'react-toastify';

const allowedMimeTypes = ['image/png','image/jpeg']

const addImage = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<any>) => {
    let inputImage = event.target.files !== null ? event.target.files[0] : null;

    if (inputImage === null || inputImage === undefined) {
        return
    }

    if (allowedMimeTypes.includes(inputImage.type)) {
        setImage(inputImage);
        toast.success("Image added succesfully", {position: 'top-left'});
    }
    else {
        toast.error("Your image needs to have .png or .jpeg extension", {position: 'top-left'});
    }
}

export default addImage;