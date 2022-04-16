import { GlobalStoreContext } from '../../../../Store';
import { useContext, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Typography,
    Grid,
} from '@mui/material';
import SmallTextField from '../../../TextFields/SmallTextField';
import SubmitButton from '../../../Buttons/SubmitButton';

function ForgotPasswordScreen() {
    const { store } = useContext(GlobalStoreContext);
    const theme = useTheme();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const style = {
        position: 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'white',
        border: '5px solid ' + theme.palette.olive_drab_7.main,
        borderRadius: "10px",
        boxShadow: 24,
        p: 4
    };

    const handleEmailChange = function (event) {
        setEmail(event.target.value);
    }

    const handleUsernameChange = function (event) {
        setUsername(event.target.value);
    }

    const onSubmit = function () {
        console.log("Forgot Pass submit pressed...");
        console.log("->", email);

        store.forgotPassword({username: username, email: email});
    }

    return (
        <Grid container spacing={2} sx={style}>
            <Grid item xs={12} sx={{
                textAlign: "center",
                color: "black"
            }}>
                <Typography id="modal-title" variant="h4">
                    Forgot Password?
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{
                textAlign: "center",
                color: "black"
            }}>
                <Typography id="modal-title" sx={{
                }}>
                    Enter your email and username below to reset your password.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <SmallTextField
                    fieldName={"Email"}
                    helperText={"Please enter your email."}
                    onChange={handleEmailChange}
                    sx={{
                        width: "100%"
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <SmallTextField
                    fieldName={"Username"}
                    helperText={"Please enter your username."}
                    onChange={handleUsernameChange}
                    sx={{
                        width: "100%"
                    }}
                />
            </Grid>
            <Grid item xs={12} sx={{
                textAlign: "center"
            }}>
                <SubmitButton
                    onClick={onSubmit}
                    sx={{
                        width: "100%"
                    }}
                    text={"SEND NEW PASSWORD"}
                />
            </Grid>
        </Grid>
    );
}

export default ForgotPasswordScreen;