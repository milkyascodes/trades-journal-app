import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  loading: false,
  error: "",
  status: "All",
  editingNote: null,
};
const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote() {},
    deleteNote() {},
    updateNote() {},
  },
});

export const { addNote, deleteNote, updateNote } = noteSlice.actions;
export const noteReducer = noteSlice.reducer;
