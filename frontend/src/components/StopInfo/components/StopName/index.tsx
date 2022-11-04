import { CloseRounded as CloseIcon } from "@mui/icons-material";
import { Box, Button, Card, styled, Typography } from "@mui/material";
import React from "react";
import { useStopStore } from "../../../../util/store/useStopStore";
import {
  closeButton,
  stopName as stopNameStyle,
  stopNameContainer
} from "./styles";
import { StopNameProps } from "./types";

const StopNameContainer = styled(Card)(({ theme }) => ({
  flexGrow: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const StopName: React.FC<StopNameProps> = ({ onClose }) => {
  const { stopName } = useStopStore();

  return (
    <Box sx={stopNameContainer}>
      <Button
        variant="outlined"
        size="small"
        color="inherit"
        onClick={onClose}
        sx={closeButton}
      >
        <CloseIcon />
      </Button>
      <StopNameContainer variant="outlined">
        <Typography variant="h2" sx={stopNameStyle}>
          {stopName}
        </Typography>
      </StopNameContainer>
    </Box>
  );
};

export default StopName;
