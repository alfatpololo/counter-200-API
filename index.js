const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); // Memungkinkan komunikasi lintas asal (CORS)

let counterValue = 200; // Inisialisasi counter

// Endpoint untuk mengambil nilai counter saat ini
app.get('/get-counter', (req, res) => {
  res.json({ count: counterValue });
});

// Endpoint untuk mengurangi nilai counter dan mengembalikannya
app.post('/update-counter', (req, res) => {
  if (counterValue > 0) {
    counterValue -= 5;
  } else {
    counterValue = 0;
  }
  res.json({ count: counterValue });
});

module.exports = app; // Ekspor aplikasi Express untuk Vercel