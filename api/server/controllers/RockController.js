let Rock = require("../models/Rock");

class RockController {
 
  read(req, res) {
    Rock.findAll(req.params.email).then(u => res.json(u));
  }
  all(req, res) {
    Rock.findAll().then(u => res.json(u));
  }
  create(req, res) {
    try {
      let payload = {
        name: req.body.name,
        texture: req.body.texture,
        color: req.body.color
      };
      Rock.create(payload)
      .then(i => {
        console.log(i)
      
        const messageString = JSON.stringify(
        {
              name:req.body.name,
              texture:req.body.texture, 
              color:req.body.color
          })
        res.json({message:i})
      });
    } catch(e){
      console.error(e)
    }
  }
  delete(req, res) {
    try{
      Rock.destroy({
          where: {
              id:req.params.id
          }
      })
      .then(i=>{
        res.json({message:i})
      })
    } catch(e){
      console.log(e)
    }
  }
  update(req, res) {
    try{
      Rock.update(
        {
          name:req.body.name,
          texture:req.body.texture,
          color:req.body.color
        }, {
          where: {
              id: req.params.id
          }
      }).then(updated=>{
        console.log(updated);
        const messageString = JSON.stringify(
          {
              name:req.body.name,
              texture:req.body.texture, 
              color:req.body.color
          })
      })
    } catch(e){
      console.log(e)
    }
  }
}

module.exports = new RockController();