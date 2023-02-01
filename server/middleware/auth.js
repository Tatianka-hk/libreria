var sha256 = require('sha256')
const { verify } = require("jsonwebtoken");

//coding password by sha2 and salt
function  change_password(user_password){
    var pass=process.env.salt;
    pass+=user_password
    return sha256(pass);
}


const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.send({ mes: "no" });

  try {
    const validToken = verify(accessToken,  process.env.ACCESS_TOKEN_SECRET);
    req.user = validToken;
    if (validToken) {
        console.log("USER TOKEN")
      return next();
      
    }
    else{
        console.log("NONONONON TOKEN")
        return res.send({ mes: "no" })
    }
  } catch (err) {
    // return res.send({ error: err });
  }
};

module.exports = { validateToken, change_password };