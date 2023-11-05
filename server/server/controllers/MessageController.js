let models = require("../models/models");
class MessageController {
    create(req, res) {
        const { to, from, summary, body } = req.body;
        models.Message.create({ to, from, summary, body })
            .then(i => {
                res.json({ message: i, err: "" })
            })
            .catch(e => res.json({ message: "", error: "message not saved" }))
    }
    read(req, res) {
        models.Message.findOne({
            where: { id: req.params.id }
        }).then(u => res.json(u));
    }
    all(req, res) {
        // a user should only be able to view messages from themselves so add that check later
        if (req.params.type === "to") {
            models.Message.findAll().then(d => res.json({ message: d, error: "" }));
        } else if (req.params.type === "from") {
            models.Message.findAll().then(d => res.json({ message: d, error: "" }));
        }
    }
    delete(req, res) {
        console.log("RECIEVE DELETE COMMAND")
        models.Message.destroy({
            where: {
                id: req.params.id
            }
        }).then(r => {
            res.json({ message: r, error: "" })
        })
    }
}
module.exports = new MessageController();