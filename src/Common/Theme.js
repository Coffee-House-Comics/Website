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
    grey: "#989898"
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
            hover: "#ff8c96"
        },
        forest_green_crayola: {
            main: Colors.forest_green_crayola,
            hover: "#a7efb5"
        },
        cg_blue: {
            main: Colors.cg_blue
        },
        cadet_blue: {
            main: Colors.cadet_blue
        },
        olive_drab_7: {
            main: Colors.olive_drab_7
        },
        grey: {
            main: Colors.grey
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