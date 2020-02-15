$(document).ready(function() {
  $("ul").on("click", "li", function() {
    const teamId = $(this).attr("value");

    $.ajax({
      url: `https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/teams/${teamId}/profile.json?api_key=mwmtcg88b36qyudz6mqsxghj`,
      method: "GET",
      dataType: "json",
      success: function(response) {
        console.log(response);
        const teamPlayers = response.players;
        $("ul").hide();
        const playerList = teamPlayers.map(player => {
          return `<div class="card text-white shadow-lg" style="max-width: 18rem;">
                <div class="card-header bg-primary">
                  <h3>${player.full_name}</h3>
                  <button value="${player.id}">Save player</button>
                </div>
                <div class="card-body bg-light">
                  <ul class="list-group list-group-flush text-dark shadow-sm">
                    <li class="list-group-item">Position: ${player.position}</li>
                    <li class="list-group-item">jersey: ${player.jersey_number}</li>
                    <li class="list-group-item">status: ${player.status}</li>
                    </ul>
                </div>
              </div><br>`;
        });
        $(".teamplayers").append(playerList);

        $("button").on("click", function() {
          const playerId = $(this).attr("value");
          const playerName = $(this)
            .prev()
            .text();

          console.log(playerId);
          console.log(playerName);

          const data = { name: playerName, api_id: playerId };

          fetch("/api/saveplayer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(data => {
              console.log("Success:", data);
            })
            .catch(error => {
              console.log("Error:", error);
            });
        });
      }
    });
  });
});
