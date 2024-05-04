import { blue, grey, lightGreen, purple, red } from "@mui/material/colors";

export type LineType = "bus" | "tram" | "night" | "train" | "M1" | "M2";
type LineTypeMap = {
  [line in LineType]: string;
};

export const lineColors: LineTypeMap = {
  bus: purple[700],
  night: grey[900],
  tram: red[700],
  train: lightGreen[700],
  M1: blue.A700,
  M2: red.A700,
};
