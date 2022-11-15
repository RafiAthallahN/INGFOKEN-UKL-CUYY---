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
  spp.findOne({where:param})
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

