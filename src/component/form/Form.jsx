"use client";
import { useState } from "react";
import styles from "@/component/form/Form.module.css";

export default function Form() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null); // State untuk menyimpan data video
  const [error, setError] = useState(""); // State untuk menyimpan pesan error

  const handleTesting = async () => {
    setLoading(true);
    setVideoData(null); // Reset data video sebelumnya
    setError(""); // Reset pesan error sebelumnya

    try {
      const response = await fetch("/api/fastube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        // Jika berhasil, simpan data video ke state
        setVideoData(data.data);
      } else {
        // Jika gagal, simpan pesan error ke state
        setError(data.message);
      }
    } catch (error) {
      setError("Terjadi kesalahan pada koneksi.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk kembali ke form
  const handleBack = () => {
    setVideoData(null);
    setError("");
    setUrl("");
  };

  return (
    <>
      <div className={styles.containerform}>
        {/* Tampilkan form jika tidak ada data video dan tidak ada error */}
        {!videoData && !error && (
          <div className={styles.kotak}>
            <h1>youtube audio testing</h1>
            <br />
            <span>url:</span>
            <div className={styles.form}>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Masukkan URL YouTube di sini"
              />
              <button onClick={handleTesting} disabled={loading}>
                {loading ? "Memproses..." : "testing"}
              </button>
            </div>
            {loading && <p className={styles.loading}>Memproses...</p>}
          </div>
        )}

        {/* Tampilkan data video jika berhasil */}
        {videoData && (
          <div className={styles.kotak}>
            <h2>Video Berhasil Ditemukan!</h2>
            <img
              src={videoData.thumbnail}
              alt={videoData.title}
              className={styles.thumbnail}
            />
            <p>
              <strong>Judul:</strong> {videoData.title}
            </p>
            {/* <p>
              <strong>Kategori:</strong> {videoData.categories}
            </p> */}
            <br />
            <a href={videoData.url} target="_blank" rel="noopener noreferrer">
              Unduh Audio
            </a>
            <br />
            <br />
            <button onClick={handleBack} className={styles.backButton}>
              Kembali
            </button>
          </div>
        )}

        {/* Tampilkan pesan error jika terjadi kesalahan */}
        {error && (
          <div className={styles.kotak}>
            <p className={styles.error}>{error}</p>
            <button onClick={handleBack} className={styles.backButton}>
              Coba Lagi
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// "use client";
// import styles from "@/component/form/Form.module.css";

// export default function Form() {
//   return (
//     <>
//       <div className={styles.containerform}>
//         <div lassName={styles.kotak} id="kotak">
//           <h1>youtube audio testing</h1>
//           <br />
//           <span>url:</span>
//           <div className={styles.form}>
//             <input type="text" />
//             <button>testing</button>
//           </div>
//           <br />
//           <br />
//           <div className={styles.form}>
//             <span id="result"></span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
