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
  const [isImageExtracted, setIsImageExtracted] = useState(false);

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
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingNote) {
      console.log("editing", form);

      // dispatch(updateNote(form));
    } else {
      dispatch(addNote(form));
      console.log("form", form);
    }
    console.log("cancel");
    setIsImageExtracted(false);

    setForm({
      reason: "",
      lesson: "",
    });
    setUploadedImage(null);
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();

    if (uploadedImage) {
      const text = await extractTextFromImage(uploadedImage);

      // console.log("extracted:", text);
      const tradeInfo = parseTradeInfo(text);
      // console.log("tradeInfo>>>", tradeInfo);

      const formatDate = (dateString) => {
        if (!dateString) return "";

        const [datePart] = dateString.split(" "); // remove time
        return datePart.replace(/\./g, "-"); // convert to YYYY-MM-DD
      };

      setForm((prev) => ({
        ...prev,
        tradeDate: formatDate(tradeInfo.tradeDate) || prev.tradeDate,
        takeProfit: tradeInfo.takeProfit ?? prev.takeProfit,
        stopLoss: tradeInfo.stopLoss ?? prev.stopLoss,
        title: tradeInfo.pair ?? prev.title,
        status: tradeInfo.tradeType,
      }));
      setIsImageExtracted(true);
    }
    setUploadedImage(null);
  };

  // console.log("image", uploadedImage);

  return (
    <div className="w-full md:max-w-md bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {editingNote ? "Update Journal" : "Add Journal"}
      </h2>
      <form onSubmit={handlePhotoSubmit} className="">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Screenshot
        </label>
        <div className="flex gap-4">
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />

          <button
            type="submit"
            className="w-[40%] bg-blue-400 text-white py-3 rounded-md hover:bg-blue-500 transition"
          >
            {editingNote ? "Update photo" : "Add photo"}
          </button>
        </div>
      </form>
      {/* ....... */}

      {isImageExtracted && (
        <div className="mt-4 bg-amber-50 border border-black/10 rounded-md p-3">
          <div className="flex justify-between mb-2">
            <div className="flex gap-2">
              <h1 className="text-2xl">{form.title}</h1>{" "}
              <small>{form.status}</small>
            </div>

            <p className="opacity-90 text-sm">{form.tradeDate}</p>
          </div>
          <div className="flex  justify-between ">
            <p className="flex-1">Stop Loss</p>
            <p className="flex-3">→ {form.stopLoss}</p>
          </div>
          <div className="flex  justify-between">
            <p className="flex-1">Take Profit</p>
            <p className="flex-3">→ {form.takeProfit}</p>
          </div>
        </div>
      )}

      {/* ..... */}

      {isImageExtracted && (
        <form onSubmit={handleSubmit} className="form mt-4 space-y-4">
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
            {editingNote ? "Update Journal" : "Add Journal"}
          </button>
        </form>
      )}
    </div>
  );
}
export default NoteForm;
