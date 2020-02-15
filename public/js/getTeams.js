$(document).ready(function() {
    $("ul").on("click", "li", function() {
        const teamId = $(this).attr("value");

        $.ajax({
            url: `https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/teams/${teamId}/profile.json?api_key=y8panhwvn9mvan3qad5efwug`,
            method: "GET",
            dataType: "json",
            success: function(response) {
                console.log(response);
                const teamPlayers = response.players;
                $("ul").hide();
                const playerList = teamPlayers.map(player => {
                    return `<div class="card text-white shadow-lg" style="max-width: 100%; float: left;">

                <div class="card-header bg-primary" style="color:white;">
                  <h3>${player.full_name}</h3>
                  <button style="background-color: transparent !important; color:white; padding:5px;" value="${player.id}"><img id="star2"
                  src="https://img.icons8.com/emoji/48/000000/star-emoji.png"></button>
                </div>
                <div class="card-body bg-light">
                  <ul class="list-group list-group-flush text-dark shadow-sm">
                    <li class="list-group-item" style="margin: 10px !important;">POSITION : ${player.position}</li>
                    <li class="list-group-item" style="margin: 10px !important;">JERSEY : ${player.jersey_number}</li>
                    <li class="list-group-item" style="margin: 10px !important;">STATUS : ${player.status}</li>
                    </ul>
                </div>

              </div>`;
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
                            if (data.error === "player already starred") {
                                alert("Player Already Starred");
                            }
                        })
                        .catch(error => {
                            console.log("Error:", error);
                        });
                });
            }
        });
    });
});