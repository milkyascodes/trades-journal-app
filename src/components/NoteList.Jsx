import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function NoteList() {
  const { notes } = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");

  const filteredNotes =
    filter === "All" ? notes : notes.map((note) => note.status === filter);

  const handleChange = (e) => {};
  return (
    <div className="rounded-sm p-3 mt-5 flex gap-5 w-full flex-col justify-items-start  ">
      <div className="flex items-center justify-between">
        <h2>My Notes</h2>
        <select value={filter} onChange={handleChange}>
          <option>All</option>
          <option>Profit</option>
          <option>Loss</option>
        </select>
      </div>

      <ul className="w-full">
        {filteredNotes?.map((note) => (
          <li
            key={note.id}
            className="flex items-center w-full justify-between bg-gray-100 mb-4 p-3 rounded-sm gap-5 "
          >
            <div>
              <p>{note.title}</p>
              <p>{note.description}</p>
              <p
                className={`text-sm ${note.status.toLowerCase() === "completed" ? "text-green-600" : "text-orange-700"}`}
              >
                {note.status}
              </p>
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
