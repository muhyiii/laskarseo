const ModelAbsensi = require("../models").dbAbsensis;
const Pivot = require("../models").pivotAbsensis;
const ModelPengguna = require("../models").dbPenggunas;
const ModelStat = require("../models").statusAbsensis;

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

    await ModelStat.update(
      { stat: body.absen },
      {
        where: {
          idPengguna: idPengguna,
        },
      }
    );
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
        messege: `Data Absensi Pengguna Tidak Ditemukan`,
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

const CekAbsen = async (req, res) => {
  try {
    const { idPengguna } = req.params;
    const isAbsen = await ModelStat.findByPk(idPengguna, {
      attributes: ["stat"],
    });
    if (isAbsen === null || isAbsen === 0) {
      return res.json({
        messege: `Data Status Pengguna Tidak Ditemukan`,
      });
    }
    return res.json({
      messege: "Berhasil Cek Status",
      isAbsen,
    });
  } catch {
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

    const telat = await ModelStat.findAll({ where: { stat: "DEFAULT" } });

    await Promise.all(
      telat.map(async (data) => {
        console.log(data);
        const baru = await ModelAbsensi.create({
          absen: "TANPA KETERANGAN",
          idPengguna: data.idPengguna,
          keterangan: "",
          tanggal: time,
        });
        console.log(baru);
      })
    );
    await ModelStat.update({ stat: "NOT" }, { where: { stat: "DEFAULT" } });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const DefaultAbsen = async (req, res) => {
  try {
    const def = await ModelStat.findAll();
    await Promise.all(
      def.map(async (data) => {
        const jadiDef = await ModelStat.update(
          {
            stat: "DEFAULT",
          },
          {
            where: {
              idPengguna: data.idPengguna,
            },
          }
        );
        console.log(jadiDef);
      })
    );
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};
module.exports = {
  TambahAbsensi,
  DataAbsensiPerPengguna,
  CekAbsen,
  TelatAbsen,
  DefaultAbsen,
};
