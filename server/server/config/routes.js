const ContributorController = require("../controllers/ContributorController");
const ArticleController = require("../controllers/ArticleController");
const AuthenticationController = require("../controllers/AuthenticationController");
const MessageController = require("../controllers/MessageController");
const SeriesController = require("../controllers/SeriesController");

module.exports = app => {
  app.get("/api/article/approve/:id", ArticleController.approve);
  app.get("/api/article/disapprove/:id", ArticleController.disapprove);
  app.get(
    "/api/article/trending-contributors",
    ArticleController.trendingContributors
  );
  app.get(
    "/api/article/most-popular-topics",
    ArticleController.mostPopularTopics
  );
  app.get("/api/article/trending-topics", ArticleController.trendingTopics);
  app.get("/api/article/trending-articles", ArticleController.trendingArticles);
  app.get("/api/article/most-recent", ArticleController.mostRecent);
  app.get("/api/article/not-approved", ArticleController.notApproved);
  app.get("/api/article/all/:subject/:query", ArticleController.all);
  app.get("/api/article/:id", ArticleController.read);
  app.post("/api/article/create", ArticleController.create);
  app.put("/api/article/:id", ArticleController.update);
  app.delete("/api/article/:id", ArticleController.delete);

  app.get("/api/contributor/:id", ContributorController.read);
  app.post("/api/contributor/create", ContributorController.create);
  app.put("/api/contributor/:id", ContributorController.update);
  app.delete("/api/contributor/:id", ContributorController.remove);

  app.post("/api/authentication/login", AuthenticationController.login);
  app.post("/api/authentication/logout", AuthenticationController.logout);
  app.post("/api/authentication/validate", AuthenticationController.validate);

  app.post("/api/message/create", MessageController.create);
  app.get("/api/message/:id", MessageController.read);
  app.get("/api/message/all/:type", MessageController.all);
  app.delete("/api/message/:id", MessageController.delete);

  app.post("/api/series/create", SeriesController.create);
  app.get("/api/series/:id", SeriesController.read);
  app.get("/api/series/all/:type", SeriesController.all);
  app.delete("/api/series/:id", SeriesController.delete);
};
