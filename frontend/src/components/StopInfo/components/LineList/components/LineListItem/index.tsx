import { styled, Box, Typography } from "@mui/material";
import React from "react";
import { LineListItemProps } from "./types";
import { getLineType } from "../../../../../../util/getLineType";
import { lineColors } from "../../../../../../util/lineColors";
import { useTheme } from "@mui/system";
import { headwaysContainer, lineStyle } from "./styles";

const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  padding: theme.spacing(1),
  "&:not(:last-child)": {
    borderBottom: "1px solid",
    borderColor: theme.palette.divider,
  }
}));

const LineNumber = styled(Box)(({ theme }) => ({
  minWidth: "3rem",
  height: "fit-content",
  padding: theme.spacing(0.25, 0),
  borderRadius: 4,
  marginRight: theme.spacing(1),
}));

const Headsign = styled(Box)(({ theme }) => ({
  borderRadius: 4,
  padding: theme.spacing(0.25, 0.5),
  backgroundColor: theme.palette.action.hover,
}));

const LineListItem: React.FC<LineListItemProps> = ({ line, headsigns }) => {
  const theme = useTheme();
  const lineType = getLineType(line);
  const lineColor = lineColors[lineType];

  return (
    <Root>
      <LineNumber sx={{ backgroundColor: lineColor }}>
        <Typography
          variant="h3"
          sx={{
           ...lineStyle,
            color: theme.palette.getContrastText(lineColor),
          }}
        >
          {line}
        </Typography>
      </LineNumber>
      <Box sx={{ ...headwaysContainer, gap: theme.spacing(1) }}>
        {headsigns.map((dir) => (
          <Headsign key={dir}>
            <Typography
              color="primary"
              variant="h3"
              component="p"
              sx={lineStyle}
            >
              → {dir}
            </Typography>
          </Headsign>
        ))}
      </Box>
    </Root>
  );
};

export default LineListItem;
