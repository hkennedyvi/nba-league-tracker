const authKey = "wd9hv3mu6kuqnts4cpyggqye";
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
          homeid: response.games[i].home.id,
          away: response.games[i].away.name,
          awayid: response.games[i].away.id,
          home_points: response.games[i].home_points,
          away_points: response.games[i].away_points
        };
        let dateObjParsed = Date.parse(gameObj.date);
        let dateObj = new Date(dateObjParsed);
        let gameMonth = dateObj.toLocaleString("default", { month: "long" });
        let gameDate = dateObj.toLocaleString("default", { day: "numeric" });
        let gameDay = dateObj.toLocaleString("default", { weekday: "long" });

        if (gameMonth === todayMonth) {
          let dailyDiv = $(`<div data-date="${gameDate}" class=mb-2>`);
          let gameCard = $("<div class=monthCard>");
          let cardBody = $("<div class=card-body>");
          let day = $("<p>").text(gameMonth + " " + gameDate);
          let homeTeam = $("<p>").text(
            gameObj.home + "  " + gameObj.home_points
          );
          let homeImg = $("<img>").attr(
            "src",
            `/assets/img/nbaLogos/${gameObj.homeid}.png`
          );
          let awayTeam = $("<p>").text(
            gameObj.away + "  " + gameObj.away_points
          );
          let awayImg = $("<img>").attr(
            "src",
            `/assets/img/nbaLogos/${gameObj.awayid}.png`
          );

          homeTeam.prepend(homeImg);
          awayTeam.prepend(awayImg);
          cardBody
            .append(day)
            .append(homeTeam)
            .append(awayTeam);
          gameCard.append(cardBody);
          dailyDiv.append(gameCard);

          $("#schedule").append(dailyDiv);
        }
      }
    }
  });
});
