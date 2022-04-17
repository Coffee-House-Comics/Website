import API from "./API";

const Utils = {}

Utils.uploadFileFromInput = async function(e){
    console.log("Attempting to upload image")
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("file", file);
        return await API.Common.uploadImage(formData);
    }
}

export default Utils;