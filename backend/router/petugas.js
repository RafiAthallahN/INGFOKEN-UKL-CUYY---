const express = require("express")
const jwt = require("jsonwebtoken")
const md5 = require("md5")
const app = express()
const secret_key = "pinfo"
const petugas = require("../models/index").petugas
const auth = require("../auth")
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", async (res, req) => {
  petugas.findAll()
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
    id_petugas : req.params.id
  }
  petugas.findOne({where:param})
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
    username: req.body.username,
    nama: req.body.nama,
    password: req.body.password,
    level: req.body.level,
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

app.put("/", async (res, req) => {
  let param = {
    id_petugas : req.body.id
  }
  let data = {
    username: req.body.username,
    nama: req.body.nama,
    password: req.body.password,
    level: req.body.level,
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

app.delete("/:id", async (res, req) => {
  let param = {
    id_petugas : req.params.id
  }
  petugas.destroy({where:param})
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

//Login Admin
app.post("/admin", async (res, req) => {
  let param ={
    username : req.params.username,
    password : md5(req.params.username),
    level : "admin"
  }
  let result = await patugas.findOne({where: param})
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
      message: "Invalid Username / Password"
    })
  }
})

//Login petugas
app.post("/petugas", async (res, req) => {
  let param ={
    username : req.params.username,
    password : md5(req.params.username),
    level : "petuigas"
  }
  let result = await patugas.findOne({where: param})
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
      message: "Invalid Username / Password"
    })
  }
})