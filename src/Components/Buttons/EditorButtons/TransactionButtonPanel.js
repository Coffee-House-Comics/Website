import React from 'react'
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { Grid, IconButton, Typography } from '@mui/material';


export default function TransactionButtonPanel({ undoHook, redoHook }) {

    //TODO
    const handleUndo = function () {
        undoHook();
    }

    //TODO
    const handleRedo = function () {
        redoHook();
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" width="max-content">
            <Grid item>
                <Grid container direction="column" justifyContent="center" alignItems="center" marginTop={-1}>
                    <IconButton onClick={handleUndo}>
                        <UndoIcon />
                    </IconButton>
                    <Typography variant="caption" marginTop={-1}>
                        Undo
                    </Typography>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" justifyContent="center" alignItems="center" marginTop={-1}>
                    <IconButton onClick={handleRedo}>
                        <RedoIcon />
                    </IconButton>
                    <Typography variant="caption" marginTop={-1}>
                        Redo
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}
