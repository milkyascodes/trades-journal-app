import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote } from "../features/noteSlice";
import { extractTextFromImage } from "../extract";
import { parseTradeInfo } from "../format";

function NoteForm() {
  const forexPairs = [
    "EUR/USD",
    "USD/JPY",
    "GBP/USD",
    "USD/CHF",
    "AUD/USD",
    "USD/CAD",
    "NZD/USD",
    "EUR/GBP",
    "EUR/JPY",
    "GBP/JPY",
  ];
  const dispatch = useDispatch();
  const editingNote = useSelector((state) => state.notes.editingNote);
  const [form, setForm] = useState({
    title: "EUR/USD",
    takeProfit: null,
    stopLoss: null,
    reason: "",
    lesson: "",
    status: "Profit",
    tradeDate: "",
  });

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (file) => {
    setUploadedImage(file);
  };
  useEffect(() => {
    if (editingNote) {
      setForm({
        id: editingNote.id,
        title: editingNote.title,
        takeProfit: editingNote.takeProfit,
        stopLoss: editingNote.stopLoss,
        reason: editingNote.reason,
        lesson: editingNote.lesson,
        status: editingNote.status,
        tradeDate: editingNote.tradeDate,
      });
    }
  }, [editingNote]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadedImage) {
      const text = await extractTextFromImage(uploadedImage);

      console.log("extracted:", text);
      const tradeInfo = parseTradeInfo(text);
      console.log("tradeInfo>>>", tradeInfo);
    }
    if (editingNote) {
      console.log("editing", form);

      dispatch(updateNote(form));
    } else {
      dispatch(addNote(form));
    }
    console.log("cancel");

    setForm({
      title: "EUR/USD",
      takeProfit: null,
      stopLoss: null,
      reason: "",
      lesson: "",
      status: "Profit",
      tradeDate: "",
    });
  };

  return (
    <div className="w-full md:max-w-md bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {editingNote ? "Update Journal" : "Add Journal"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* name /status */}
        <div className="flex w-full items-center justify-between  gap-2">
          <div className="w-full flex-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trade Pair
            </label>
            <select
              required
              name="title" // keep the same state key
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none "
            >
              {forexPairs.map((pair) => (
                <option key={pair} value={pair}>
                  {pair}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trade Date
            </label>
            <input
              required
              type="date"
              name="tradeDate"
              value={form.tradeDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full  flex-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              required
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
              required
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
              required
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
        {/* <div>
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
        </div> */}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-400 text-white py-3 rounded-md hover:bg-blue-500 transition"
        >
          {editingNote ? "Update Journal" : "Add Journal"}
        </button>
      </form>
    </div>
  );
}
export default NoteForm;
