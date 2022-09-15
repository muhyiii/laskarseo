const express = require("express");
const {
  TambahAbsensi,
  DataAbsensiPerPengguna,
  TelatAbsen,
  DefaultAbsen,
  CekAbsen,
} = require("../controller/Absensi");
const {
  DaftarPengguna,
  LoginPengguna,
  DataPerPengguna,
  DataSemuaPengguna,
  TambahPanggilan,
} = require("../controller/Pengguna");
const validationMiddleware = require("../middleware/akunMiddleware");
const { akunValidator } = require("../validator/akunValidator");
const schedule = require("node-schedule");
const router = express.Router();
const cron = require("node-cron");

// const telat = new schedule.RecurrenceRule();
// telat.dayOfWeek = [1, 2, 3, 4, 5];
// telat.hour = 10;
// telat.minute = 15;
cron.schedule("20 14 * * 1-5", TelatAbsen, {
  scheduled: true,
  timezone: "Asia/Jakarta",
});
// late.job();

// const depolt = new schedule.RecurrenceRule();
// depolt.dayOfWeek = [1, 2, 3, 4, 5];
// depolt.hour = 10;
// depolt.minute = 20;
cron.schedule("25 14 * * 1-5", DefaultAbsen, {
  scheduled: true,
  timezone: "Asia/Jakarta",
});
// awal.job();

router.get("/", (req, res) => {
  return res.json({
    status: "Ok || Berhasi;",
    message: "Anda Berhasil Mengakses Route Kami, LASKARSEO",
  });
});

// BY ADMIN
router.get("/akun/pengguna", DataSemuaPengguna);

// AKUN
router.post(
  "/akun/buat-akun",
  akunValidator,
  validationMiddleware,
  DaftarPengguna
);
router.post("/akun/masuk", LoginPengguna);
router.put("/akun/pengguna/:idPengguna/tambah-panggilan", TambahPanggilan);
router.get("/akun/pengguna/:idPengguna", DataPerPengguna);

// ABSENSI
router.get("/akun/pengguna/:idPengguna/cek-absen", CekAbsen);
router.post("/akun/pengguna/:idPengguna/absensi/tambah-absensi", TambahAbsensi);
router.get("/akun/pengguna/:idPengguna/absensi", DataAbsensiPerPengguna);

module.exports = router;
