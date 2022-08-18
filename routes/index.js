const express = require("express");
const {
  TambahAbsensi,
  DataAbsensiPerPengguna,
  TelatAbsen,
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
const rule = new schedule.RecurrenceRule();
rule.hour = 10;

// schedule.scheduleJob("1 * * * * *", TelatAbsen);

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
router.post("/akun/pengguna/:idPengguna/absensi/tambah-absensi", TambahAbsensi);
router.get("/akun/pengguna/:idPengguna/absensi", DataAbsensiPerPengguna);

module.exports = router;
