import { GlobalStoreContext } from '../../../../Store';
import { useContext, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Typography,
    Grid,
} from '@mui/material';
import SmallTextField from '../../../TextFields/SmallTextField';
import SubmitButton from '../../../Buttons/SubmitButton';
import { Link } from "react-router-dom";
import types from '../../../../Common/Types'

function RegisterScreen() {
    const { store } = useContext(GlobalStoreContext);
    const theme = useTheme();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

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

    const handleFirstNameChange = function (event) {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = function (event) {
        setLastName(event.target.value);
    }

    const handleUsernameChange = function (event) {
        setUserName(event.target.value);
    }

    const handleEmailChange = function (event) {
        setEmail(event.target.value);
    }

    const handlePassChange = function (event) {
        setPassword(event.target.value);
    }

    const handleConfirmPassChange = function (event) {
        setConfirmPass(event.target.value);
    }

    const onSubmit = function () {
        console.log("Login register pressed...");
        console.log("->", firstName, lastName, username, email, password, confirmPass);
      
        store.register({
            firstName: {firstName}, lastName: {lastName}, username: {username}, email: {email}, password: {password}, confirmPass: {confirmPass}});
    }

    return (
        <Grid container spacing={2} sx={style}>
            <Grid item xs={12} sx={{
                textAlign: "center",
                color: "black"
            }}>
                <Typography id="modal-title" variant="h4">
                    Register
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{
                textAlign: "center",
                color: "black"
            }}>
                <Typography id="modal-title" sx={{
                }}>
                    {"Already have an account?  "}
                    <Link to={types.TabType.AUTH.children.LOGIN.fullRoute}>{"Log in."}</Link>
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <SmallTextField
                    fieldName={"First Name"}
                    helperText={"Please enter your first name."}
                    onChange={handleFirstNameChange}
                    sx={{
                        width: "100%"
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <SmallTextField
                    fieldName={"Last Name"}
                    helperText={"Please enter your last name."}
                    onChange={handleLastNameChange}
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
                    fieldName={"Password"}
                    helperText={"Please enter your password."}
                    onChange={handlePassChange}
                    sx={{
                        width: "100%"
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <SmallTextField
                    fieldName={"Confirm Password"}
                    helperText={"Please re-enter your password."}
                    onChange={handleConfirmPassChange}
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
                    text={"REGISTER"}
                />
            </Grid>
        </Grid>
    );

}

export default RegisterScreen;