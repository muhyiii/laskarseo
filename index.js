const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 1221;
const cors = require("cors");
const router = require("./routes");



app.use(cors());
app.use(express.json());
// app.use(scheduleJob);
app.use(router);

app.listen(port, () => {
  console.log();
  console.log(
    `....................Server Berjalan di port ${port} Berhasil....................`
  );
});
