import { Grid, Typography, Box, TextField } from '@mui/material'
import React, {useState} from 'react'
import EditorButtonPanel from '../../../../Buttons/EditorButtons/EditorButtonPanel'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';


export default function TextEditor(props) {
    const currPage = props.currPage
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = function(newEditorState){
        setEditorState(newEditorState)
    }

    return (
        <Grid container direction="column" width="100%" height="100%" spacing={3}>
           <Grid item>
                <Grid container direction="column" alignItems="stretch" justifyContent="flex-start" width="100%" spacing = {1}>
                    <Grid item>
                        <TextField value={currPage} size="small" sx={{
                            backgroundColor:"white",
                            border: 1,
                            borderRadius:1.5,
                            mr:1,
                            width:"100%",
                        }}/>
                    </Grid>
                    <Grid item>
                        <EditorButtonPanel />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs sx={{
                width:"100%",
            }}>
                <Editor
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
                />
            </Grid>


        </Grid>

    )
}
