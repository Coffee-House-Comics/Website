import { Divider, Grid, IconButton, Typography, Box, Slider } from '@mui/material'
import { Stage, Layer, Rect, Circle, Line } from 'react-konva';
import React, { useState } from 'react'
import EditorButtonPanel from '../../../Buttons/EditorButtons/EditorButtonPanel'
import CreateIcon from '@mui/icons-material/Create';
import InterestsIcon from '@mui/icons-material/Interests';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import EraserIcon from '../../../Icons/EraserIcon';
import { ScrollMenu, VisibilityContext, } from 'react-horizontal-scrolling-menu';
import { SliderPicker } from 'react-color';
import { Colors } from '../../../../Common/Theme';

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

let undoStack = [];

const supportedShapes = {
    line: "line",
    image: "image",
};

export default function ComicCreationScreen() {
    const [stickerTab, setStickerTab] = useState(STICKER_TAB_TYPE.PREFAB_TAB);

    const [currentColor, setCurrentColor] = useState("#775940");

    const [penSize, setPenSize] = useState(5);

    const handlePenSizeChange = (event, newValue) => {
        setPenSize(newValue);
    };

    const marks = [];
    for (let i = 0; i <= 100; i += 10) {
        marks.push({
            value: i,
            label: "" + i
        });
    }

    function valuetext(value) {
        return `${value}`;
    }


    const handleColorChange = function (color) {
        setCurrentColor(color.hex);
    }

    // Konva Related things ------------------------
    const stageRef = React.useRef();

    const [tool, setTool] = React.useState(toolType.NONE);

    const isDrawing = React.useRef(false);

    // ------------------------------------------------------------------------------------------------------------------------  

    // Array of all the pages (TODO: Fetch them)
    const pages = [];

    const pageHeight = 120
    for (let i = 0; i < 20; i++) {
        pages.push(
            {
                index: i,
                data: [],
            }
        );
    }

    const [currentPage, setCurrentPage] = useState(pages[0].data);

    const onPageClick = function (index) {
        console.log("Trying to change to page with index:", index);
        setCurrentPage(pages[index].data);
    }

    // The serialization for the comic page we are viewing
    const [serialization, setSerialization] = useState(currentPage);

    function constructEntry(typeName, data) {
        return ({
            typeName: typeName,
            data: data
        });
    }

    function peekSerial() {
        return serialization[serialization.length - 1];
    }

    function peekUndoStack() {
        return undoStack[undoStack.length - 1];
    }

    // Either returns last one or undefined
    function getLastOfType(typeName) {
        return serialization.filter(function (elem) {
            return elem.typeName === typeName;
        }).reverse()[0];
    }


    // ------------------------------------------------------------------------------------------------------------------------

    const undoHook = function () {
        //const recentState = historyState.mostRecent;
        console.log("Trying to undo...");

        handleUndo();
    };

    const redoHook = function () {
        //const recentState = historyState.mostRecent;
        console.log("Trying to redo...");

        handleRedo();
    };

    const addOp = function (typeName, op) {
        if (typeName === supportedShapes.line) {
            // serialization = [...serialization, op];

            // console.log("Adding op:", op);

            setSerialization(op);
        }
        else if (typeName === supportedShapes.image) {

        }
        else {
            console.log("Unsupported transaction");
        }
    };

    const handleUndo = function () {
        const last = peekSerial();

        if (!last)
            return;

        if (last.typeName === supportedShapes.line) {
            //console.log("Setting (from undo) to:", undoStack, serialization);
            if (serialization.length === 0) {
                return;
            }

            undoStack = [...undoStack, peekSerial()];

            //console.log("Setting (from undo) to:", undoStack, serialization);

            setSerialization(serialization.slice(0, -1));
        }
        else if (last.typeName === supportedShapes.image) {

        }
        else {
            console.log("Unsupported transaction");
        }
    };

    const handleRedo = function (typeName) {
        const last = peekUndoStack();

        if (!last)
            return;

        if (last.typeName === supportedShapes.line) {
            if (undoStack.length === 0) {
                return;
            }

            const newSerialization = [...serialization, undoStack.pop()];

            //console.log("Setting (from redo) to:", undoStack, newSerialization);

            setSerialization(newSerialization);
        }
        else if (last.typeName === supportedShapes.image) {

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
        else {

            setTool(toolType.pencil);
        }

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

    function pageComponent({ key }) {
        return (
            <Box itemId={key} key={key} onClick={(event) => onPageClick(key)}>
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


    const borderSpecs = "2px solid " + Colors.olive_drab_7;

    let toolbar =
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h5">
                    Tools
                </Typography>
            </Grid>
            <Grid item>
                <Grid container direction="row" justifyContent="space-between">
                    <IconButton onClick={handlePencilClick} sx={{ border: (tool === toolType.pencil) ? borderSpecs : "" }}>
                        <CreateIcon sx={{ width: 35, height: 35, color: currentColor }} />
                    </IconButton>
                    <IconButton onClick={handleEraserClick} sx={{ border: (tool === toolType.eraser) ? borderSpecs : "" }}>
                        <EraserIcon sx={{ width: 30, height: 30 }} />
                    </IconButton>
                    <IconButton onClick={handleFillClick} sx={{ border: (tool === toolType.bucket) ? borderSpecs : "" }}>
                        <FormatColorFillIcon sx={{ width: 35, height: 35, color: currentColor }} />
                    </IconButton>
                    {/* // TODO: */}
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
        let lastLineEntry = getLastOfType(supportedShapes.line);
        // console.log("lle:", lastLineEntry);
        let lastLine = lastLineEntry.data;
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        serialization.splice(serialization.length - 1, 1, lastLineEntry);
        addOp(supportedShapes.line, serialization.concat());
    };

    const handleMouseDown = (e) => {

        if (tool === toolType.pencil || tool === toolType.eraser) {
            isDrawing.current = true;
            const pos = e.target.getStage().getPointerPosition();
            const entry = constructEntry(supportedShapes.line, { tool, points: [pos.x, pos.y], color: currentColor, penSize: penSize });
            // console.log("Adding entry:", entry);

            addOp(supportedShapes.line, [...serialization, entry]);
        }
    };

    const handleMouseUp = () => {
        if (isDrawing.current === true) {
            console.log("Mouse up...");
        }

        isDrawing.current = false;
    };

    // console.log("sss:", serialization);


    //TODO
    const editorWindow =
        <div style={{ width: "900px", height: "900px", justifyContent: "center", display: "flex" }}>
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
                        serialization.map((shape, i) => {
                            if (shape.typeName === supportedShapes.line) {
                                const line = shape.data;
                                return (
                                    <Line
                                        key={i}
                                        points={line.points}
                                        stroke={line.color}
                                        strokeWidth={line.penSize}
                                        tension={0.5}
                                        lineCap="round"
                                        globalCompositeOperation={
                                            line.tool === 'eraser' ? 'destination-out' : 'source-over'
                                        }
                                    />
                                );
                            }
                        })
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
                    <Grid item>
                        <SliderPicker color={currentColor} onChange={handleColorChange} />
                    </Grid>
                    <Grid item>
                        <Slider
                            aria-label="Pen size"
                            value={penSize}
                            getAriaValueText={valuetext}
                            step={1}
                            valueLabelDisplay="auto"
                            marks={marks}
                            onChange={handlePenSizeChange}
                            sx={{
                                color: (tool === toolType.eraser) ? "black" : currentColor
                            }}
                        />
                    </Grid>
                    <Grid item sx={{ height: "calc(100% - 350px)" }}>
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
