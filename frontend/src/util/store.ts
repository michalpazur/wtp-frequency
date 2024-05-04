import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import dateReducer from "./store/useDateStore";
import stopReducer from "./store/useStopStore";
import themeReducer from "./store/useThemeStore";

const rootReducer = combineReducers({
  dateReducer,
  themeReducer,
  stopReducer,
});

const persistConfig = {
  key: "root",
  whitelist: ["themeReducer"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredPaths: ["dateReducer.date"],
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "date/setSelectedDate",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

const persistor = persistStore(store);
export { persistor, store };
