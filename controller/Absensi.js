const ModelAbsensi = require("../models").dbAbsensis;
const Pivot = require("../models").pivotAbsensis;
const ModelPengguna = require("../models").dbPenggunas;

const TambahAbsensi = async (req, res) => {
  try {
    let body = req.body;
    let { idPengguna } = req.params;

    const absent = await ModelAbsensi.create({
      absen: body.absen,
      keterangan: body.keterangan,
      idPengguna: idPengguna,
      tanggal: body.tanggal,
    });
    const pivotnya = await Pivot.create({
      idPengguna: idPengguna,
      idAbsensi: absent.id,
    });
    console.log(absent);
    console.log(pivotnya);
    res.status(200).json({
      messege: "Berhasil menambah absen hari ini",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const DataAbsensiPerPengguna = async (req, res) => {
  try {
    const { idPengguna } = req.params;
    const dataAbsensi = await ModelAbsensi.findAll({
      where: { idPengguna: idPengguna },
      attributes: ["absen", "keterangan", "tanggal"],
    });
    if (dataAbsensi === null || dataAbsensi === 0) {
      return res.json({
        messege: `Data Absensi Pengguna  Tidak Ditemukan`,
      });
    }
    return res.json({
      messege: `Berhasil, Berikut Data Absensi Pengguna `,
      dataAbsensi,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const TelatAbsen = async (req, res) => {
  try {
    var time = new Date();

    // const dataAbsensi = await ModelAbsensi.findAll({
    //   attributes: ["absen", "keterangan", "tanggal"],
    // });
    const dataUser = await ModelPengguna.findAll({
      attributes: ["id", "nama", "username", "panggilan", "gender", "role"],
      include: [
        {
          model: ModelAbsensi,
          require: true,
          as: "Absensi",

          attributes: ["absen", "keterangan", "createdAt"],
        },
      ],
    });

    dataUser.map((e) => {
      // if (e.Absensi === []) {
      //   console.log(dataUser[e] + "kurang data");
      // }
      console.log(e.Absensi.e.tanggal.toLocaleDateString('id') === time.toLocaleDateString('id'));
    });
    // // var et;
    // dataAbsensi.map(async (e) => {
    //   // if (e.tanggal.toLocaleDateString() === Date().toLocaleDateString())
    //   console.log(e.tanggal.toLocaleDateString("id"));
    //   console.log(time.toLocaleDateString("id"));
    //   console.log(e.absen);

    //   // if (e.tanggal.toLocaleDateString("id") !== time.toLocaleDateString("id"))
    //   //   await ModelAbsensi.create({
    //   //     absen: "TANPA KETERANGAN",

    //   //     idPengguna: e.id,
    //   //     tanggal: time,
    //   //   });
    // });
    // for (let index = 0; index < dataAbsensi.length; index++) {
    //   const element = array[index];
    //   console.log(element.absen);
    // }
    // console.log(dataAbsensi);
    // console.log(dataUser);
    console.log("asdas");
  } catch (error) {}
};
module.exports = { TambahAbsensi, DataAbsensiPerPengguna, TelatAbsen };
