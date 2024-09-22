const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); // Memungkinkan komunikasi lintas asal (CORS)

let counterValue = 184; // Inisialisasi counter dimulai dari 192
let lastDecrementTime = Date.now(); // Waktu terakhir decrement (timestamp sekarang)

// Function untuk menghitung berapa banyak hari yang sudah berlalu
function calculateDaysPassed(lastTime) {
  const now = Date.now();
  const millisecondsPerDay = 86400000; // 24 jam dalam milidetik
  const timeDifference = now - lastTime; // Selisih waktu sekarang dengan lastDecrementTime
  return Math.floor(timeDifference / millisecondsPerDay); // Hitung berapa hari yang telah berlalu
}

// Function untuk mengurangi counter berdasarkan hari yang telah berlalu
function updateCounter() {
  const daysPassed = calculateDaysPassed(lastDecrementTime);
  
  if (daysPassed > 0 && counterValue > 0) {
    counterValue -= 4 * daysPassed; // Kurangi 4 untuk setiap hari yang telah berlalu
    if (counterValue < 0) {
      counterValue = 0; // Pastikan counter tidak kurang dari 0
    }
    lastDecrementTime = Date.now(); // Update lastDecrementTime ke waktu sekarang
  }
}

// Endpoint untuk mengambil nilai counter saat ini
app.get('/get-counter', (req, res) => {
  updateCounter(); // Perbarui counter sebelum mengembalikan hasil
  res.json({ count: counterValue });
});

module.exports = app; // Ekspor aplikasi Express untuk Vercel