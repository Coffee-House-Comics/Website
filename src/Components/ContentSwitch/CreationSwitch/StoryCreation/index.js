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
        width: '3px',
        cursor: 'col-resize',
        margin: '0 5px',
        height: '95%',
    };

    const pages = [
        {
            title: "Page 3",
            body: ""
    
        },

    ]

    return (
        <div>
            <SplitPane
                split="vertical"
                minSize={330}
                defaultSize={600}
                resizerStyle={styles}
            >
                <TextEditor currPage={pages[0].title}/>
                <FlowEditor />
            </SplitPane>
        </div>
    );
}