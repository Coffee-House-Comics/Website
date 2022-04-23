import { Typography } from '@mui/material';
import { Input } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../../../../API';
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../../../../Store';
import types from '../../../../Common/Types';
import Utils from '../../../../Utils'

export default function MetadataEditor() {
    const { id } = useParams();
    const { store } = useContext(GlobalStoreContext);
    const [post, setPost] = useState({})
    const [imgURL, setImg] = useState("")
    const [postTitle, setTitle] = useState("")
    const [postDescription, setDescription] = useState("")
    const [postSeries, setSeries] = useState("")


    //Set the post on first render
    useEffect(() => {
        async function getPost(id) {
            let resp = (await API.Comic.viewUnpublished(id)).data

            if(resp.error){
                store.reRoute(types.TabType.APP.children.VIEW.fullRoute, id)
            }
            
            setPost(resp.content)
        }
        getPost(id);
    }, [])

    useEffect(() => {
        setTitle(post.name);
        setDescription(post.description)
        setSeries(post.series)
        setImg(post.coverPhoto)
    }, [post])

    if (!post || post === {}) {
        return <div>Loading...</div>
    }

    console.log("Editing metadata for post: ", post)


    const handleChangePhotoClick = async function (e) {
        const response = await Utils.uploadFileFromInput(e);
        if (response.status === 200) {
            setImg(response.data.imageURL);
        }
    }

    const handleDeleteButtonClick = function () {
        console.log("Delete button clicked");
        store.createModal({
            title: "Are you sure that you want to delete this post?",
            body: "This action is irreversible.",
            action: "Delete"
        }, function () {
            async function deletePost(id) {
                console.log("Deleting post with id: ", IDBIndex)
                if (store.app === "Comics" && await API.Comic.delete(id).status === 200) {
                    alert("Post successfully deleted");
                    store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, store.user.id)
                }else if (await API.Story.delete(id).status === 200){
                    alert("Post successfully deleted");
                    store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, store.user.id)
                }
            }
            deletePost(post._id)
        });
    }

    const handlePublishButtonClick = async function () {
        store.createModal({
            title: "Are you sure that you want to publish this post?",
            body: "This post will be visible to the public, and you will no longer be able to edit it.",
            action: "Publish"
        }, function () {
            async function publishPost(id, series) {
                let res = {}
                if (store.app === "Comics") {
                    res = await API.Comic.publish(id, series)
                } else {
                    res = await API.Story.publish(id, series)
                }

                if (res.status && res.status === 200) {
                    store.reRoute(types.TabType.APP.children.VIEW.fullRoute, id)
                }
            }
            publishPost(post._id, postSeries)
        });
    }

    const handleContinueButtonClick = async function () {
        let res = {}
        if (store.app === "Comics") {
            res = await API.Comic.editMetadata(post._id, postTitle, postDescription, imgURL, postSeries)
        } else {
            res = await API.Story.editMetadata(post._id, postTitle, postDescription, imgURL, postSeries)
        }

        if (res.status && res.status === 200) {
            store.reRoute(types.TabType.CREATION.children.COMIC.fullRoute, post._id);
        }
    }

    const handleTitleChange = function (e) {
        e.preventDefault()
        setTitle(e.target.value)
        console.log("Title change")
    }

    const handleDescriptionChange = function (e) {
        e.preventDefault();
        setDescription(e.target.value);
        console.log("Description change")
    }

    const handleSeriesChange = function (e) {
        e.preventDefault();
        setSeries(e.target.value);
        console.log("Series change")
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
        backgroundColor: theme.palette.text.main,
        '&:hover': {
            backgroundColor: theme.palette.coffee.main
        }
    }));

    return (
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" width="100%">
            <Grid item>
                <Typography variant="h4" sx={{ marginBottom: "20px" }}>
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
                                <label
                                    htmlFor={"profile-submit-image"}
                                    className="button"
                                >
                                    <Typography variant="subtitle1">Upload an image</Typography>
                                </label>
                                <input
                                    id={"profile-submit-image"}
                                    type="file"
                                    onChange={handleChangePhotoClick}
                                    accept=".jpg, .jpeg, .png"
                                />
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
                                <TextField color="text" label="Title" style={{ width: "100%" }} value={postTitle} onChange={handleTitleChange} />
                            </Grid>
                            <Grid item width="100%">
                                <TextField color="text" label="Series" style={{ width: "100%" }} value={postSeries} onChange={handleSeriesChange} />
                            </Grid>
                            <Grid item width="100%">
                                <TextField color="text" label="Description" multiline rows={9} style={{ width: "100%", height: "100%" }} value={postDescription} onChange={handleDescriptionChange} />
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