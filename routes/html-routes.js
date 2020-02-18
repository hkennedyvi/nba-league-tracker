// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index");
    } else {
      res.render("signup");
    }
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index");
    } else {
      res.render("login");
    }
  });

  app.get("index", isAuthenticated, function(req, res) {
    res.render("signup");
  });

  app.get("/teams", isAuthenticated, function(req, res) {
    if (req.user) {
      res.render("teams");
    } else {
      res.render("signup");
    }
  });

  app.get("/starred", isAuthenticated, function(req, res) {
    if (req.user) {
      res.render("starredPlayers");
    } else {
      res.render("signup");
    }
  });

  app.get("/standings", isAuthenticated, function(req, res) {
    if (req.user) {
      res.render("standings");
    } else {
      res.render("signup");
    }
  });

  app.get("/schedule", isAuthenticated, function(req, res) {
    if (req.user) {
      res.render("schedule");
    } else {
      res.render("signup");
    }
  });
};
