import { createSlice, current, nanoid } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  loading: false,
  error: "",
  status: "Profit",
  editingNote: null,
};
const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote(state, action) {
      const note = action.payload;
      console.log("form,status", note.status);
      state.notes.push({
        id: nanoid(),
        title: note.title,
        reasonForTrade: note.reason,
        lessonLearned: note.lesson,
        stopLoss: note.stopLoss,
        takeProfit: note.takeProfit,
        tradeDate: note.tradeDate,
        status: note.status,
      });
      console.log("MYform", current(state.notes));
    },
    deleteNote() {},
    updateNote() {},
  },
});

export const { addNote, deleteNote, updateNote } = noteSlice.actions;
export default noteSlice.reducer;
