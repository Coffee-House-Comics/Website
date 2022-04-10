import FlowEditor from './FlowEditor';
import TextEditor from './TextEditor';
import { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Typography,
    Grid,
    Box,
    Button
} from '@mui/material';
import SplitPane from 'react-split-pane';


export default function StoryCreation() {
    const styles = {
        background: '#000',
        width: '2px',
        cursor: 'col-resize',
        margin: '0 5px',
        height: '100%',
    };

    return (
        <div>
            <SplitPane
                split="vertical"
                minSize={100}
                defaultSize={100}
                resizerStyle={styles}
            >
                <TextEditor />
                <FlowEditor />
            </SplitPane>
        </div>
    );
}