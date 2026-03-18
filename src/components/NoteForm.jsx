import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function NoteForm() {
  const dispatch = useDispatch();
  const editingTask = useSelector((state) => state.notes.editingTask);
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [lesson, setLesson] = useState("");
  const [status, setStatus] = useState("");
  const handleSubmit = (e) => {};

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {editingTask ? "Update Journal" : "Add Journal"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trade Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter trade name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Profit</option>
            <option>Loss</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Why I took this trade
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="4"
            placeholder="Write your message"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What did I understand
          </label>
          <textarea
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
            rows="4"
            placeholder="Write your message"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-400 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          {editingTask ? "Update Journal" : "Add Journal"}
        </button>
      </form>
    </div>
  );
}
export default NoteForm;
