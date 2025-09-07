import { fastubeMP3 } from "./fastube/fetch.js";

export default async function handler(req, res) {
  // Hanya izinkan method POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { url } = req.body;

    // Pastikan URL ada
    if (!url) {
      return res.status(400).json({ message: "URL is required." });
    }

    const videoData = await fastubeMP3(url);

    // Periksa apakah data video berhasil didapat
    if (videoData) {
      // Kirim respons sukses jika data ditemukan
      res.status(200).json({
        message: "Video info fetched successfully.",
        data: videoData,
      });
    } else {
      // Kirim respons not found jika tidak ada data audio
      res
        .status(404)
        .json({ message: "No audio format found for this video." });
    }
  } catch (error) {
    console.error("Error saat memproses request:", error);
    // Kirim respons error
    res.status(500).json({ message: "Internal Server Error" });
  }
}
