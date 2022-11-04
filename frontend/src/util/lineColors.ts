import { grey, lightGreen, purple, red } from "@mui/material/colors";

export type LineType = "bus" | "tram" | "night" | "train";
type LineTypeMap = {
  [line in LineType]: string;
};

export const lineColors: LineTypeMap = {
  bus: purple[700],
  night: grey[900],
  tram: red[700],
  train: lightGreen[700],
};
