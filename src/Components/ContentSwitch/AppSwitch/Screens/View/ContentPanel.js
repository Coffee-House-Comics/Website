import React from 'react'
import { useTheme } from '@mui/material/styles';
import {
    Typography,
    Grid,
    Box,
    IconButton
} from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Stage, Layer, Line, Image } from 'react-konva';
import { useState } from 'react';
import useImage from 'use-image';

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
};

export default function ContentPanel({ pages }) {

    // TODO: Remove this!!
    pages = [
        {
            index: 0,
            data: {
                backgroundColor: 'white',
                serialization: [
                    {
                        typeName: "line", data: {
                            "tool": "pencil",
                            "points": [
                                434.5,
                                133,
                                426.5,
                                152,
                                408.5,
                                177,
                                366.5,
                                239,
                                326.5,
                                301,
                                276.5,
                                459,
                                294.5,
                                494,
                                311.5,
                                510,
                                349.5,
                                525,
                                386.5,
                                527,
                                433.5,
                                516,
                                454.5,
                                495,
                                458.5,
                                482,
                                460.5,
                                461,
                                458.5,
                                441,
                                453.5,
                                424,
                                397.5,
                                377,
                                353.5,
                                368,
                                331.5,
                                374,
                                319.5,
                                381,
                                302.5,
                                396,
                                279.5,
                                425,
                                277.5,
                                431,
                                278.5,
                                433
                            ],
                            "color": "rgba(44,44,44,1)",
                            "penSize": 5,
                            "closed": false,
                            "pencilType": 0
                        }
                    }
                ]
            }
        },
        {
            index: 1,
            data: {
                backgroundColor: 'black',
                serialization: []
            }
        }
    ];

    const theme = useTheme();
    const id = useParams();

    const stageRef = React.useRef();

    // AKA the current index
    const [pageNumber, setPageNumber] = useState(0);

    let backgroundColor = 'white';
    let serialization = [];

    if (!pages || !pages[pageNumber])
        return <Typography>No pages...</Typography>

    // Extract the serialization

    const page = pages[pageNumber].data;

    if (!page)
        return <Typography>THIS PAGE DOES NOT EXIST</Typography>

    backgroundColor = page.backgroundColor;
    serialization = page.serialization;

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

    return (
        <div style={{ height: "95%", marginTop: "50px", marginLeft: "10px", marginRight: "10px" }}>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center"
            }}>
                <div style={{ backgroundColor: "white", height: editorSize + "px", width: editorSize + "px", border: "3px solid " + theme.palette.olive_drab_7.main, borderRadius: "5px", }}>
                    <Stage
                        width={editorSize}
                        height={editorSize}
                        ref={stageRef}
                        style={{ border: "1px solid black", background: backgroundColor }}
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
            </div>
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
            </Grid>
        </div>
    )
}
