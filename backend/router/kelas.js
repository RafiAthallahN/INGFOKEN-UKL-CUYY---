const express = require("express")
const app = express()
const kelas = require("../models/index").kelas
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", async (res, req) => {
  kelas.findAll()
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

app.get("/:id", async (res, req) => {
  let param = {
    id_kelas: req.params.id
  }
  kelas.findOne({ where: param })
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

app.post("/", async (res, req) => {
  let data = {
    nama_kelas: req.body.nama_kelas,
    kompetensi_keahlian: req.body.kompetensi_keahlian
  }
  kelas.create(data)
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

app.put("/", async (res, req) => {

  let param = {
    id_kelas: req.body.id
  }

  let data = {
    nama_kelas: req.body.nama_kelas,
    kompetensi_keahlian: req.body.kompetensi_keahlian
  }
  kelas.update({ where: param })
    .then(result => {
      res.json({
        message: "Data Updated"
      })
    })
    .catch(error => {
      res.json({
        message: error.message
      })
    })
})

app.delete("/:id", async (res, req) => {
  let param = {
    id_kelas: req.params.id
  }
  kelas.destroy({ where: param })
    .then(result => {
      res.json({
        message: "Data Deleted"
      })
    })
    .catch(error => {
      res.json({
        message: error.message
      })
    })
})

module.exports = app