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
schedule.scheduleJob(
  {
    hour: 8,
    minute: 25,
    dayOfWeek: [5, new schedule.Range(1, 4)],
    tz: "Asia/Jakarta",
  },
  TelatAbsen
);

schedule.scheduleJob(
  {
    hour: 8,
    minute: 10,
    dayOfWeek: [5, new schedule.Range(1, 4)],
    tz: "Asia/Jakarta",
  },
  DefaultAbsen
);

//  schedule.scheduleJob(rule, DefaultAbsen);

// () => {
//   var aestTime = new Date().toLocaleString("id", {timeZone: "Asia/Jakarta"});
//   const date = Date();
//   console.log('================================================');
//   console.log(rule);
//   console.log(aestTime);
// };

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
