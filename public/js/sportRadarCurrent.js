$(document).ready(function() {
    const year = moment().format("YYYY");
    const month = moment().format("MM");
    const day = moment().format("D");


  const CurrentGamesCall = `https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nba/
trial/v7/en/games/${year}/${month}/${day}/schedule.json?api_key=y8panhwvn9mvan3qad5efwug`;

    $.ajax({
        url: CurrentGamesCall,
        method: "GET",
        dataType: "json",
        success: function(response) {
            const gamesArray = response.games;
            console.log(gamesArray);
            const CurrentGames = gamesArray.map(gamesObject => {
                if (gamesObject.status === "scheduled") {
                    gamesObject.home_points = " ";
                    gamesObject.away_points = " ";
                }
                return `<div class="card text-white shadow-lg" style="max-width: 100%; float:left;">
                <div class="card-header bg-primary">
                  <h3>Status: ${gamesObject.status}</h3>
                  
                  <h4><img class="teamImgs" src="/assets/img/nbaLogos/${gamesObject.home.id}.png"/> &nbsp&nbsp&nbsp${gamesObject.home_points}</h4>
                  
                  <h4><img class="teamImgs" src="/assets/img/nbaLogos/${gamesObject.away.id}.png"/>&nbsp&nbsp&nbsp${gamesObject.away_points}</h4>
                </div>
                <div class="card-body bg-light">
                  <ul class="list-group list-group-flush text-dark shadow-sm">
                    <li class="list-group-item">Venue: ${gamesObject.venue.name}</li>
                    <li class="list-group-item">Home Team: ${gamesObject.home.name}</li>
                    <li class="list-group-item">Away Team: ${gamesObject.away.name}</li>
                  </ul>
                </div>
              </div>`;
            });
            $("body").append(CurrentGames);
        }
    });
});