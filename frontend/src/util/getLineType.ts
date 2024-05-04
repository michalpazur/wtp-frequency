import { LineType } from "./lineColors";

export const getLineType = (line: string): LineType => {
  if (line === "M1" || line === "M2") return line;
  if (line.startsWith("N")) return "night";
  if (line.startsWith("S")) return "train";

  const lineNumber = Number.parseInt(line);
  if (lineNumber < 100) return "tram";
  return "bus";
};
