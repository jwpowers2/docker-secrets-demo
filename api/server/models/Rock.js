const { Sequelize, DataTypes } = require('sequelize');
const secrets = require('../../secrets')

const sequelize = new Sequelize(`${secrets.read('/run/secrets/DB_CONN')}`);
const Rock = sequelize.define('Rock', {
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    texture: DataTypes.STRING,
    color: DataTypes.STRING,
});
(async ()=>{
    await sequelize.sync({force:true});
})();

module.exports = Rock;