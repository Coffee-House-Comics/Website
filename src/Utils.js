import API from "./API";

const Utils = {}

Utils.uploadFileFromInput = async function(e){
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        return await this.uploadFile(file)
    }
}

Utils.uploadFile = async function(file){
    console.log("Attempting to upload image")
    const formData = new FormData();
    formData.append("file", file);
    const res = await API.Common.uploadImage(formData);

    if(res.status === 200){
        const url = res.data.imageURL;
        console.log("Image upload successful. URL: " + url);
        return url;
    } else {
        console.log("Image upload failed")
        return null;
    }
    
}

Utils.getId = function(obj) {
    if (!obj) return null;
    if (obj.id) return obj.id;
    if (obj._id) return obj._id;
    return null
}

export default Utils;