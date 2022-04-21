import { Typography } from '@mui/material';
import { Input } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MetadataEditor() {
    const { id } = useParams();

    //TODO
    let imgURL = "/Images/coffee2.jpg"

    //TODO
    let postTitle = "Untitled"

    //TODO
    let postDescription = ""

    //TODO
    let postSeries = ""


    //TODO
    const handleChangePhotoClick = function(){
        console.log("Change cover photo")
    }

    //TODO
    const handleDeleteButtonClick = function(){
        console.log("Delete")
    }

    //TODO
    const handlePublishButtonClick = function(){
        console.log("Publish")
    }

    //TODO
    const handleContinueButtonClick = function(){
        console.log("Continue")
    }


    const BlueButton = styled(Button)(({ theme }) => ({
        color: theme.palette.ivory.main,
        backgroundColor: theme.palette.cg_blue.main,
        '&:hover': {
            backgroundColor: theme.palette.cadet_blue.main
        }
    }));

    const CoffeeButton = styled(Button)(({ theme }) => ({
        color: theme.palette.ivory.main,
        backgroundColor: theme.palette.coffee.main,
        '&:hover': {
            backgroundColor: theme.palette.text.main
        }
    }));

    return (
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" width="100%">
            <Grid item>
                <Typography variant="h4" sx={{marginBottom: "20px"}}>
                    Metadata Editor
                </Typography>
            </Grid>
            <Grid item width="100%">
                <Grid container direction="row" justifyContent="center" alignItems="flex-start" height="100%" width="100%" spacing={5}>
                    <Grid item xs="auto" height="100%">
                        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" height="100%" spacing={1}>
                            <Grid item xs="auto">
                                <Typography variant="h6">
                                    Cover Photo
                                </Typography>
                            </Grid>
                            <Grid item>
                                <img src={imgURL} width="100%" style={{ objectFit: "cover", aspectRatio: 200 / 250, maxWidth: "315px" }} />
                            </Grid>
                            <Grid item>
                                <BlueButton variant="contained" color="cg_blue" onClick={handleChangePhotoClick}>
                                    Change Cover Photo
                                </BlueButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" width="100%" spacing={2}>
                            <Grid item>
                                <Typography variant="h6">
                                    Summary
                                </Typography>
                            </Grid>
                            <Grid item width="100%">
                                <TextField color="text" label="Title" style={{ width: "100%" }} defaultValue={postTitle} />
                            </Grid>
                            <Grid item width="100%">
                                <TextField color="text" label="Series" style={{ width: "100%" }} defaultValue={postSeries} />
                            </Grid>
                            <Grid item width="100%">
                                <TextField color="text" label="Description" multiline rows={9} style={{ width: "100%", height: "100%" }} defaultValue={postDescription} />
                            </Grid>
                            <Grid item width="100%">
                                <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={1}>
                                    <Grid item>
                                        <Button variant="text" color="red" startIcon={<DeleteIcon />} onClick={handleDeleteButtonClick}>
                                            Delete
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <BlueButton variant="contained" color="cg_blue" onClick={handlePublishButtonClick}>
                                            Publish
                                        </BlueButton>
                                    </Grid>
                                    <Grid item>
                                        <CoffeeButton variant="contained" color="text" onClick={handleContinueButtonClick}>
                                            Save & Continue
                                        </CoffeeButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}