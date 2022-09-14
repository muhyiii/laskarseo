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

const telat = new schedule.RecurrenceRule();
telat.dayOfWeek = [ new schedule.Range(1, 5)];
telat.hour = 6;
telat.minute = 0;
schedule.scheduleJob(telat, TelatAbsen);

const depolt = new schedule.RecurrenceRule();
depolt.dayOfWeek = [ new schedule.Range(1, 5)];
depolt.hour = 8;
depolt.minute = 10;

schedule.scheduleJob(
  depolt,
  DefaultAbsen
);

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
