const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); // Memungkinkan komunikasi lintas asal (CORS)

let counterValue = 200; // Inisialisasi counter

// Function untuk mengurangi counter
function decrementCounter() {
  if (counterValue > 0) {
    counterValue -= 4; // Kurangi counter sebanyak 4 setiap kali dipanggil
  } else {
    // Ketika counter mencapai 0, tunggu 1 menit dan reset kembali ke 200
    setTimeout(() => {
      counterValue = 200; // Reset counter ke 200 setelah 1 menit
    }, 60000); // 60000 ms = 1 menit
  }
}

// Jalankan decrementCounter setiap 1 menit (60000 ms)
setInterval(decrementCounter, 60000); // Mengurangi counter setiap 1 menit

// Endpoint untuk mengambil nilai counter saat ini
app.get('/get-counter', (req, res) => {
  res.json({ count: counterValue });
});

// Endpoint untuk mengurangi nilai counter secara manual jika diperlukan
app.post('/update-counter', (req, res) => {
  if (counterValue > 0) {
    counterValue -= 4; // Sesuaikan pengurangan dengan 4
  } else {
    counterValue = 0;
  }
  res.json({ count: counterValue });
});

module.exports = app; // Ekspor aplikasi Express untuk Vercel