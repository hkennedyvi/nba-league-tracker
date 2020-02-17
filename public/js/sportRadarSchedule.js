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
      console.log(response.games);

      for (i = 0; i < response.games.length; i++) {
        let game = response.games[i].scheduled;
        if (game === "2019-11-16T03:30:00+00:00") {
          let gameTime = "2019-11-16T03:30:00+00:00";
          let ts_hms = new Date(gameTime);
          //   ts_hms.format("%d");
          console.log(ts_hms);
          console.log("A GAME IS PLAYED ON THIS DAY AT THIS TIME");
          console.log($("#test"));
        }
      }
    }
  });
});
