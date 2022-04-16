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
import { TrendingUpRounded } from '@mui/icons-material';

export default function AccountSettings() {
    const { store } = useContext(GlobalStoreContext);

    const [username, setUsername] = useState("USERRRR");
    const [email, setEmail] = useState("OLD EMAIL");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handleSubmitUsername() {
        console.log("Submitting username change:", username);
        const metadata = {
            title: "Are you sure that you want to change your username to " + username + "?",
            body: "Your new username must be used to log in from now on.",
            action: "Yes, please change the username."
        };

        store.createModal(metadata, function () {
            store.changeUsername(username);
        }, true);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handleChangePassword() {
        const path = types.TabType.AUTH.children.RESETPASSWORD.fullRoute;
        store.reRoute(path);
    }

    function handleSubmitEmailChange() {
        console.log("Submitting email change:", email);
        const metadata = {
            title: "Are you sure that you want to change your email to " + email + "?",
            body: "You will not be able to log in again until you confirm that email.",
            action: "Yes, please change the email."
        };

        store.createModal(metadata, function () {
            store.changeEmail(email);
        }, true);
    }

    return (
        <Box sx={{
            width: "100%"
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Username:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <SmallTextField
                        fieldName={"Username"}
                        helperText={"Edit your username."}
                        onChange={handleUsernameChange}
                        sx={{
                            width: "100%"
                        }}
                        defaultValue={username}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SubmitButton text={"CHANGE USERNAME"} onClick={handleSubmitUsername} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{marginTop: 5}}>Email:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <SmallTextField
                        fieldName={"Email"}
                        helperText={"Change the email associated with your account."}
                        onChange={handleEmailChange}
                        sx={{
                            width: "100%"
                        }}
                        defaultValue={email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SubmitButton text={"CHANGE EMAIL"} onClick={handleSubmitEmailChange} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{marginTop: 5}}>Change Password:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <SubmitButton text={"CHANGE PASSWORD HERE"} onClick={handleChangePassword} />
                </Grid>
            </Grid>
        </Box>
    );
}