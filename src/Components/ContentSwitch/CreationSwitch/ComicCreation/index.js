import { Divider, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditorButtonPanel from '../../../Buttons/EditorButtons/EditorButtonPanel'
import CreateIcon from '@mui/icons-material/Create';
import InterestsIcon from '@mui/icons-material/Interests';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { handleBreakpoints } from '@mui/system';
import EraserIcon from '../../../Icons/EraserIcon';
import HorizontalScroll from 'react-scroll-horizontal';

const STICKER_TAB_TYPE = {
    PREFAB_TAB: "Prefab",
    STICKER_TAB: "Sticker"
}

export default function ComicCreationScreen() {
    const [stickerTab, setStickerTab] = useState(STICKER_TAB_TYPE.PREFAB_TAB)

    const stickersSectionBackgroundColor = "rgba(170,170,170, 1)"

    //TODO
    let prefabsTabBackgroundColor = stickersSectionBackgroundColor
    let stickersTabBackgroundColor = "transparent"

    switch(stickerTab){
        case STICKER_TAB_TYPE.PREFAB_TAB:
            prefabsTabBackgroundColor = stickersSectionBackgroundColor;
            stickersTabBackgroundColor = "transparent"
            break;
        case STICKER_TAB_TYPE.STICKER_TAB:
            prefabsTabBackgroundColor = "transparent";
            stickersTabBackgroundColor = stickersSectionBackgroundColor;
    }

    //TODO
    const handlePencilClick = function () {

    }

    //TODO
    const handleEraserClick = function () {

    }

    //TODO
    const handleFillClick = function () {

    }

    //TODO
    const handleShapesClick = function () {

    }

    //TODO
    const handlePrefabsTabClick = function () {
        setStickerTab(STICKER_TAB_TYPE.PREFAB_TAB)
    }

    //TODO
    const handleStickersTabClick = function () {
        setStickerTab(STICKER_TAB_TYPE.STICKER_TAB)
    }

    //TODO
    let stickersContent = []
    for (let i = 0; i < 200; i++) {
        stickersContent.push(
            <Grid item>
                <div style={{ backgroundColor: "white", height: 60, width: 60, margin: 4 }}>
                </div>
            </Grid>
        )
    }

    //TODO
    const pageHeight = 120
    let pages=[]
    for(let i=0; i < 20; i++){
        pages.push(
            <div style={{ backgroundColor: "white", height: 100, width: pageHeight, margin: 10, border: "1px solid black"}} />
        )
    }




    let toolbar =
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h5">
                    Tools
                </Typography>
            </Grid>
            <Grid item>
                <Grid container direction="row" justifyContent="space-between">
                    <IconButton onClick={handlePencilClick}>
                        <CreateIcon sx={{ width: 35, height: 35, color: "black" }} />
                    </IconButton>
                    <IconButton onClick={handleEraserClick}>
                        <EraserIcon sx={{ width: 30, height: 30 }} />
                    </IconButton>
                    <IconButton onClick={handleFillClick}>
                        <FormatColorFillIcon sx={{ width: 35, height: 35, color: "black" }} />
                    </IconButton>
                    <IconButton onClick={handleShapesClick}>
                        <InterestsIcon sx={{ width: 35, height: 35, color: "black" }} />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>

    const stickersTabs =
        <Grid container direction="row" width="max-content" spacing={1}>
            <Grid item width="max-content" onClick={handlePrefabsTabClick} sx={{ cursor: "pointer" }}>
                <div style={{ padding: "15px 15px 25px 15px", borderRadius: 5, backgroundColor: prefabsTabBackgroundColor }}>
                    <Typography variant="h6" width="max-content">
                        Prefabs
                    </Typography>
                </div>
            </Grid>
            <Grid item width="max-content" onClick={handleStickersTabClick} sx={{ cursor: "pointer" }}>
                <div style={{ padding: "15px 15px 25px 15px", borderRadius: 5, backgroundColor: stickersTabBackgroundColor }}>
                    <Typography variant="h6" width="max-content">
                        Stickers
                    </Typography>
                </div>
            </Grid>
        </Grid>

    const stickersSection =
        <Grid container direction="column" width="100%" height="100%">
            <Grid item>
                {stickersTabs}
            </Grid>
            <Grid item sx={{ height: "calc(100% - 50px)", marginTop: -3, backgroundColor: stickersSectionBackgroundColor, padding: "10px 0px 10px 0px" }}>
                <div style={{ overflow: "auto", height: "100%", padding: "0px 5px 0px 5px" }}>
                    <Grid container direction="row" justifyContent="center" sx={{ width: "100%" }}>
                        {stickersContent}
                    </Grid>
                </div>
            </Grid>
        </Grid>

    //TODO
    const editorWindow =
        <div style={{ backgroundColor: "white", width: "100%", height: "100%", border: "1px solid black" }}>
            COMIC EDIT WINDOW
        </div>

    //TODO
    const pagesSection = 
        <HorizontalScroll reverseScroll={true} style={{height: pageHeight*1.1}}>
            {pages}
        </HorizontalScroll>

    return (
        <Grid container direction="row" width="100%" height="100%">
            <Grid item height="100%" width={300}>
                <Grid container direction="column" spacing={2} sx={{ height: "100%" }}>
                    <Grid item>
                        <EditorButtonPanel />
                    </Grid>
                    <Grid item>
                        <hr style={{ width: "100%" }} />
                    </Grid>
                    <Grid item>
                        {toolbar}
                    </Grid>
                    <Grid item sx={{ height: "calc(100% - 200px)" }}>
                        {stickersSection}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs="auto">
                <Divider orientation="vertical" variant="middle" sx={{ marginRight: 2, marginLeft: 3 }} />
            </Grid>
            <Grid item xs height="100%">
                <Grid container direction="column" sx={{ height: "100%" }}>
                    <Grid item xs>
                        {editorWindow}
                    </Grid>
                    <Grid item xs="auto">
                        {pagesSection}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}