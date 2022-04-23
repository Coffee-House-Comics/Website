import { Divider, Grid, IconButton, Typography, Box, Slider } from '@mui/material'
import { Stage, Layer, Rect, Circle, Line, Image } from 'react-konva';
import React, { useEffect, useState } from 'react'
import EditorButtonPanel from '../../../Buttons/EditorButtons/EditorButtonPanel'
import CreateIcon from '@mui/icons-material/Create';
import InterestsIcon from '@mui/icons-material/Interests';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import EraserIcon from '../../../Icons/EraserIcon';
import { ScrollMenu, VisibilityContext, } from 'react-horizontal-scrolling-menu';
import { SliderPicker, PhotoshopPicker, SketchPicker } from 'react-color';
import { Colors } from '../../../../Common/Theme';
import StickerCreation from './StickerCreation';
import SubmitButton from '../../../Buttons/SubmitButton';
import useImage from 'use-image';

import prefabs from '../../../../prefab.json';


/* NOTES:

    When we export/import remember to have all the pages and...
    Each page has:
        1. Serialization data
        2. Background Color

*/

const editorSize = 800;

const viewType = {
    main: "main",
    sticker: "sticker"
}

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

const pencilType = {
    solid: 0,
    dotted: 50,
    dashed: 100
};

let transactions = [];
let transactionIndex = -1;

const transactionTypes = {
    createLine: "createLine",
    createImage: "createImage",
    moveImage: "moveImage",
    changeBackgroundColor: "changeBackgroundColor"
};

function createTransEntry(name, before, after, id) {
    const entry = {
        transactionName: name,
        before: before,
        after: after,
        id: id
    };

    // console.log("BEFORE:", transactions);

    if ((transactionIndex < 0) || (transactionIndex < (transactions.length - 1))) {
        for (let i = transactions.length - 1; i > transactionIndex; i--) {
            transactions.splice(i, 1);
        }
    }

    // console.log("AFTER:", transactions);

    transactions[++transactionIndex] = entry;
}

function peekTransStack() {
    return transactions[transactionIndex];
}

let undoStack = [];

// All supported shapes 
const supportedShapes = {
    line: "line",
    image: "image",
};

// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const URLImage = ({ image, onDragMove, onDragEnd, draggable }) => {
    const [img] = useImage(image.src);

    let width = (img) ? img.width : 0;
    let height = (img) ? img.height : 0;

    // overwrite for now
    width = (img) ? 128 : 0;
    height = (img) ? 128 : 0;

    return (
        <Image
            width={width}
            height={height}
            image={img}
            x={image.x}
            y={image.y}
            // I will use offset to set origin to the center of the image
            offsetX={img ? width / 2 : 0}
            offsetY={img ? height / 2 : 0}
            draggable={Boolean(draggable)}
            onDragEnd={onDragEnd}
            onDragMove={onDragMove}
        />
    );
};

