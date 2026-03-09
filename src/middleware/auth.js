

const jwt = require("jsonwebtoken")
//move to .env later
const JWT_SECRET = "taleem-secret-key"

function authMiddleware(req, res, next){

  const token = req.cookies?.token

  if(!token){
    res.locals.user = null
    return next()
  }

  try{

    const payload = jwt.verify(token, JWT_SECRET)

    req.user = payload

    res.locals.displayName = payload.displayName
    res.locals.studentId = payload.studentId
    res.locals.subscriptions = payload.subscriptions || []

  }catch(err){

    res.locals.user = null

  }

  next()
}

module.exports = authMiddleware