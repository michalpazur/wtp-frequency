import { ExpressionName } from "mapbox-gl";
import React, { useMemo } from "react";
import { Layer, Source } from "react-map-gl";
import { useShapeQuery } from "../../../../queries/useShapeQuery";
import { useThemeStore } from "../../../../util/store/useThemeStore";

const getBin: [ExpressionName, string, string[]] = [
  "let",
  "bin",
  ["get", "bin"],
];
const interpolateBin = ["interpolate", ["linear"], ["var", "bin"]];
const interpolateZoom = ["interpolate", ["linear"], ["zoom"]];

const LineLayer: React.FC = () => {
  const { dark } = useThemeStore();
  const { data } = useShapeQuery();
  const style = useMemo<mapboxgl.LinePaint>(
    () => ({
      "line-color": [
        ...getBin,
        [
          ...interpolateBin,
          0,
          ["to-color", dark ? "#9575CD" : "#673AB7"],
          9,
          ["to-color", "#009688"],
          19,
          ["to-color", "#FFEB3B"],
        ],
      ],
      "line-width": [
        ...getBin,
        [
          ...interpolateZoom,
          9,
          [...interpolateBin, 0, 0.3, 19, 6],
          12,
          [...interpolateBin, 0, 0.5, 19, 10],
          18,
          [...interpolateBin, 0, 1, 19, 20],
        ],
      ],
      "line-opacity": [...getBin, [...interpolateZoom, 8.5, 0, 9, 1]],
    }),
    [dark]
  );
  
  return (
    <Source type="geojson" data={data}>
      <Layer type="line" paint={style} />
    </Source>
  );
};

export default LineLayer;
