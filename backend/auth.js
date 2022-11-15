const jwt = require("jsonwebtoken")
const secret_key = "pinfo"
auth = (req, res, next) => {
  let header = req.headers.authorization
  let token = header && header.split(" ") [1]

  let jwtHeader= {
    algorithm : 'HS256'
  }
   if(token == null){
      res.status(401).json({message : 'Unauthorized'})
  }else{
    jwt.verify(token, secret_key, jwtHeader, (error, user) => {
      if (error) {
        res
        .status(401)
        .json({
          message: "invalid token"
        })
      } else {
        console.log(user);
        next()
      }
    })
  }
}

module.exports = auth