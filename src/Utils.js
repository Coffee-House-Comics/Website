import API from "./API";

const Utils = {}

Utils.uploadFileFromInput = async function(e){
    console.log("Attempting to upload image")
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        return await this.uploadFile(file)
    }
}

Utils.uploadFile = async function(file){
    const formData = new FormData();
    formData.append("file", file);
    const res = await API.Common.uploadImage(formData);
    const url = res.data.imageURL;

    return url;
}

export default Utils;