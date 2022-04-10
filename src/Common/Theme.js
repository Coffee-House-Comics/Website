// Color Pallette of the Application
// Based on the colors from https://coolors.co/775940-f9faf0-c96971-72ad7d-247ba0-61a0af-3d3522

import { createTheme } from '@mui/material/styles';

// Export colors in 2 ways:

// Colors not MUI style
const Colors = {
    coffee: "#775940",
    ivory: "#F9FAF0",
    fuzzy_wuzzy: "#C96971",
    forest_green_crayola: "#72AD7D",
    cg_blue: "#247BA0",
    cadet_blue: "#61A0AF",
    olive_drab_7: "#3D3522",
    grey: "#989898",
    red: "#ff0000",
    green: "#00cc00"
}

// Colors MUI style
const Theme = createTheme({
    palette: {
        primary: {
            main: Colors.ivory
        },
        text: {
            main: Colors.olive_drab_7,
        },
        secondary: {
            main: Colors.coffee
        },
        coffee: {
            main: Colors.coffee
        },
        ivory: {
            main: Colors.ivory
        },
        fuzzy_wuzzy: {
            main: Colors.fuzzy_wuzzy,
            hover: "#ff8c96",
            filter: "invert(71%) sepia(23%) saturate(3951%) hue-rotate(307deg) brightness(113%) contrast(100%)"
        },
        forest_green_crayola: {
            main: Colors.forest_green_crayola,
            hover: "#a7efb5",
            filter: "invert(63%) sepia(26%) saturate(465%) hue-rotate(79deg) brightness(94%) contrast(95%)"
        },
        cg_blue: {
            main: Colors.cg_blue,
            filter: "invert(51%) sepia(9%) saturate(4371%) hue-rotate(154deg) brightness(76%) contrast(79%)"
        },
        cadet_blue: {
            main: Colors.cadet_blue
        },
        olive_drab_7: {
            main: Colors.olive_drab_7
        },
        grey: {
            main: Colors.grey
        },
        green: {
            main: Colors.green,
            filter: "invert(41%) sepia(71%) saturate(2685%) hue-rotate(91deg) brightness(115%) contrast(105%)"
        },
        red: {
            main: Colors.red,
            filter: "invert(14%) sepia(97%) saturate(6142%) hue-rotate(358deg) brightness(93%) contrast(117%)"
        }
    },
    typography: {
        button: {
            textTransform: "none"
        }
    }
});

export {
    Colors,
    Theme
}