$(document).ready(() => {

  const idArray = [];

  $.get("/api/starred", function(playersArray) {
    playersArray.map(playerId => {
      const playerQueryId = playerId.api_id;
      idArray.push(playerQueryId);
    });

    console.log(idArray);

   for(let i=0; i<idArray.length; i++) {
    setTimeout( function timer(){

        $.ajax({
            url: `https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/players/${idArray[i]}/profile.json?api_key=mwmtcg88b36qyudz6mqsxghj`,
            method: "GET",
            dataType: "json",
            success: function(response) {
                console.log(response);

                const starredPlayer = () => {
                    return `<div class="card text-white shadow-lg" style="max-width: 18rem;">
                  <div class="card-header bg-primary">
                    <h3>${response.full_name}</h3>
                  </div>
                  <div class="card-body b-light">
                    <ul class="list-group list-group-flush text-dark shadow-sm">
                      <li class="list-group-item">Position: ${response.position}</li>
                      <li class="list-group-item">jersey: ${response.jersey_number}</li>
                      <li class="list-group-item">status: ${response.status}</li>
                      </ul>
                  </div>
                </div><br>`;
                }

              $("body").append(starredPlayer());
            }
          });

    }, i*1000);
   } 

  });
});


