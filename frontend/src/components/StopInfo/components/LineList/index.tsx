import { Card, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSingleStopQuery } from "../../../../queries/useSingleStopQuery";
import { SingleStopResponse } from "../../../../services/getSingleStop";
import { useStopStore } from "../../../../util/store/useStopStore";
import LineListItem from "./components/LineListItem";

const Root = styled(Card)(({ theme }) => ({
  width: "100%",
  overflow: "scroll",
}));

const LineList: React.FC = () => {
  const { stopId } = useStopStore();
  const { data: queryData } = useSingleStopQuery(stopId);
  const [data, setData] = useState<SingleStopResponse | undefined>(queryData);

  useEffect(() => {
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);

  return (
    <Root elevation={5}>
      {data ? (
        Object.keys(data).map((line) => (
          <LineListItem key={line} line={line} headsigns={data[line]} />
        ))
      ) : (
        <Typography sx={{ textAlign: "center" }}>
          Brak odjazdów dla danego przystanku
        </Typography>
      )}
    </Root>
  );
};

export default LineList;
