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

export default function AccountSettings() {
    const [userName, setUserName] = useState("USERRRR");

    function handleUserNameChange(event) {
        setUserName(event.target.value);
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
                        onChange={handleUserNameChange}
                        sx={{
                            width: "100%"
                        }}
                        defaultValue={userName}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}