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
      state.notes.push({
        ...state,
        id: nanoid(),
        title: note.title,
        reasonForTrade: note.reason,
        lessonLearned: note.lesson,
        stopLoss: note.stopLoss,
        takeProfit: note.takeProfit,
        image: "",
        status: note.status,
      });
    },
    deleteNote() {},
    updateNote() {},
  },
});

export const { addNote, deleteNote, updateNote } = noteSlice.actions;
export default noteSlice.reducer;
