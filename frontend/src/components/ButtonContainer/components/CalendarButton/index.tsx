import { CalendarMonthOutlined as CalendarIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent as MuiDialogContent,
  styled,
} from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import pl from "date-fns/locale/pl";
import React, { useEffect, useState } from "react";
import { useDatesQuery } from "../../../../queries/useDatesQuery";
import { useShapeQuery } from "../../../../queries/useShapeQuery";
import { getDate } from "../../../../util/getDate";
import { useDateStore } from "../../../../util/store/useDateStore";
import { useIsMobile } from "../../../../util/useIsMobile";
import { localeText } from "./locale";

const DialogContent = styled(MuiDialogContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const CalendarButton: React.FC = () => {
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tmpSelectedDate, setTmpSelectedDate] = useState(new Date());
  const { date, setSelectedDate } = useDateStore();
  const { data: dates } = useDatesQuery();
  const { isFetching } = useShapeQuery(date);
  const lastDate = dates?.[dates?.length - 1];
  const minDate = lastDate ? new Date(lastDate) : new Date();
  const maxDate = dates?.[0] ? new Date(dates[0]) : new Date();

  useEffect(() => {
    if (dates?.length && !date) {
      const date = new Date(dates[0]);
      setSelectedDate(date);
      setTmpSelectedDate(date);
    }
  }, [date, dates, setSelectedDate]);

  const onDialogOpen = () => {
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const onExited = () => {
    // Revert to default if closed without saving
    setTmpSelectedDate(date ?? new Date());
  };

  const onChange = (value: Date | null) => {
    // Date will not be null as no clear seletion button is provided
    setTmpSelectedDate(value as Date);
  };

  const shouldDisableDate = (date: Date) => {
    const dateToCheck = getDate(date);
    return !dates?.includes(dateToCheck);
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
      <Dialog
        open={dialogOpen}
        onClose={onDialogClose}
        fullScreen={isMobile}
        TransitionProps={{ onExited }}
      >
        <DialogTitle>Wybór dnia</DialogTitle>
        <DialogContent>
          <DialogContentText mb={3}>
            Aby zobaczyć archiwalne dane rozkładowe wybierz dzień z którego
            wyświetlane mają być dane.
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
            <StaticDatePicker
              value={tmpSelectedDate}
              onChange={onChange}
              minDate={minDate}
              maxDate={maxDate}
              shouldDisableDate={shouldDisableDate}
              showDaysOutsideCurrentMonth
              timezone="UTC"
              slots={{ actionBar: () => null }}
              slotProps={{ toolbar: { toolbarFormat: "d MMM yyyy" } }}
              localeText={localeText}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose}>Wyjdź</Button>
          <LoadingButton loading={isFetching} color="primary" onClick={onSave}>
            Zapisz
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CalendarButton;
