import { Grid, Typography, Box, TextField } from '@mui/material'
import React, {useState, useContext} from 'react'
import EditorButtonPanel from '../../../../Buttons/EditorButtons/EditorButtonPanel'
//import { Editor } from "react-draft-wysiwyg";
//import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import SubmitButton from '../../../../Buttons/SubmitButton';
import {StoryStoreContext} from '../../../../../Store/StoryCreationStore';


export default function TextEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { storyStore } = useContext(StoryStoreContext);

    const onEditorStateChange = function(newEditorState){
        setEditorState(newEditorState)
    }

    let titleField = <Grid item>
        <TextField value={storyStore.elementTitle} size="small" sx={{
            backgroundColor:"white",
            border: 1,
            borderRadius:1.5,
            mr:1,
            width:"100%",
        }}/>
    </Grid>

    let bodyField = <Grid item>
        <TextField value={storyStore.elementBody} size="small" sx={{
            backgroundColor:"white",
            border: 1,
            borderRadius:1.5,
            mr:1,
            width:"100%",
        }}/>
    </Grid>

    return (
        <Grid container direction="column" width="100%" height="100%" spacing={3}>
           <Grid item>
                <Grid container direction="column" alignItems="stretch" justifyContent="flex-start" width="100%" spacing = {1}>
                    <Grid item container direction="row" spacing={3}>
                        <Grid item>
                            <EditorButtonPanel />
                        </Grid>
                        <Grid item>
                            <SubmitButton text={'+ Add Page'} onClick={storyStore.addNode}/>
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

                    {storyStore.mode > 0? titleField: ""}
                    {storyStore.mode > 1? bodyField: ""}
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
