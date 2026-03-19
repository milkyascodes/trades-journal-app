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
    deleteNote(state, action) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    setEditingNote(state, action) {
      state.editingNote = action.payload;
    },
    updateNote(state, action) {
      console.log("action", action.payload);

      const index = state.notes.findIndex((index) => {
        return index.id === action.payload.id;
      });

      if (index !== -1) {
        // console.log("old", current(state.notes[index]));

        state.notes[index] = action.payload;
        // console.log("new", current(state.notes[index]));
      }
      state.editingNote = null;
    },
  },
});

export const { addNote, deleteNote, updateNote, setEditingNote } =
  noteSlice.actions;
export default noteSlice.reducer;
