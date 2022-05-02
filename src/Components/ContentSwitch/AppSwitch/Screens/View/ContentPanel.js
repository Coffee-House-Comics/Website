import React from 'react'
import { useTheme, styled } from '@mui/material/styles';
import {
    Typography,
    Grid,
    Box,
    IconButton,
    Button
} from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Stage, Layer, Line, Image, Text } from 'react-konva';
import { useState, useContext } from 'react';
import { GlobalStoreContext } from '../../../../../Store';
import useImage from 'use-image';
import { Colors } from '../../../../../Common/Theme';

const editorSize = 800;

const URLImage = ({ image, onDragMove, onDragEnd, draggable }) => {
    const [img] = useImage(image.src);

    let width = (img) ? img.width : 0;
    let height = (img) ? img.height : 0;

    // overwrite for now
    width = (img) ? 128 : 0;
    height = (img) ? 128 : 0;

    if (image.isSticker) {
        width = editorSize;
        height = editorSize;
    }

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

const pencilType = {
    solid: 0,
    dotted: 50,
    dashed: 100
};

// All supported shapes 
const supportedShapes = {
    line: "line",
    image: "image",
    text: "text"
};

export default function ContentPanel({ pages, flowJSON }) {

    console.log("PAGES:", pages);

    const theme = useTheme();
    const id = useParams();

    const stageRef = React.useRef();

    const { store } = useContext(GlobalStoreContext);

    // AKA the current index
    const [pageNumber, setPageNumber] = useState(0);

    const ColorButton = styled(Button)(({ theme }) => ({
        color: Colors.ivory,
        backgroundColor: Colors.olive_drab_7,
        '&:hover': {
            backgroundColor: Colors.coffee,
        },
    }));

    let page;
    let backgroundColor = 'white';
    let serialization = [];
    let outgoingEdges = [];
    let decisionButtons = <div></div>;

    if (!pages || !pages[pageNumber]) {
        return <Typography>No pages...</Typography>
    }

    if (!pages[pageNumber].data && !pages[pageNumber].decisions)
        return <Typography>THIS PAGE DOES NOT EXIST</Typography>

    // Extract the serialization

    if(store.app === "Comics") {
        page = pages[pageNumber].data;
        backgroundColor = page.backgroundColor;
        serialization = page.serialization;
    }
    
    else {
        page = flowJSON.nodes[pageNumber + 1].data;
        outgoingEdges = flowJSON.edges.filter((edge) => {
            return parseInt(edge.source) === pageNumber + 1;
        });
        decisionButtons = outgoingEdges.map((edge, index) => {
            return(
                <Grid item key={index}>
                    <ColorButton variant="contained" onClick={() => clickDecision(edge.target)}>{edge.label}</ColorButton>
                </Grid>
            );
        });
    }

    console.log("Current page being viewed:", pageNumber, page);

    const maxPages = pages.length;

    console.log("mp:", maxPages);

    function previousPage() {
        if (pageNumber > 0)
            setPageNumber(pageNumber - 1);
    }

    function nextPage() {
        if (pageNumber < maxPages - 1)
            setPageNumber(pageNumber + 1);
    }

    function clickDecision(targetNode) {
        setPageNumber(targetNode - 1);
    }

    let pageContent = store.app === "Comics"? 
        <Stage
            width={editorSize}
            height={editorSize}
            ref={stageRef}
            style={{ border: "1px solid black", background: backgroundColor }}>
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
                                dashedArr = [33, 2 * (line.penSize)];
                            }
                            else if (line.pencilType === pencilType.dotted) {
                                dashedArr = [33, 2 * (line.penSize), 0.001 * (line.penSize), 2 * (line.penSize)];
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
                                />
                            );
                        }
                        else if (shape.typeName === supportedShapes.image) {
                            return (
                                <URLImage
                                    key={i}
                                    image={shape.data}
                                    draggable={false}
                                />
                            );
                        }

                        else if (shape.typeName === supportedShapes.text) {
                            const text = shape.data;
                            return (
                                <Text
                                    key={i}
                                    x={text.x}
                                    y={text.y}
                                    draggable={false}
                                    text={text.text}
                                    fill={text.color}
                                    fontSize={text.fontSize}
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
        </Stage> : 
        <Grid container direction="column" justifyContent="space-evenly" alignItems="center" sx={{height: '100%', paddingLeft: '1', paddingRight: '1', paddingTop: '1', paddingBottom: '1'}}>
            <Grid item>
                {page.payload}
            </Grid>
            <Grid item container direction="row" spacing={2} justifyContent="space-evenly" alignItems="center">
                {decisionButtons}
            </Grid>
        </Grid>

    return (
        <div style={{ height: "95%", marginTop: "50px", marginLeft: "10px", marginRight: "10px" }}>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center"
            }}>
                <div style={{ backgroundColor: "white", height: editorSize + "px", width: editorSize + "px", border: "3px solid " + theme.palette.olive_drab_7.main, borderRadius: "5px", }}>
                    {pageContent}
                </div>
            </div>
            {store.app === "Comics"? 
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ height: "100px" }}>
                    <Grid item>
                        <IconButton onClick={previousPage}>
                            <ArrowBackIosIcon fontSize='large' />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h3">{pageNumber + 1}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={nextPage}>
                            <ArrowForwardIosIcon fontSize='large' />
                        </IconButton>
                    </Grid>
                </Grid>: 
                <div/>
            }
        </div>
    )
}
