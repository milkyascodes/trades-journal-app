import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, setEditingNote } from "../features/noteSlice";

function NoteList() {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");
  const [viewMore, setViewMore] = useState(null);

  const filteredNotes =
    filter === "All" ? notes : notes.filter((note) => note.status === filter);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (filter !== "All" && !notes.some((note) => note.status === filter)) {
      setFilter("All");
    }
  }, [notes, filter]);

  return (
    <div className=" bg-gray-100 rounded-sm  p-6   flex gap-5 w-full flex-col justify-items-start  ">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold  text-center">My Trades</h2>
        {/* {filteredNotes.length !== 0 && (
          //  & check if it exists
          <select value={filter} onChange={handleChange}>
            <option>All</option>
            <option disabled={!notes.some((note) => note.status === "Profit")}>
              Profit
            </option>
            <option disabled={!notes.some((note) => note.status === "Loss")}>
              Loss
            </option>
          </select>
        )} */}
      </div>

      <ul className="w-full flex flex-wrap gap-4">
        {filteredNotes?.map((note) => (
          <li
            key={note.id}
            className={`border-l-3 ${note.status === "Profit" ? " border-green-300" : " border-red-300"}  bg-white mb-2 p-3 rounded-sm  hover:bg-amber-50 w-full md:w-65 h-fit`}
          >
            <div className="flex items-center w-full justify-between">
              <div>
                <p className="mb-1 text-xs opacity-40 italic ">
                  {note.tradeDate}
                </p>
                <p className="text-lg">{note.title}</p>
              </div>
              <p
                className=" cursor-pointer"
                onClick={() =>
                  setViewMore((state) => (state === note.id ? null : note.id))
                }
              >
                {viewMore !== note.id ? "⤵" : "⤴"}
              </p>
            </div>

            {viewMore === note.id && (
              <>
                <div className="mt-4">
                  <h1 className="font-semibold underline underline-offset-2 ">
                    Why I took this trade
                  </h1>
                  <p>{note.reasonForTrade}</p>
                </div>
                <div className="mt-4">
                  <h1 className="font-semibold underline underline-offset-2 ">
                    What I learned
                  </h1>
                  <p>{note.lessonLearned}</p>
                </div>
                <div className="flex gap-2 mt-4 ">
                  <button
                    onClick={() => dispatch(setEditingNote(note))}
                    className="bg-green-100 p-2 w-full  cursor-pointer text-sm text-green-700 mr-4 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteNote(note.id))}
                    className="bg-red-100 p-2 w-full  cursor-pointer text-sm text-red-700 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default NoteList;
