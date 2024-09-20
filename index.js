const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); // Memungkinkan komunikasi lintas asal (CORS)

let counterValue = 192; // Inisialisasi counter dimulai dari 192

// Function untuk mengurangi counter
function decrementCounter() {
  if (counterValue > 0) {
    counterValue -= 4; // Kurangi counter sebanyak 4 setiap kali dipanggil
    if (counterValue < 0) {
      counterValue = 0; // Pastikan counter tidak kurang dari 0
    }
  }
}

// Jalankan decrementCounter setiap 24 jam (86400000 ms)
setInterval(decrementCounter, 86400000); // Mengurangi counter setiap 24 jam

// Endpoint untuk mengambil nilai counter saat ini
app.get('/get-counter', (req, res) => {
  res.json({ count: counterValue });
});

module.exports = app; // Ekspor aplikasi Express untuk Vercel
