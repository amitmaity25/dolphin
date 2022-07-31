const controller = require("../controllers/tag.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/tag/all", controller.findAll);
  // app.get("/api/tag/all/id/{id}", controller.findById);

  app.get("/api/tag/all/id/{id}", (request, response) => {
    response.status(200).send("Hello there, it works!" + response);
  });
};
