const db = require("../models");

module.exports = function(app) {
  app.get("/api/product", function(req, res) {
    db.Product.findAll()
      .then(function(rows) {
        res.json(rows);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get("/api/product/:id", function(req, res) {
    db.Product.findAll({ where: { id: req.params.id } })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.put(`/api/product/:id`, function(req, res) {
    db.Product.update(req.body, {
      where: { id: req.params.id }
    })
      .then(function(data) {
        res.json({ success: true, data: data });
      })
      .catch(function(error) {
        res.json({ success: false, error: error });
      });
  });
};
