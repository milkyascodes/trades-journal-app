import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function NoteList() {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");

  const filteredNotes =
    filter === "All" ? notes : notes.filter((note) => note.status === filter);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className=" bg-gray-100 rounded-sm  p-6   flex gap-5 w-full flex-col justify-items-start  ">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-4 text-center">My Notes</h2>
        <select value={filter} onChange={handleChange}>
          <option>All</option>
          <option>Profit</option>
          <option>Loss</option>
        </select>
      </div>

      <ul className="w-full ">
        {filteredNotes?.map((note) => (
          <li
            key={note.id}
            className={`border-l-3 ${note.status === "Profit" ? " border-green-300" : " border-red-300"} flex items-center w-full justify-between bg-white mb-2 p-3 rounded-sm `}
          >
            <div>
              <p className="mb-1 text-xs opacity-40 italic ">
                {note.tradeDate}
              </p>
              <p>{note.title}</p>
            </div>
            <div className="flex items-center">
              <button className="cursor-pointer text-sm text-green-700 mr-4">
                Edit
              </button>
              <button className="cursor-pointer text-sm text-red-700">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default NoteList;
