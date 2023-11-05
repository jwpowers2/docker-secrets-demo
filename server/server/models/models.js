const { Sequelize, DataTypes } = require("sequelize");
const createDefault = require("../startup/createDefault");
const secrets = require('../../secrets');
console.log(secrets.read('/run/secrets/POSTGRES_PASSWORD'))
const sequelize = new Sequelize(`postgres://postgres:${secrets.read('/run/secrets/POSTGRES_PASSWORD')}@db:5432/botlist`);

const AuthProfile = sequelize.define("AuthProfile", {
  apiKey: {
    type: DataTypes.STRING
  },
  secretKey: DataTypes.STRING,
  mfaType: DataTypes.STRING,
  ContributorId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  }
});

const Contributor = sequelize.define("Contributor", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  role: DataTypes.ENUM("user", "admin", "root"),
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  description: DataTypes.STRING,
  apiKey: DataTypes.STRING
});

const Article = sequelize.define("Article", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  content: DataTypes.ARRAY(DataTypes.JSON),
  approvalStatus: DataTypes.STRING,
  subject: DataTypes.STRING,
  mood: DataTypes.STRING,
  series: DataTypes.STRING,
  keywords: DataTypes.ARRAY(DataTypes.STRING),
  ContributorId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  }
});

const Series = sequelize.define("Series", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  subject: DataTypes.STRING,
  keywords: DataTypes.STRING
});

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  to: DataTypes.STRING,
  from: DataTypes.STRING,
  summary: DataTypes.STRING,
  body: DataTypes.STRING
});

Contributor.hasOne(AuthProfile);
Contributor.hasMany(Article);
Contributor.hasMany(Series);
AuthProfile.belongsTo(Contributor);
Article.belongsTo(Contributor);
Series.belongsTo(Contributor);

(async () => {
  sequelize.sync({ force: true }).then(() => {
    createDefault(
      {
        email: process.env.DEFAULT_EMAIL,
        role: process.env.DEFAULT_ROLE,
        firstName: process.env.DEFAULT_FIRSTNAME,
        lastName: process.env.DEFAULT_LASTNAME,
        description: process.env.DEFAULT_DESCRIPTION,
        password: process.env.DEFAULT_PASSWORD
      },
      Contributor
    );
  });
})();

module.exports = { Contributor, Article, AuthProfile, Message, Series };
