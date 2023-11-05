let models = require("../models/models");
const bcrypt = require("bcryptjs")
const process = require('dotenv')
const cryptoTools = require('../jwt/CryptoTools');


  const read = async(req, res) => {
    console.log(req.params.id);
    if (req.params.id === 'all') {
      const users = await models.Contributor.findAll()
      res.json({ message: JSON.stringify(users), error: "" });
    } else {
      const user = models.Contributor.findOne({
        where: { id: req.params.id }
      })
      res.json({ message: user, error: "" });
    }
    res.json({message: "", error: "error somewhere"})
  }
  const create = async(req, res) => {

    const { email, role, firstName, lastName, description, password } = req.body;

    models.Contributor.findAll({ where: { email } })
      .then(resultArray => {

        if (resultArray.length === 0) {

          bcrypt.genSalt(10, (err, salt) => {

            if (!err) {

              cryptoTools.encrypt(email)
                .then(apiKey => {
                  bcrypt.hash(password, salt, (err, hash) => {
                    const payload = {
                      email, role, firstName, lastName, description, password: hash
                    }
                    models.Contributor.create(payload).then(i => {
                      res.json({ message: i, err: "" })
                    });
                  })
                })
                .catch(e => {
                  res.json({ message: "", error: e })
                })

            } else {
              res.json({ message: "", error: err })
            }
          })
        } else {
          res.json({ message: "", error: "that user already exists" })
        }
      })
  }
  const remove = async(req, res) => {
    models.Contributor.destroy({
      where: {
        id: req.params.id
      }
    })
  }
  const update = async(req, res) => {
    const { firstName, lastName } = req.body;
    models.Contributor.update({ firstName, lastName }, {
      where: {
        id: req.params.id
      }
    })
  }


module.exports = {create, read, update, remove};