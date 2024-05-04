import { PickersInputLocaleText } from "@mui/x-date-pickers";

export const localeText: PickersInputLocaleText<Date> = {
  datePickerToolbarTitle: "Wybrana data",
  nextMonth: "Następny miesiąc",
  previousMonth: "Poprzedni miesiąc",
  calendarViewSwitchingButtonAriaLabel: (currentView) =>
    currentView === "year"
      ? "Przejdź do wyboru dnia"
      : "Przejdź do wyboru roku",
};
