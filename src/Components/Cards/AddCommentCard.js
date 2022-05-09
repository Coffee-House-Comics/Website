import { TextField, Box, Typography, Grid } from '@mui/material';
import React from 'react';
import { GlobalStoreContext } from '../../Store';
import SubmitButton from '../Buttons/SubmitButton';


export default function AddCommentCard({ hook, text, sx }) {

    const [currentText, setCurrentText] = React.useState("");

    const addComment = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }

        if (hook) {
            setCurrentText("");
            hook(currentText);
        }
    }

    if (!text)
        text = "Add Comments:";

    const { store } = React.useContext(GlobalStoreContext);

    return (
        store.isLoggedIn ?
            <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" width="100%">
                <Grid item xs="auto">
                    <Typography variant="h5" sx={{ mt: 1 }}>{text}</Typography>
                </Grid>
                <Grid item xs>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                        <Grid item xs>
                            <TextField multiline={true}
                                placeholder={"Enter your text here..."}
                                onChange={(e) => { setCurrentText(e.target.value) }}
                                value={currentText}
                                sx={{
                                    bgcolor: "white",
                                    borderRadius: 1,
                                    opacity: .75,
                                    width: "100%",
                                    mr: 1,
                                    ...sx
                                }}
                            />
                        </Grid>
                        <Grid item xs="auto">
                            <SubmitButton text="Submit" onClick={addComment} sx={{}}></SubmitButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> : <div></div>
    )
}
