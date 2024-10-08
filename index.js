const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); // Memungkinkan komunikasi lintas asal (CORS)

let counterValue = 128; // Inisialisasi counter dimulai dari 180
let lastDecrementDate = new Date(); // Waktu terakhir decrement (default ke sekarang)

// Helper function untuk mendapatkan waktu di zona WIB (UTC+7)
function getCurrentWIBTime() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000; // Mengubah ke UTC
  const wibOffset = 7 * 60 * 60000; // Offset untuk WIB (UTC+7)
  return new Date(utc + wibOffset); // Mengembalikan waktu dalam zona WIB
}

// Function untuk mengecek apakah sudah lewat jam 08:00 WIB hari ini
function hasPassed8AMWIB() {
  const nowWIB = getCurrentWIBTime();
  const currentHour = nowWIB.getHours();
  const currentDay = nowWIB.getDate();

  // Cek apakah sekarang lewat dari jam 8 pagi WIB, dan sudah hari berikutnya dari lastDecrementDate
  const lastDecrementWIB = getCurrentWIBTime();
  lastDecrementWIB.setTime(lastDecrementDate.getTime()); // Set lastDecrementDate ke zona WIB
  return currentHour >= 8 && nowWIB.getDate() !== lastDecrementWIB.getDate();
}

// Function untuk mengurangi counter jika sudah lewat jam 8 pagi WIB
function updateCounterIfNeeded() {
  if (hasPassed8AMWIB() && counterValue > 0) {
    counterValue -= 4; // Kurangi counter sebanyak 4
    if (counterValue < 0) {
      counterValue = 0; // Pastikan counter tidak kurang dari 0
    }
    lastDecrementDate = getCurrentWIBTime(); // Update lastDecrementDate ke sekarang dalam WIB
  }
}

// Endpoint untuk mengambil nilai counter saat ini
app.get('/get-counter', (req, res) => {
  updateCounterIfNeeded(); // Perbarui counter jika sudah jam 8 pagi WIB
  res.json({ count: counterValue });
});

module.exports = app; // Ekspor aplikasi Express untuk Vercel