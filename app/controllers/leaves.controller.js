const config = require("../config/auth.config");
const db = require("../models");
const Leave = db.leave;

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

exports.getLeaves = (req, res) => {
  if (req.body.role === "admin") {
    Leave.find().exec((err, leave) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (leave.length === 0) {
        return res.status(404).send({ message: "No leaves found" });
      }

      res.status(200).send(leave);
    });
  } else {
    Leave.find(
      {
        email: req.body.email,
      },
      {
        _id: 0,
        username: 0,
        email: 0,
        __v: 0,
      }
    ).exec((err, leave) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (leave.length === 0) {
        return res.status(404).send({ message: "No leaves found" });
      }

      res.status(200).send(leave);
    });
  }
};

exports.applyLeaves = (req, res) => {
  const leave = new Leave({
    from_date: req.body.from_date,
    to_date: req.body.to_date,
    type: req.body.type,
    status: req.body.status,
    noofDays: req.body.noofDays,
    cause: req.body.cause,
    username: req.body.username,
    email: req.body.email,
  });

  leave.save((err, leave) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res
        .status(200)
        .send({ message: `${leave.type} Leave Applied successfully` });
    }
  });
};

exports.approveorreject = (req, res) => {
  const id = req.query.id;
  const status = req.body.status;
  Leave.findByIdAndUpdate(
    { _id: id },
    {
      status: status,
    },
    {
      new: true,
    }
  ).exec((err, leave) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!leave) {
      return res.status(404).send({ message: "leave Not found." });
    }

    res.status(200).send({ message: `Leave ${status} successfully` });
  });
};
