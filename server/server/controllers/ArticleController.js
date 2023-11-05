let models = require("../models/models");
let cryptoTools = require("../jwt/CryptoTools");
const { Sequelize, QueryError } = require("sequelize");
const moment = require("moment");

const sequelize = new Sequelize(`postgres://postgres:${process.env.POSTGRES_PASSWORD}@db:5432/botlist`);

class ArticleController {
  read(req, res) {
    if (req.params.id === "all") {
      models.Article.findAll().then(u => res.json({ message: u, error: "" }));
    } else {
      models.Article.findOne({
        where: {
          id: req.params.id
        },
        include: models.Contributor
      }).then(u => res.json({ message: u, error: "" }));
    }
  }
  all(req, res) {
    const { subject, query } = req.params;
    if (subject !== "" && query !== "") {
      models.Article.findAll({
        attributes: ["id", "name"],
        where: {
          subject: query
        }
      }).then(u => res.json({ message: u, error: "" }));
    } else {
      models.Article.findAll().then(u => res.json({ message: "", error: "nothing found" }));
    }
  }
  mostRecent(req, res) {
    models.Article.findAll({
      where: {
        approvalStatus: "approved"
      },
      attributes: ["id", "name"],
      limit: 5,
      order: [["createdAt", "DESC"]]
    }).then(u => {
      console.log(u);
      res.json(u);
    });
  }
  notApproved(req, res) {
    models.Article.findAll({
      where: {
        approvalStatus: "notApproved"
      },
      attributes: ["id", "name"],
      order: [["createdAt", "DESC"]]
    }).then(u => {
      console.log(u);
      res.json(u);
    });
  }
  trendingTopics(req, res) {
    models.Article.findAll({
      where: {
        createdAt: {
          [Sequelize.Op.gte]: moment()
            .subtract(7, "days")
            .toDate()
        },
        approvalStatus: "approved"
      },
      attributes: [
        "subject",
        [sequelize.fn("COUNT", sequelize.col("id")), "count_subject"]
      ],
      group: "subject"
    }).then(u => {
      console.log(u);
      res.json(u);
    });
  }
  trendingContributors(req, res) {
    console.log("return trending contributors");
    models.Article.findAll({
      where: {
        createdAt: {
          [Sequelize.Op.gte]: moment()
            .subtract(7, "days")
            .toDate()
        }
      },
      attributes: [
        "ContributorId",
        [sequelize.fn("COUNT", sequelize.col("id")), "count_ContributorId"]
      ],
      //include: { model: models.Contributor, required: true },
      group: "ContributorId"
    }).then(u => {
      console.log(u);
      res.json(u);
    });
  }
  mostPopularTopics(req, res) {
    console.log("return trending articles");
    models.Article.findAll({
      where: {
        approvalStatus: "approved"
      },
      attributes: [
        "subject",
        [sequelize.fn("COUNT", sequelize.col("id")), "count_subject"]
      ],
      group: "subject"
    }).then(u => {
      console.log(u);
      res.json(u);
    });
  }
  trendingArticles(req, res) {
    console.log("return trending articles");
  }
  create(req, res) {
    console.log("################# creat emethod fires");
    const {
      name,
      content,
      approvalStatus,
      subject,
      mood,
      series,
      keywords,
      contributorId
    } = req.body;


    models.Contributor.findAll({ where: { id: contributorId } }).then(resultArray => {
      if (resultArray.length === 0) {
        res.json({ message: "", error: "contributor id not valid" });
      } else if (resultArray.length === 1) {
        const contributor = resultArray[0];
        models.Article.findAll({ where: { name } }).then(resultArray => {
          console.log(
            `created article ######################### ${JSON.stringify(
              resultArray
            )}`
          );
          if (resultArray.length === 0) {
            let payload = {
              name,
              content,
              approvalStatus,
              subject,
              mood,
              series,
              keywords,
              ContributorId: contributor.id
            };
            models.Article.create(payload).then(i => {
              console.log(`created article ######################### ${i}`);
              res.json({ message: i });
            });
          } else {
            res.json({
              message: "",
              error: "that article name already exists"
            });
          }
        });
      }
    });

  }
  delete(req, res) {
    models.Article.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => res.json({ message: "success", error: "" }));
  }
  update(req, res) {
    models.Article.update(
      { items: req.body.items },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(() => {
      // which subscription gets the publish ?
      // a user should only hear about what they are allowed to pull
      // figure out which users have access to this Article and update them all
    });
  }
  approve(req, res) {
    models.Article.update(
      { approvalStatus: "approved" },
      { where: { id: req.params.id } }
    )
      .then(result => res.json({ message: "success", error: "" }))
      .catch(err => res.json({ message: "", error: "fail" }));
  }
  disapprove(req, res) {
    models.Article.update(
      { approvalStatus: "notApproved" },
      { where: { id: req.params.id } }
    )
      .then(result => res.json({ message: "success", error: "" }))
      .catch(err => res.json({ message: "", error: "fail" }));
  }
}

module.exports = new ArticleController();
