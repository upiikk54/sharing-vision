import {
    createTheme
} from "@mui/material";

export const Theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1024,
            lg: 1250,
            xl: 1440
        }
    },
})