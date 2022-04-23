import { GlobalStoreContext } from '../../../../Store';
import { useContext, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Typography,
    Grid,
} from '@mui/material';
import SmallTextField from '../../../TextFields/SmallTextField';
import SubmitButton from '../../../Buttons/SubmitButton';

function ResetPasswordScreen() {
    const { store } = useContext(GlobalStoreContext);
    const theme = useTheme();

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmNewPass, setConfirmNewPass] = useState("");

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

    const handleOldPassChange = function (event) {
        setOldPass(event.target.value);
    }

    const handleNewPassChnage = function (event) {
        setNewPass(event.target.value);
    }

    const handleNewPassConfirmChange = function (event) {
        setConfirmNewPass(event.target.value);
    }

    const onSubmit = function () {
        console.log("Reset Pass submit pressed...");
        console.log("->", oldPass, newPass, confirmNewPass);

        const modalInfo = {
            title: "Password Reset",
            body: "Are you sure you want to reset your password?",
            action: "Yes, reset it."
        };

        store.createModal(modalInfo, function () {
            store.changePassword({oldPassword: oldPass, newPassword: newPass, confirmNewPass: confirmNewPass});
        }, true);
    }

    return (
        <Grid container spacing={2} sx={style}>
            <Grid item xs={12} sx={{
                textAlign: "center",
                color: "black"
            }}>
                <Typography id="modal-title" variant="h4">
                    Password Reset
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{
                textAlign: "center",
                color: "black"
            }}>
                <Typography id="modal-title" sx={{
                }}>
                    Enter your new password below.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <SmallTextField
                    fieldName={"Old Password"}
                    type='password'
                    helperText={"Please Enter your old password."}
                    onChange={handleOldPassChange}
                    sx={{
                        width: "100%"
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <SmallTextField
                    fieldName={"New Password"}
                    type='password'
                    helperText={"Please Enter your new password."}
                    onChange={handleNewPassChnage}
                    sx={{
                        width: "100%"
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <SmallTextField
                    fieldName={"Confirm New Password"}
                    type='password'
                    helperText={"Please re-enter your new password."}
                    onChange={handleNewPassConfirmChange}
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
                    text={"RESET PASSWORD"}
                />
            </Grid>
        </Grid>
    );
}

export default ResetPasswordScreen;