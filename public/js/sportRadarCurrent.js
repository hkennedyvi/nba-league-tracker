$(document).ready(function() {


    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/games/2020/02/09/schedule.json?api_key=mwmtcg88b36qyudz6mqsxghj',
        method: 'GET',
        dataType: 'json',
        success: function(response){
        const gamesArray = response.games;
            console.log(gamesArray);
          const CurrentGames =  gamesArray.map(gamesObject => {
                return `<div class="card text-white shadow-lg" style="max-width: 18rem;">
                <div class="card-header bg-primary">
                  <h3>Status: ${gamesObject.status}</h3>
                  <h4>Home points: ${gamesObject.home_points}</h4>
                  <h4>away points: ${gamesObject.away_points}</h4>
                </div>
                <div class="card-body bg-light">
                  <ul class="list-group list-group-flush text-dark shadow-sm">
                    <li class="list-group-item">Venue: ${gamesObject.venue.name}</li>
                    <li class="list-group-item">Home Team: ${gamesObject.home.name}</li>
                    <li class="list-group-item">Away Team: ${gamesObject.away.name}</li>
                  </ul>
                </div>
              </div><br>`
            });
            $("body").append(CurrentGames);
        }
      });

});
