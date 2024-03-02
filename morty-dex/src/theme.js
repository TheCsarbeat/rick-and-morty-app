// src/theme.ts
"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#97ce4c",
    },
    secondary: {
      main: "#e6e6e6",
    },
    background: {
      paper: "#272829",
    },
    text: {
      primary: "#D8D9DA",
    },
  },
});

export default theme;
