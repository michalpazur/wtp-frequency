import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

interface DateStore {
  date?: string;
}

const initialState: DateStore = {};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
  },
});

export default dateSlice.reducer;

export const useDateStore = () => {
  const dispatch = useDispatch();
  const { date } = useSelector((state: RootState) => state.dateReducer);

  const setSelectedDate = (payload: string) =>
    dispatch(dateSlice.actions.setSelectedDate(payload));

  return {
    date,
    setSelectedDate,
  };
};
