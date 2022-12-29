import { CalendarMonthOutlined as CalendarIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent as MuiDialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  styled,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDatesQuery } from "../../../../queries/useDatesQuery";
import { useShapeQuery } from "../../../../queries/useShapeQuery";
import { useDateStore } from "../../../../util/store/useDateStore";
import { useIsMobile } from "../../../../util/useIsMobile";

const Select = styled(TextField)(({ theme }) => ({
  width: theme.spacing(30),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    maxWidth: theme.spacing(30),
  },
}));

const DialogContent = styled(MuiDialogContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const CalendarButton: React.FC = () => {
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tmpSelectedDate, setTmpSelectedDate] = useState("");
  const { date, setSelectedDate } = useDateStore();
  const { data: dates } = useDatesQuery();
  const { isFetching } = useShapeQuery(date);

  useEffect(() => {
    if (dates?.length && !date) {
      setSelectedDate(dates[0]);
      setTmpSelectedDate(dates[0]);
    }
  }, [date, dates, setSelectedDate]);

  const onDialogOpen = () => {
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpSelectedDate(e.target.value);
  };

  const onSave = () => {
    setSelectedDate(tmpSelectedDate);
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        variant="outlined"
        color="inherit"
        aria-label="Pokaż okno wyboru daty"
        onClick={onDialogOpen}
      >
        <CalendarIcon />
      </Button>
      <Dialog open={dialogOpen} onClose={onDialogClose} fullWidth={isMobile}>
        <DialogTitle>Wybór dnia</DialogTitle>
        <DialogContent>
          <DialogContentText mb={1}>
            Aby zobaczyć archiwalne dane rozkładowe wybierz dzień z którego
            wyświetlane mają być dane.
          </DialogContentText>
          <Select
            autoFocus
            variant="outlined"
            label="Dzień"
            select
            value={tmpSelectedDate}
            onChange={onChange}
          >
            {dates?.map((date) => (
              <MenuItem value={date} key={date}>
                {format(new Date(date), "dd/MM/yyyy")}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={isFetching} color="primary" onClick={onSave}>
            Zapisz
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CalendarButton;
