import Tesseract from "tesseract.js";

export const extractTextFromImage = async (imageFile) => {
  if (!imageFile) return "";

  const { data } = await Tesseract.recognize(imageFile, "eng", {
    // logger: (m) => console.log(m), // optional progress logging
  });

  return data.text;
};
