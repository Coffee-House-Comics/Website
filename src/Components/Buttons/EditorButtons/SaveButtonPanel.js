import React from 'react'
import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid } from '@mui/material';

export default function SaveButtonPanel() {

    //TODO
    const handleSaveClick = function () {

    }

    //TODO
    const handlePublishClick = function () {

    }


    return (
        <Grid container direction="row" width="max-content" height="max-content" spacing={1}>
            <Grid item>
                <Button onClick={handlePublishClick} variant="contained" color="cg_blue">
                    Publish
                </Button>
            </Grid>
            <Grid item>
                <Button onClick={handleSaveClick} variant="outlined" startIcon={<SaveIcon/>} color="olive_drab_7">
                    Save
                </Button>
            </Grid>
        </Grid>
  )
}
