import React from 'react'
import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid, styled } from '@mui/material';

export default function SaveButtonPanel({saveHook, metadataHook}) {

    const handleSaveClick = function () {
        saveHook();
    }

    //TODO
    const handleMetadataClick = function () {
        metadataHook();
    }

    let MetadataButton = styled(Button)(({ theme }) => ({
        color: theme.palette.ivory.main,
        backgroundColor: theme.palette.cg_blue.main,
        '&:hover': {
            backgroundColor: theme.palette.cadet_blue.main
        }
    }));


    return (
        <Grid container direction="row" width="max-content" height="max-content" spacing={1}>
            <Grid item>
                <MetadataButton onClick={handleMetadataClick} variant="contained">
                    Metadata
                </MetadataButton>
            </Grid>
            <Grid item>
                <Button onClick={handleSaveClick} variant="outlined" startIcon={<SaveIcon/>} color="olive_drab_7">
                    Save
                </Button>
            </Grid>
        </Grid>
  )
}
