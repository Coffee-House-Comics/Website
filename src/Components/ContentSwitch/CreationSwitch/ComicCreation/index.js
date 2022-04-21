import { Divider, Grid, IconButton, Typography, Box } from '@mui/material'
import { Stage, Layer, Rect, Circle, Line } from 'react-konva';
import React, { useState } from 'react'
import EditorButtonPanel from '../../../Buttons/EditorButtons/EditorButtonPanel'
import CreateIcon from '@mui/icons-material/Create';
import InterestsIcon from '@mui/icons-material/Interests';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { handleBreakpoints } from '@mui/system';
import EraserIcon from '../../../Icons/EraserIcon';
import { ScrollMenu, VisibilityContext, } from 'react-horizontal-scrolling-menu';

const STICKER_TAB_TYPE = {
    PREFAB_TAB: "Prefab",
    STICKER_TAB: "Sticker"
}

const toolType = {
    NONE: "",
    pencil: "pencil",
    eraser: "eraser",
    bucket: "bucket",
};

const transactionType = {
    lines: {
        name: "line",
        // History will contain all the undone lines
        history: [],
        historyStep: 0
    },
    shapes: {
        name: "shapes",
        // May be a collection of item id and positions idk yet honestly
        history: [],
        historyStep: 0
    }
};

