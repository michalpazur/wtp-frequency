import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

interface ThemeState {
  changed: boolean;
  dark: boolean;
}

const initialState: ThemeState = {
  changed: false,
  dark: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<boolean>) {
      state.dark = action.payload;
      state.changed = true;
    },
    setThemeAuto(state, action: PayloadAction<boolean>) {
      state.dark = action.payload;
    },
  },
});

export default themeSlice.reducer;

export const useThemeStore = () => {
  const dispatch = useDispatch();
  const { changed, dark } = useSelector(
    (state: RootState) => state.themeReducer
  );

  const setTheme = (payload: boolean) =>
    dispatch(themeSlice.actions.setTheme(payload));
  const setThemeAuto = (payload: boolean) =>
    dispatch(themeSlice.actions.setThemeAuto(payload));

  return {
    changed,
    dark,
    setTheme,
    setThemeAuto,
  };
};
