import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

interface StopStore {
  stopId?: string;
  stopName?: string;
}

type StopAction = Required<StopStore>;

const initialState: StopStore = {};

const stopSlice = createSlice({
  name: "stop",
  initialState,
  reducers: {
    setActiveStop(state, action: PayloadAction<StopAction>) {
      state.stopId = action.payload.stopId;
      state.stopName = action.payload.stopName;
    },
    setActiveStopId(state, action: PayloadAction<string | undefined>) {
      state.stopId = action.payload;
    },
    setActiveStopName(state, action: PayloadAction<string | undefined>) {
      state.stopName = action.payload;
    },
  },
});

export default stopSlice.reducer;

export const useStopStore = () => {
  const dispatch = useDispatch();
  const { stopId, stopName } = useSelector(
    (state: RootState) => state.stopReducer
  );

  const setActiveStop = (payload: StopAction) =>
    dispatch(stopSlice.actions.setActiveStop(payload));
  const setActiveStopId = (payload?: string) =>
    dispatch(stopSlice.actions.setActiveStopId(payload));
  const setActiveStopName = (payload?: string) =>
    dispatch(stopSlice.actions.setActiveStopName(payload));

  return {
    stopId,
    stopName,
    setActiveStop,
    setActiveStopId,
    setActiveStopName,
  };
};
