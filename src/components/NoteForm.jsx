import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../features/noteSlice";

function NoteForm() {
  const dispatch = useDispatch();
  const editingTask = useSelector((state) => state.notes.editingTask);
  const [form, setForm] = useState({
    title: "",
    takeProfit: null,
    stopLoss: null,
    reason: "",
    lesson: "",
    status: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addNote(form));

    setForm({
      title: "",
      takeProfit: null,
      stopLoss: null,
      reason: "",
      lesson: "",
      status: "",
    });
  };

  return (
    <div className="w-full md:max-w-sm bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {editingTask ? "Update Journal" : "Add Journal"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* name /status */}
        <div className="flex w-full items-center justify-between  gap-4">
          <div className="w-full  flex-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trade Name
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              type="text"
              placeholder="Enter trade name"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full  flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-3 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Profit</option>
              <option>Loss</option>
            </select>
          </div>
        </div>

        {/* profit / loss  */}
        <div className="flex w-full items-center gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Take Profit
            </label>
            <input
              name="takeProfit"
              value={form.takeProfit ?? ""}
              onChange={handleChange}
              type="number"
              placeholder="eg 0.1233"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className=" w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stop Loss
            </label>
            <input
              name="stopLoss"
              value={form.stopLoss ?? ""}
              onChange={handleChange}
              type="number"
              placeholder="eg 0.1233"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* reason / lesson */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Why I took this trade
          </label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            rows="4"
            placeholder="Write your reason"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What I learned
          </label>
          <textarea
            name="lesson"
            value={form.lesson}
            onChange={handleChange}
            rows="4"
            placeholder="Write your lesson"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-400 text-white py-3 rounded-md hover:bg-blue-500 transition"
        >
          {editingTask ? "Update Journal" : "Add Journal"}
        </button>
      </form>
    </div>
  );
}
export default NoteForm;
