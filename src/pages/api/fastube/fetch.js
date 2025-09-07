import { YtDlp } from "ytdlp-nodejs";

const ytdlp = new YtDlp();
export async function fastubeMP3(url) {
  try {
    const info = await ytdlp.getInfoAsync(url);
    if (info && info._type == "video") {
      const audioFormat = info.requested_formats.find(
        (format) => format.resolution === "audio only"
      );

      if (audioFormat) {
        const audio = {
          title: info.title,
          thumbnail: info.thumbnail,
          categories: info.categories,
          url: audioFormat.url,
        };
        console.log(audio);
        return audio;
      }
    }
  } catch (error) {}
}
