import { GlobalStoreContext } from '../../../../../../Store';
import { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Typography,
    Grid,
    Box,
    Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SmallTextField from '../../../../../TextFields/SmallTextField';
import SubmitButton from '../../../../../Buttons/SubmitButton';
import types from '../../../../../../Common/Types';

export default function ProfileSettings(props) { 
    const { store } = useContext(GlobalStoreContext);

    const [imageURI, setImageURI] = useState("/Images/krtek2.png");
    const [displayName, setDisplayName] = useState("Display nameee");
    const [bio, setBio] = useState("My Default Bio...");

    const handleChangeDisplayName = function (event) {
        setDisplayName(event.target.value);
    };

    const handleSubmitDisplayName = function () {
        console.log("Trying to submit new display name...");
    };

    const handleChangeBio = function (event) {
        setBio(event.target.value);
    };

    const handleSubmitBio = function () {
        console.log("Trying to submit new bio...");
    };

    const readURI = function (e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = function (ev) {
                setImageURI(ev.target.result);
            }.bind(this);
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const handleUploadImage = function (e) {
        readURI(e);

    }

    const buildImage = function () {
        let imgTag = null;
        if (imageURI !== null)
            imgTag = <img className="thumbnail" src={imageURI}></img>
        return imgTag;
    };

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Profile Image:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{
                        height: "200px",
                        width: "200px",
                        border: "1px solid black"
                    }}>
                        {buildImage()}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <label
                        htmlFor={"profile-submit-image"}
                        className="button"
                    >
                        <Typography variant="subtitle1">Upload an image</Typography>
                    </label>
                    <input
                        id={"profile-submit-image"}
                        type="file"
                        onChange={handleUploadImage}
                        accept=".jpg, .jpeg, .png"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{marginTop: 3}}>Username:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <SmallTextField
                        fieldName={"Display name"}
                        helperText={"Edit your display name."}
                        onChange={handleChangeDisplayName}
                        sx={{
                            width: "100%"
                        }}
                        defaultValue={displayName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SubmitButton text={"CHANGE DISPLAY NAME"} onClick={handleSubmitDisplayName} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{marginTop: 3}}>Bio:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <SmallTextField
                        fieldName={"Biography:"}
                        helperText={"Edit your biography."}
                        onChange={handleChangeBio}
                        sx={{
                            width: "100%"
                        }}
                        defaultValue={bio}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SubmitButton text={"CHANGE BIO"} onClick={handleSubmitBio} />
                </Grid>
            </Grid>
        </Box>
    );
}