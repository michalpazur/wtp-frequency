import { Box, Card, CircularProgress, styled, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSingleStopQuery } from "../../../../queries/useSingleStopQuery";
import { SingleStopResponse } from "../../../../services/getSingleStop";
import { useStopStore } from "../../../../util/store/useStopStore";
import LineListItem from "./components/LineListItem";

const Root = styled(Card)({
  width: "100%",
  overflow: "scroll",
});

const InfoRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const LineList: React.FC = () => {
  const { stopId } = useStopStore();
  const { data: queryData, isLoading, isError } = useSingleStopQuery(stopId);
  const [data, setData] = useState<SingleStopResponse | undefined>(queryData);
  const [showSpinner, setShowSpinner] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (queryData) {
      setData(queryData);
      return;
    }

    if (isError) {
      setData(undefined);
    }
  }, [queryData, isError]);

  useEffect(() => {
    clearTimeout(timeout.current);
    if (!isLoading) {
      setShowSpinner(false);
    } else {
      timeout.current = setTimeout(() => setShowSpinner(true), 150);
    }
  }, [isLoading, stopId]);

  return (
    <Root elevation={5}>
      {showSpinner ? (
        <InfoRoot>
          <CircularProgress size={48} />
        </InfoRoot>
      ) : data ? (
        Object.keys(data).map((line) => (
          <LineListItem key={line} line={line} headsigns={data[line]} />
        ))
      ) : (
        <InfoRoot>
          <Typography sx={{ textAlign: "center" }}>
            Brak odjazdów dla danego przystanku
          </Typography>
        </InfoRoot>
      )}
    </Root>
  );
};

export default LineList;
