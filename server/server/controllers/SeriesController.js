let models = require("../models/models");
class SeriesController {
  create(req, res) {
    const { name, subject, keywords } = req.body;
    models.Series.create({ name, subject, keywords })
      .then(i => {
        res.json({ message: i, err: "" });
      })
      .catch(e => res.json({ message: "", error: "series not saved" }));
  }
  read(req, res) {
    models.Series.findOne({
      where: { id: req.params.id }
    }).then(u => res.json(u));
  }
  all(req, res) {
    // a user should only be able to view messages from themselves so add that check later
    if (req.params.type === "to") {
      models.Series.findAll().then(d => res.json({ message: d, error: "" }));
    } else if (req.params.type === "from") {
      models.Series.findAll().then(d => res.json({ message: d, error: "" }));
    }
  }
  delete(req, res) {
    models.Series.destroy({
      where: {
        id: req.params.id
      }
    }).then(r => {
      res.json({ message: r, error: "" });
    });
  }
}
module.exports = new SeriesController();