export default function ComicCreationScreen() {
    const [view, setView] = useState(viewType.main);

    const [stickerTab, setStickerTab] = useState(STICKER_TAB_TYPE.PREFAB_TAB);

    const [currentColor, setCurrentColor] = useState({
        r: '119',
        g: '89',
        b: '64',
        a: '1',
    });

    const [backgroundColor, setBackgroundColor] = useState('white');

    function rgbaToCss() {
        return `rgba(${currentColor.r},${currentColor.g},${currentColor.b},${currentColor.a})`;
    }

    const [penSize, setPenSize] = useState(5);
    const handlePenSizeChange = (event, newValue) => {
        setPenSize(newValue);
    };

    const [currentPencilType, setCurrentPencilType] = useState(pencilType.solid);
    const handlePencilTypeChange = (event, newValue) => {
        // console.log("hptc:", newValue);
        setCurrentPencilType(newValue);
    };

    const marks = [];
    for (let i = 0; i <= 100; i += 10) {
        marks.push({
            value: i,
            label: "" + i
        });
    }

    const penTypeMarks = [
        {
            value: 0,
            label: "Solid"
        },
        {
            value: 50,
            label: "Dotted"
        },
        {
            value: 100,
            label: "Dashed"
        }
    ];

    function valuetext(value) {
        return `${value}`;
    }


    const handleColorChange = function (color) {
        setCurrentColor(color.rgb);
    }

    // Konva Related things ------------------------
    const stageRef = React.useRef();

    const dragUrl = React.useRef();

    const [tool, setTool] = React.useState(toolType.NONE);

    const canDrag = Boolean(tool === toolType.NONE);

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

    // Thumbnail related stuff
    const buildThumbnail = function () {

    }

    // If in sticker view then we have an empty page
    const defaultPage = (view === viewType.main) ? pages[0].data : [];
    const [currentPage, setCurrentPage] = useState(defaultPage);

    useEffect(function () {
        if (view === stickerTab) {
            console.log("Setting the sticker page");
            setCurrentPage([]);
        }
    }, [view]);

    const onPageClick = function (index) {
        console.log("Trying to change to page with index:", index);
        setCurrentPage(pages[index].data);
    }

    // The serialization for the comic page we are viewing
    const [serialization, setSerialization] = useState(currentPage);

    const onFinishSticker = function () {
        console.log("Finished Making the sticker:", serialization);

        // Export the serialization

        const uri = stageRef.current.toDataURL();
        //console.log(uri);

        downloadURI(uri, 'stage.png');
    }

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

    const addOp = function (typeName, op, transactionName, modify, before, now, id) {
        if (transactionName === transactionTypes.createLine) {
            if (modify) {
                console.log("Created entry...");
                createTransEntry(transactionTypes.createLine);
            }

            setSerialization(op);
        }
        else if (transactionName === transactionTypes.createImage) {
            if (modify)
                createTransEntry(transactionTypes.createImage);

            setSerialization(op);
        }
        else if (transactionName === transactionTypes.moveImage) {
            if (modify)
                createTransEntry(transactionTypes.moveImage, before, now, id)

            setSerialization(op);
        }
        else if (transactionName === transactionTypes.changeBackgroundColor) {
            if (modify) {
                console.log("ctefbc");
                createTransEntry(transactionTypes.changeBackgroundColor, before, now)
            }

            setBackgroundColor(now);
        }
        else {
            console.log("Unsupported transaction");
        }
    };

    const handleUndo = function () {
        const transaction = peekTransStack();

        // console.log("t", transaction, transactions);

        if (!transaction)
            return;

        if (transactions.length === 0 || transactionIndex < 0)
            return

        if (transaction.transactionName === transactionTypes.createLine) {
            const last = peekSerial();

            if (!last)
                return;

            //console.log("Setting (from undo) to:", undoStack, serialization);
            if (serialization.length === 0) {
                return;
            }

            undoStack = [...undoStack, last];

            //console.log("Setting (from undo) to:", undoStack, serialization);

            transactionIndex--;

            setSerialization(serialization.slice(0, -1));
        }
        else if (transaction.transactionName === transactionTypes.createImage) {
            const last = peekSerial();

            if (!last)
                return

            undoStack = [...undoStack, last];
            transactionIndex--;

            setSerialization(serialization.slice(0, -1));
        }
        else if (transaction.transactionName === transactionTypes.moveImage) {
            const id = transaction.id;

            const before = transaction.before;
            const after = transaction.after;

            console.log("before, after:", before, after);

            const x = before.x;
            const y = before.y;

            // const oldX = after.x;
            // const oldY = after.y;

            const elem = serialization[id];

            if (elem) {
                elem.data.x = x;
                elem.data.y = y;

                serialization.splice(id, 1, elem);

                transactionIndex--;

                setSerialization(serialization.concat());
            }
        }
        else if (transaction.transactionName === transactionTypes.changeBackgroundColor) {
            const before = transaction.before;
            // const after = transaction.after;

            transactionIndex--;

            setBackgroundColor(before);
        }
        else {
            console.log("Unsupported transaction");
        }
    };

    const handleRedo = function () {
        // console.log("bt", peekTransStack(), transactions, transactionIndex);

        transactionIndex++;
        const transaction = peekTransStack();
        // console.log("t", transaction, transactions);
        if (transaction === null || transaction === undefined) {
            console.log("err 1");
            transactionIndex--;
            return;
        }

        if (transactions.length === 0) {
            console.log("err 2");
            transactionIndex--;
            return;
        }

        if (transaction.transactionName === transactionTypes.createLine) {
            const last = peekUndoStack();

            if (!last) {
                transactionIndex--;
                return;
            }

            if (undoStack.length === 0) {
                transactionIndex--;
                return;
            }

            const newSerialization = [...serialization, undoStack.pop()];

            //console.log("Setting (from redo) to:", undoStack, newSerialization);

            setSerialization(newSerialization);

        }
        else if (transaction.transactionName === transactionTypes.createImage) {
            const last = peekUndoStack();

            if (!last) {
                transactionIndex--;
                return;
            }

            if (undoStack.length === 0) {
                transactionIndex--;
                return;
            }

            const newSerialization = [...serialization, undoStack.pop()];

            //console.log("Setting (from redo) to:", undoStack, newSerialization);

            setSerialization(newSerialization);
        }
        else if (transaction.transactionName === transactionTypes.moveImage) {
            const id = transaction.id;

            const before = transaction.before;
            const after = transaction.after;

            console.log("before, after:", before, after);

            // const x = before.x;
            // const y = before.y;

            const oldX = after.x;
            const oldY = after.y;

            const elem = serialization[id];

            if (elem) {
                elem.data.x = oldX;
                elem.data.y = oldY;

                serialization.splice(id, 1, elem);

                setSerialization(serialization.concat());
            }
            else {
                transactionIndex--;
            }
        }
        else if (transaction.transactionName === transactionTypes.changeBackgroundColor) {
            // const before = transaction.before;
            const after = transaction.after;

            // console.log("->", after);

            setBackgroundColor(after + " ");
        }
        else {
            console.log("Unsupported transaction");
            transactionIndex--;
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
            break;
        default:
            break;
    }

    // TODO: Do we have to do anything here???
    const handleDragMove = function (e, id) { }

    const handleDragEnd = function (e, id) {
        const elem = serialization[id];

        if (elem) {
            const x = e.target.attrs.x;
            const y = e.target.attrs.y;

            if (elem.typeName === supportedShapes.image) {
                console.log("x y", elem.data, x, y);

                const oldX = elem.data.x;
                const oldY = elem.data.y;

                elem.data.x = x;
                elem.data.y = y;

                serialization.splice(id, 1, elem);

                addOp(supportedShapes.image, serialization.concat(), transactionTypes.moveImage, true, { x: oldX, y: oldY }, { x: x, y: y }, id);
            }
            else if (elem.typeName === supportedShapes.line) {
                console.log("x y", elem.data.points, x, y, e);
            }
        }
    }


    const handlePencilClick = function () {
        if (tool === toolType.pencil)
            setTool(toolType.NONE);
        else {
            setTool(toolType.pencil);
        }

    }

    const handleEraserClick = function () {
        if (tool === toolType.eraser)
            setTool(toolType.NONE);
        else {
            console.log("Setting eraser");
            setTool(toolType.eraser);
        }

    }

    // Changes background color
    const handleFillClick = function () {
        console.log("changeing backgorund...");

        addOp(null, null, transactionTypes.changeBackgroundColor, true, backgroundColor, rgbaToCss());
    }

    const [shapeModeOn, setShapeModeOn] = useState(false);


    const handleShapesClick = function () {
        setShapeModeOn(!shapeModeOn);
    }

    // TODO:
    const handlePrefabsTabClick = function () {
        setStickerTab(STICKER_TAB_TYPE.PREFAB_TAB)
    }

    // TODO:
    const handleStickersTabClick = function () {
        setStickerTab(STICKER_TAB_TYPE.STICKER_TAB)
    }

    // TODO:
    //const stickersContent = [];

    const prefabContent = prefabs.map(function (img, i) {
        return (
            <Grid item key={i}>
                <img
                    alt={img.name}
                    src={img.src}
                    draggable="true"
                    width={128}
                    height={128}
                    onDragStart={(e) => {
                        dragUrl.current = e.target.src;
                    }}
                />
            </Grid>
        );
    });

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


    const borderSpecs = "2px solid " + Colors.coffee

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
                        <CreateIcon sx={{ width: 35, height: 35, color: rgbaToCss() }} />
                    </IconButton>
                    <IconButton onClick={handleEraserClick} sx={{ border: (tool === toolType.eraser) ? borderSpecs : "" }}>
                        <EraserIcon sx={{ width: 30, height: 30 }} />
                    </IconButton>
                    <IconButton onClick={handleFillClick} sx={{ border: (tool === toolType.bucket) ? borderSpecs : "" }}>
                        <FormatColorFillIcon sx={{ width: 35, height: 35, color: rgbaToCss() }} />
                    </IconButton>
                    {/* // TODO: */}
                    <IconButton onClick={handleShapesClick} sx={{ border: (shapeModeOn) ? borderSpecs : "" }}>
                        <InterestsIcon sx={{ width: 35, height: 35, color: rgbaToCss() }} />
                    </IconButton>
                    <SubmitButton text={"Create Sticker"} onClick={
                        function () {
                            setView(viewType.sticker);
                        }
                    } />
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
                        {prefabContent}
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
        addOp(supportedShapes.line, serialization.concat(), transactionTypes.createLine, false);
    };

    const handleMouseDown = (e) => {
        if (tool === toolType.pencil || tool === toolType.eraser) {
            isDrawing.current = true;

            const pos = e.target.getStage().getPointerPosition();
            // console.log("P", pos);
            const entry = constructEntry(supportedShapes.line,
                {
                    tool,
                    points: [pos.x, pos.y],
                    color: rgbaToCss(),
                    penSize: penSize,
                    closed: shapeModeOn,
                    pencilType: currentPencilType
                });
            // console.log("Adding entry:", entry);

            addOp(supportedShapes.line, [...serialization, entry], transactionTypes.createLine, true);
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
        <div
            onDrop={(e) => {
                e.preventDefault();
                // register event position
                stageRef.current.setPointersPositions(e);
                // add image

                const entry = constructEntry(supportedShapes.image, {
                    ...stageRef.current.getPointerPosition(),
                    src: dragUrl.current,
                });

                addOp(supportedShapes.image, [...serialization, entry], transactionTypes.createImage, true);
            }}
            onDragOver={(e) => e.preventDefault()}
            style={{ width: editorSize + "px", height: editorSize + "px", justifyContent: "center", display: "flex" }}
        >
            <Stage
                width={editorSize}
                height={editorSize}
                ref={stageRef}
                style={{ border: "1px solid black", background: backgroundColor }}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
            >
                <Layer>
                    {
                        serialization.filter(function (val) {
                            if (val.typeName === supportedShapes.drag)
                                return false;
                            else
                                return true;
                        }).map((shape, i) => {
                            if (shape.typeName === supportedShapes.line) {
                                const line = shape.data;

                                let dashedArr = [];
                                if (line.pencilType === pencilType.dashed) {
                                    dashedArr = [33, 10];
                                }
                                else if (line.pencilType === pencilType.dotted) {
                                    dashedArr = [29, 20, 0.001, 20];
                                }

                                return (
                                    <Line
                                        key={i}
                                        x={line.x}
                                        y={line.y}
                                        points={line.points}
                                        perfectDrawEnabled={false}
                                        fill={line.closed ? line.color : ""}
                                        stroke={line.color}
                                        strokeWidth={line.penSize}
                                        closed={line.closed}
                                        tension={0.5}
                                        lineCap={'round'}
                                        lineJoin={'round'}
                                        dash={dashedArr}
                                        globalCompositeOperation={
                                            line.tool === 'eraser' ? 'destination-out' : 'source-over'
                                        }
                                    // draggable={canDrag}
                                    // onDragEnd={(e) => handleDragEnd(e, i)}
                                    // onDragMove={(e) => handleDragMove(e, i)}
                                    />
                                );
                            }
                            else if (shape.typeName === supportedShapes.image) {
                                return (
                                    <URLImage
                                        key={i}
                                        image={shape.data}
                                        draggable={canDrag}
                                        onDragEnd={(e) => handleDragEnd(e, i)}
                                        onDragMove={(e) => handleDragMove(e, i)}
                                    />
                                );
                            }
                            else {
                                // Should not be possible since we filter
                                console.log("IMPOSSIBLE !!");
                                return <div />;
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
                        <Box sx={{
                            justifyContent: "center",
                            display: "flex"
                        }}>
                            <SketchPicker
                                color={rgbaToCss()}
                                onChange={handleColorChange}
                                presetColors={Object.values(Colors)}
                            />
                        </Box>
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
                                color: (tool === toolType.eraser) ? "black" : rgbaToCss(),
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <div style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Slider
                                aria-label="Restricted values"
                                value={currentPencilType}
                                step={null}
                                marks={penTypeMarks}
                                track={false}
                                onChange={handlePencilTypeChange}
                                sx={{
                                    width: "50%",
                                    color: (tool === toolType.eraser) ? "black" : rgbaToCss()
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Box>
            <Divider orientation="vertical" variant="middle" sx={{ marginRight: 2, marginLeft: 3 }} />
            <Box sx={{
                height: "100%",
                width: "calc(100% - 650px)",
            }}>
                <Box sx={{
                    height: "calc(100% - 200px)",
                    width: "100%",
                    justifyContent: 'center',
                    display: "flex"
                }}>
                    {editorWindow}
                </Box>
                {
                    (view === viewType.main) ? (
                        <div>
                            <Box sx={{
                                height: pageHeight + 20,
                                width: "100%",
                                paddingTop: "20px",
                                position: "relative"
                            }}>
                                {pagesSection}
                            </Box>
                        </div>
                    ) : (
                        <div style={{ width: "100%" }}>
                            <SubmitButton text={"Return"} onClick={onFinishSticker} />
                        </div>
                    )
                }
            </Box>
            <Divider orientation="vertical" variant="middle" sx={{ marginRight: 2, marginLeft: 3 }} />
            <Box sx={{
                height: "100%",
                width: "250px",
                float: "right"
            }}>
                {stickersSection}
            </Box>
        </Box >
    );
}
