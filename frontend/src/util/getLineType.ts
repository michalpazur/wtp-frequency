import { LineType } from "./lineColors";

export const getLineType = (line: string): LineType => {
  if (line.startsWith("N")) return "night";
  if (line.startsWith("S")) return "train";

  const lineNumber = Number.parseInt(line);
  if (lineNumber < 100) return "tram";
  return "bus";
};
