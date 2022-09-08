const ModelPengguna = require("../models").dbPenggunas;
const ModelAbsensi = require("../models").dbAbsensis;
const ModelStat = require("../models").statusAbsensis;
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const DaftarPengguna = async (req, res) => {
  try {
    let body = req.body;
    if (
      (body.username == "" && body.email == "") ||
      body.nama == "" ||
      body.role == "" ||
      body.gender == ""
    ) {
      return res.status(403).json({
        status: "Gagal",
        messege: "Harap Mengisi Semua Kolom",
      });
    }
    body.password = await bcrypt.hashSync(body.password, 10);
    const user = await ModelPengguna.create({
      nama: body.nama,
      username: body.username,
      email: body.email,
      password: body.password,
      panggilan: "",
      role: body.role,
      gender: body.gender,
    });
    const stat = await ModelStat.create({
      idPengguna: user.id,

      stat: "DEFAULT",
    });
    console.log(user);
    console.log(stat);
    res.status(201).json({
      messege: "Register Akun LASKARSEO App Berhasil",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: `Ada Kesalahannn + ${error}`,
    });
  }
};

const LoginPengguna = async (req, res) => {
  try {
    const { username, password } = req.body;
    const dataUser = await ModelPengguna.findOne({
      where: {
        username: username,
      },
    });
    if (dataUser === null) {
      return res.status(422).json({
        messege: "Anda Belum Terdaftar Di Data LASKARSEO App",
      });
    }

    const verify = bcrypt.compareSync(password, dataUser.password);
    if (!verify) {
      return res.status(422).json({
        messege: "Password Tidak Sama",
      });
    }
    const token = jwt.sign(
      {
        id: dataUser.id,
        username: dataUser.username,
        role: dataUser.role,
      },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "1m",
      }
    );
    return res.json({
      messsege: `Anda Berhasil Login LASKARSEO App`,
      token,
      dataUser,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const TambahPanggilan = async (req, res) => {
  try {
    const { idPengguna } = req.params;

    const dataUser = await ModelPengguna.findByPk(idPengguna);
    if (dataUser === null) {
      return res.status(422).json({
        messege: "Data tidak ditemukan",
      });
    }
    await ModelPengguna.update(
      {
        panggilan: req.body.panggilan,
      },
      {
        where: { id: idPengguna },
      }
    );
    console.log(dataUser);
    res.status(200).json({
      messege: "Nama panggilan telah ditetapkan",
      namaPanggilan: req.body.panggilan,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};
const DataSemuaPengguna = async (req, res) => {
  try {
    const dataUser = await ModelPengguna.findAll({
      attributes: ["id", "nama", "username", "panggilan", "gender", "role"],
      include: [
        {
          model: ModelAbsensi,
          require: true,
          as: "absen",

          attributes: ["absen", "keterangan", "createdAt"],
        },
      ],
    });
    if (dataUser === null) {
      return res.json({
        messege: "Data Tidak Ditemukan",
      });
    }
    return res.json({
      messege: `Berhasil, Berikut Data Para Pengguna `,
      dataUser,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const DataPerPengguna = async (req, res) => {
  try {
    const { idPengguna } = req.params;
    const dataUser = await ModelPengguna.findByPk(idPengguna, {
      attributes: ["id", "nama", "username", "panggilan", "gender", "role"],
    });
    if (dataUser === null) {
      return res.json({
        status: "`Gagal",
      });
    }
    return res.json({
      messege: `Berhasil, Berikut Data Pengguna Id `,
      dataUser: dataUser,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};
module.exports = {
  DaftarPengguna,
  LoginPengguna,
  TambahPanggilan,
  DataPerPengguna,
  DataSemuaPengguna,
};
