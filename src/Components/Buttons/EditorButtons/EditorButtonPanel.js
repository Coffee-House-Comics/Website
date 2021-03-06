import { Divider, Grid } from '@mui/material'
import React from 'react'
import SaveButtonPanel from './SaveButtonPanel'
import TransactionButtonPanel from './TransactionButtonPanel'

export default function EditorButtonPanel({ undoHook, redoHook, saveHook, metadataHook }) {
    return (
        <Grid container direction="row" width="max-content" justifyContent="center" alignItems="center">
            <Grid item>
                <SaveButtonPanel saveHook={saveHook} metadataHook={metadataHook}/>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ marginRight: 2, marginLeft: 3 }} />
            <Grid item>
                <TransactionButtonPanel undoHook={undoHook} redoHook={redoHook} />
            </Grid>
        </Grid>
    )
}
