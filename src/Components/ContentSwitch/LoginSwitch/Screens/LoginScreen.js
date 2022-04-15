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

function LoginScreen() {
    const { store } = useContext(GlobalStoreContext);
    const theme = useTheme();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    const handlePassChange = function (event) {
        setPassword(event.target.value);
    }

    const onSubmit = function () {
        console.log("Login submit pressed...");
        console.log("->", email, password);
        store.login({email: {email}, password: {password}});
    }

    return (
        <Grid container spacing={2} sx={style}>
            <Grid item xs={12} sx={{
                textAlign: "center",
                color: "black"
            }}>
                <Typography id="modal-title" variant="h4">
                    Log in
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{
                textAlign: "center",
                color: "black"
            }}>
                <Typography id="modal-title" sx={{
                }}>
                    {"New to Coffee House Comics?  "}
                    <Link to={types.TabType.AUTH.children.REGISTER.fullRoute}>{"Register an Account"}</Link>
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
                    fieldName={"Password"}
                    helperText={"Please enter your password."}
                    onChange={handlePassChange}
                    sx={{
                        width: "100%"
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="caption">
                    <Link to={types.TabType.AUTH.children.FORGOTPASSWORD.fullRoute}>{"Forgot your password?"}</Link>
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{
                textAlign: "center"
            }}>
                <SubmitButton
                    onClick={onSubmit}
                    sx={{
                        width: "100%"
                    }}
                    text={"LOG IN"}
                />
            </Grid>
        </Grid>
    );
}

export default LoginScreen;