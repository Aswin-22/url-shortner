const { getUser } = require("../service/auth");

function checkAuthentication(req, res, next) {
  const uid = req.cookies?.uid;
  req.user = null;

  if (!uid) return next();

  const user = getUser(uid);
  req.user = user;

  next();
}

function restrictTo(roles){
  return function(req, res, next){
    if(!req.user) return res.redirect("/login");
    if(!roles.includes(req.user.role)) return res.end("UnAuthorised");

    next();
  }
}

module.exports = { checkAuthentication, restrictTo };
