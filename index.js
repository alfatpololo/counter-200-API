// index.js

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

// Server akan berjalan di port 3000
app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});