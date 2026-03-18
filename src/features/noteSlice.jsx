import { createSlice, nanoid } from "@reduxjs/toolkit";

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
    addNote(state, action) {
      const note = action.payload;
      console.log("form", note);
      state.notes.push({
        id: nanoid(),
        title: note.title,
        reasonForTrade: note.reason,
        lessonLearned: note.lesson,
        stopLoss: note.stopLoss,
        takeProfit: note.takeProfit,
        status: note.status,
      });
    },
    deleteNote() {},
    updateNote() {},
  },
});

export const { addNote, deleteNote, updateNote } = noteSlice.actions;
export default noteSlice.reducer;
