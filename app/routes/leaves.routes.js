
const controller = require("../controllers/leaves.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });


  app.get("/api/leaves/getmyleaves", controller.getLeaves);
  app.post("/app/leaves/applyleave", controller.applyLeaves);
  app.post("/app/leaves/approveorreject",controller.approveorreject);
};
