const { check } = require("express-validator");
const ModelPengguna = require("../models").dbPenggunas;

const akunValidator = [
  check("username").custom((value) => {
    return ModelPengguna.findOne({ where: { username: value } }).then(
      (user) => {
        if (user) {
          return Promise.reject(
            "Username telah terdaftar, harap gunakan username lain atau login."
          );
        }
      }
    );
  }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),
];

module.exports = { akunValidator };
