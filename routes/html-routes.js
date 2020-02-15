// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/teams", function(req, res) {
    res.render("teams");
  });

  app.get("/starred", function(req, res) {
    res.render("starredPlayers");
  });
};
