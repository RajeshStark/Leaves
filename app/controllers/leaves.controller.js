const config = require("../config/auth.config");
const db = require("../models");
const Leave = db.leave;

function extractToken (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
      return req.query.token;
  }
  return null;
}

exports.getLeaves = (req, res) => {

  const token = extractToken(req);
  console.log(token);
  
  Leave.find({
    token: token,
  })
  .exec((err, leave) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!leave) {
      return res.status(404).send({ message: "No leaves found" });
    }
    res.status(200).send(leave);
  })
}



  exports.applyLeaves = (req, res) => {
    const token = extractToken(req);
    const leave = new Leave({
        from_date: req.body.from_date,
        to_date: req.body.to_date,
        type: req.body.type,
        status: req.body.status,
        noofDays: req.body.noofDays,
        cause: req.body.cause,
        token: token
      });
    
      leave.save((err, leave) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else{
          res.status(200).send({message: `${leave.type} Leave Applied successfully`})
        }
      })
  }