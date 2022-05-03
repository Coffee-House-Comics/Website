import { Grid, Typography, Box, TextField } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import EditorButtonPanel from '../../../../Buttons/EditorButtons/EditorButtonPanel'
import { EditorState } from 'draft-js';
import SubmitButton from '../../../../Buttons/SubmitButton';
import { StoryStoreContext } from '../../../../../Store/StoryCreationStore';
import { GlobalStoreContext } from '../../../../../Store';
import types from '../../../../../Common/Types';
import { useParams } from 'react-router-dom';
import API from '../../../../../API';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TextEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { store } = useContext(GlobalStoreContext);
    const { storyStore } = useContext(StoryStoreContext);
    const { id } = useParams();

    useEffect(function () {
        console.log("Mode has changed! :", storyStore.mode);

    }, [storyStore.mode])

    const onEditorStateChange = function (newEditorState) {
        setEditorState(newEditorState)
    }

    const { elementId, elementTitle, elementBody } = storyStore;

    console.log("DATA:", elementId, elementTitle, elementBody);


    // console.log("Current mode here:", storyStore.mode);

    const saveHook = function () {
        console.log("Saving...");

        storyStore.save();
        /*if (pageIndex === -1) {
            console.log("Saving sticker...");

            const stickerObj = exportCurrentPage();
            console.log("Sticker:", stickerObj);
        }

        const pagesData = exportPages();
        console.log("cpgsd:", pagesData);

        async function pushToServer(pagesData) {
            console.log("pagesData:", pagesData);
            const res = await API.Comic.saveContent(id, pagesData);

            store.triggerUserRefresh();

            console.log("PUSHED!:", res);
            setPages(pagesData.concat());
        }

        pushToServer(pagesData);*/
    }

    const metadataHook = function () {

        console.log("Trying to access metadata edit page")

        //TODO: Set ID
        saveHook();
        store.reRoute(types.TabType.CREATION.children.METADATA.fullRoute, id);
    }

    const undoHook = function () {
        console.log("Trying to undo...");

        handleUndo();
    };

    const redoHook = function () {
        console.log("Trying to redo...");

        handleRedo();
    };

    const handleUndo = function () {

    }

    const handleRedo = function () {

    }

    let titleField = <Grid item>
        <TextField value={storyStore.elementTitle}
            onChange={(e) => { storyStore.updateTitle(e.target.value) }}
            size="small"
            sx={{
                backgroundColor: "white",
                border: 1,
                borderRadius: 1.5,
                mr: 1,
                width: "100%",
            }}
        />
    </Grid>


    /*
            <TextField
            onChange={(e) => { storyStore.updateBody(e.target.value) }}
            value={storyStore.elementBody}
            size="small"
            sx={{
                backgroundColor: "white",
                border: 1,
                borderRadius: 1.5,
                mr: 1,
                width: "100%",
            }} />
    */
    let bodyField = <Grid item>

        <ReactQuill value={storyStore.elementBody}
                  onChange={(value) => { storyStore.updateBody(value) }} />

    </Grid>

    return (
        <Grid container direction="column" width="100%" height="100%" spacing={3}>
            <Grid item>
                <Grid container direction="column" alignItems="stretch" justifyContent="flex-start" width="100%" spacing={1}>
                    <Grid item container direction="row" spacing={3}>
                        <Grid item>
                            <EditorButtonPanel undoHook={undoHook} redoHook={redoHook} saveHook={saveHook} metadataHook={metadataHook} />
                        </Grid>
                        <Grid item>
                            <SubmitButton text={'+ Add Page'} onClick={storyStore.toggleTrigger} />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography>
                            You can select a page or pathway by clicking on it.
                        </Typography>
                        <Typography>
                            Delete selected element by pressing "Backspace/Delete."
                        </Typography>
                        <Typography>
                            Add pathways by dragging and dropping between page nodes.
                        </Typography>
                        <Typography>
                            The contents of the selected element can be modified below.
                        </Typography>
                    </Grid>

                    {storyStore.mode > 0 ? titleField : ""}
                    {storyStore.mode > 1 ? bodyField : ""}
                </Grid>
            </Grid>
        </Grid>

    )
}

/*

            <Grid item xs sx={{
                width:"100%",
            }}>
                { <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                    editorStyle={{
                        backgroundColor:"white",
                        padding:"10px",
                        width:"100%",
                        height:"300px"
                    }}
                /> }
                </Grid>
*/
