const authKey = "bsqq9a96h7trberae9wu4bp3";
const scheduleQuery =
  "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/games/2019/REG/schedule.json?api_key=" +
  authKey;

$(document).ready(function() {
  $.ajax({
    url: scheduleQuery,
    method: "GET",
    dataType: "json",
    success: function(response) {
      let today = new Date();
      let todayMonth = today.toLocaleString("default", { month: "long" });

      for (i = 0; i < response.games.length; i++) {
        let gameObj = {
          date: response.games[i].scheduled,
          home: response.games[i].home.name,
          away: response.games[i].away.name,
          home_points: response.games[i].home_points,
          away_points: response.games[i].away_points
        };

        let dateObjParsed = Date.parse(gameObj.date);
        let dateObj = new Date(dateObjParsed);
        let gameMonth = dateObj.toLocaleString("default", { month: "long" });
        let gameDate = dateObj.toLocaleString("default", { day: "numeric" });
        let gameDay = dateObj.toLocaleString("default", { weekday: "long" });

        if (gameMonth === todayMonth) {
          let dailyDiv = $(`<div data-date="${gameDate}">`);
          let p = $("<p>").text(
            "Month: " +
              gameMonth +
              " " +
              "Date: " +
              gameDate +
              " " +
              "Home: " +
              gameObj.home +
              " " +
              "Score: " +
              gameObj.home_points +
              " " +
              "Away: " +
              gameObj.away +
              " " +
              "Score: " +
              gameObj.away_points
          );

          dailyDiv.append(p);

          $("#schedule").append(dailyDiv);
        }
      }
    }
  });
});