export default function ComicCreationScreen() {
    const [stickerTab, setStickerTab] = useState(STICKER_TAB_TYPE.PREFAB_TAB);

    // Konva Related things ------------------------
    const stageRef = React.useRef();

    const [tool, setTool] = React.useState(toolType.NONE);

    const isDrawing = React.useRef(false);

    // ------------------------------------------------------------------------------------------------------------------------






    // ------------------------------------------------------------------------------------------------------------------------

    const [historyState, setHistoryState] = useState({
        mostRecent: null,
        // Lines is the collection of lines to show
        lines: [],
        shapes: transactionType.shapes.history[0]
    });

    const historyReducer = function ({ action, payload }) {
        switch (action) {
            case transactionType.lines.name:
                return setHistoryState({
                    mostRecent: transactionType.lines.name,
                    lines: payload,
                    shapes: historyState.shapes
                });

            case transactionType.shapes.name:
                return ({
                    mostRecent: transactionType.shapes.name,
                    lines: historyState.lines,
                    shapes: payload
                });

            default:
                break;
        }
    };

    const undoHook = function () {
        const recentState = historyState.mostRecent;
        console.log("Trying to undo...", recentState);

        if (recentState) {
            handleUndo(recentState);
        }
    };

    const redoHook = function () {
        const recentState = historyState.mostRecent;
        console.log("Trying to redo...", recentState);

        if (recentState) {
            handleRedo(recentState);
        }
    };

    const addOp = function (typeName, op) {
        if (typeName === transactionType.lines.name) {
            const ts = transactionType.lines;
            ts.historyStep += 1;

            historyReducer({
                action: transactionType.lines.name,
                payload: op
            });
        }
        else if (typeName === transactionType.shapes.name) {

        }
        else {
            console.log("Unsupported transaction");
        }
    };

    const handleUndo = function (typeName) {
        if (typeName === transactionType.lines.name) {
            const ts = transactionType.lines;
            if (historyState.lines.length === 0) {
                return;
            }

            ts.history = [...ts.history, historyState.lines.pop()];

            ts.historyStep -= 1;

            console.log("Setting (from undo) to:", historyState.lines, ts.history);

            historyReducer({
                action: transactionType.lines.name,
                payload: historyState.lines
            });
        }
        else if (typeName === transactionType.shapes.name) {
            const ts = transactionType.shapes;
            if (ts.historyStep === 0) {
                return;
            }

            ts.historyStep -= 1;
            const previous = ts.history[ts.historyStep];

            historyReducer({
                action: transactionType.shapes.name,
                payload: previous
            });
        }
        else {
            console.log("Unsupported transaction");
        }
    };

    const handleRedo = function (typeName) {
        if (typeName === transactionType.lines.name) {
            const ts = transactionType.lines;
            if (ts.history.length === 0) {
                return;
            }

            console.log(historyState.lines);

            ts.historyStep += 1;

            const newLines = [...historyState.lines, ts.history.pop()]

            historyReducer({
                action: transactionType.lines.name,
                payload: newLines
            });

        }
        else if (typeName === transactionType.shapes.name) {
            const ts = transactionType.shapes;
            if (ts.historyStep === ts.history.length - 1) {
                return;
            }
            ts.historyStep += 1;
            const next = ts.history[ts.historyStep];

            historyReducer({
                action: transactionType.shapes.name,
                payload: next
            });
        }
        else {
            console.log("Unsupported transaction");
        }
    };

    // ------------------------------------------------------------------------------------------------------------------------

    const stickersSectionBackgroundColor = "rgba(170,170,170, 1)"

    //TODO
    let prefabsTabBackgroundColor = stickersSectionBackgroundColor
    let stickersTabBackgroundColor = "transparent"

    switch (stickerTab) {
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
        if (tool === toolType.pencil)
            setTool(toolType.NONE);
        else
            setTool(toolType.pencil);
    }

    //TODO
    const handleEraserClick = function () {
        if (tool === toolType.eraser)
            setTool(toolType.NONE);
        else {
            console.log("Setting eraser");
            setTool(toolType.eraser);
        }
            
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
    let pages = []
    for (let i = 0; i < 20; i++) {
        pages.push(
            {
                index: i
            }
        )
    }

    function pageComponent({ key }) {
        return (
            <Box itemId={key} key={key}>
                <div style={{ backgroundColor: "white", height: pageHeight, width: pageHeight, margin: 10, border: "1px solid black" }} />
            </Box>
        );
    }

    const buildPages = function () {
        //console.log("~>", pages);
        return pages.map((pageJSON, i) => {
            return (
                pageComponent({
                    key: i
                })
            );
        });
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

    // ------------------------------------------------------------------------------------------------------------------------


    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = historyState.lines[historyState.lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        historyState.lines.splice(historyState.lines.length - 1, 1, lastLine);
        addOp(transactionType.lines.name, historyState.lines.concat());
    };

    const handleMouseDown = (e) => {

        if (tool === toolType.pencil || tool === toolType.eraser) {
            isDrawing.current = true;
            const pos = e.target.getStage().getPointerPosition();
            addOp(transactionType.lines.name, [...historyState.lines, { tool, points: [pos.x, pos.y] }]);
        }
    };

    const handleMouseUp = () => {
        if (isDrawing.current === true) {
            console.log("Mouse up...");
        }

        isDrawing.current = false;
    };

    //TODO
    const editorWindow =
        <div style={{ width: "100%", height: "100%", justifyContent: "center", display: "flex" }}>
            <Stage
                width={900}
                height={900}
                ref={stageRef}
                style={{ border: "1px solid black", background: "white" }}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
            >
                <Layer>
                    <Rect width={50} height={50} fill="red" draggable />
                    <Circle x={200} y={200} stroke="black" radius={50} draggable />

                    {/* The Lines for free draw support */}
                    {
                        historyState.lines.map((line, i) => (
                            <Line
                                key={i}
                                points={line.points}
                                stroke="#df4b26"
                                strokeWidth={line.tool === 'eraser' ? 20 : 5}
                                tension={0.5}
                                lineCap="round"
                                globalCompositeOperation={
                                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                                }
                            />
                        ))
                    }
                </Layer>
            </Stage>
        </div>








    // ------------------------------------------------------------------------------------------------------------------------

    const pagesSection = (
        <ScrollMenu >
            {buildPages()}
        </ScrollMenu>
    );

    return (
        <Box sx={{
            height: "100%",
            width: "100%",
            display: "flex"
        }}>
            <Box sx={{
                height: "100%",
                width: "300px",
                float: "left"
            }}>
                <Grid container direction="column" spacing={2} sx={{ height: "100%" }}>
                    <Grid item>
                        <EditorButtonPanel undoHook={undoHook} redoHook={redoHook} />
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
            </Box>
            <Divider orientation="vertical" variant="middle" sx={{ marginRight: 2, marginLeft: 3 }} />
            <Box sx={{
                height: "100%",
                width: "calc(100% - 400px)"
            }}>
                <Box sx={{
                    height: "calc(100% - 200px)",
                    width: "100%"
                }}>
                    {editorWindow}
                </Box>
                <Box sx={{
                    height: pageHeight + 20,
                    width: "100%",
                    paddingTop: "20px",
                    position: "relative"
                }}>
                    {pagesSection}
                </Box>
            </Box>
        </Box>
    );
}
