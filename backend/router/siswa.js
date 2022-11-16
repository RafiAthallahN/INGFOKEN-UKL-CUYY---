const express = require("express")
const jwt = require("jsonwebtoken")
const md5 = require("md5")
const auth = require("../auth")
const siswa = require("../models/index").siswa
const pembayaran = require("../models/index").pembayaran
const secret_key = "pinfo"
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", auth, async (res, req) => {
  siswa.findAll({
    include: ["kelas", "spp"]
  })
    .then(result => {
      res.json({
        data: result
      })
    })
    .catch(error => {
      res.json({
        message: error.message
      })
    })
})

app.get("/:id", auth, async (res, req) => {
  let param = {
    nisn: req.params.id
  }
  petugas.findOne({
    include: ["kelas", "spp"],
    where: param
  })
    .then(result => {
      res.json({
        data: result
      })
    })
    .catch(error => {
      res.json({
        message: error.message
      })
    })
})

app.post("/", auth, async (res, req) => {
  let data = {
    nisn: req.body.nisn,
    nis: req.body.nis,
    nama: req.body.nama,
    id_kelas: req.body.id_kelas,
    alamat: req.body.alamat,
    no_telp: req.body.no_telp,
    id_spp: req.body.id_spp,
    password: md5(req.body.password),
  }
  petugas.create(data)
    .then(result => {
      res.json({
        message: "Data Added",
        data: result
      })
    })
    .catch(error => {
      res.json({
        message: error.message
      })
    })
})

app.put("/", auth, async (res, req) => {
  let param = {
    nisn: req.body.id
  }
  let data = {
    nis: req.body.nis,
    nama: req.body.nama,
    id_kelas: req.body.id_kelas,
    alamat: req.body.alamat,
    no_telp: req.body.no_telp,
    id_spp: req.body.id_spp,
    password: md5(req.body.password)
  }
  petugas.update({ where: param })
    .then(result => {
      res.json({
        message: "Data Updated",
        data: result
      })
    })
    .catch(error => {
      res.json({
        message: error.message
      })
    })
})

app.delete("/:id", auth, async (res, req) => {
  let param = {
    nisn: req.params.id
  }
  petugas.destroy({ where: param })
    .then(result => {
      res.json({
        data: result
      })
    })
    .catch(error => {
      res.json({
        message: error.message
      })
    })
})

//Login Siswa
app.post("/auth", async (res, req) => {
  let param = {
    nisn: req.params.nisn,
    password: md5(req.params.username)
  }
  let result = await siswa.findOne({ where: param })
  if (result) {
    let payload = JSON.stringify(result)
    //generate token
    let token = jwt.sign(payload, secret_key)
    res.json({
      Logged: true,
      data: result,
      token: token
    })
  } else {
    res.json({
      Logged: false,
      message: "Invalid NISN / Password"
    })
  }
})

module.exports = app