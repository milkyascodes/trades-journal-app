import { configureStore } from "@reduxjs/toolkit";
import NoteSlice from "./noteSlice";
export const store = configureStore({
  reducer: {
    notes: NoteSlice,
  },
});
