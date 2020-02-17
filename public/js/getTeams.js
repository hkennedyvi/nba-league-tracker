$(document).ready(function() {
    //function for clicking on team and generating response
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
                    //maps returns the players in a card div
                    return `<div class="card text-white shadow-lg" style="max-width: 100%; float: left;">

                <div class="card-header bg-primary">
                  <h3>${player.full_name}</h3>
                  <button value="${player.id}">Save player</button>
                </div>
                <div class="card-body bg-light">
                  <ul class="list-group list-group-flush text-dark shadow-sm">
                    <li class="list-group-item">POSITION : ${player.position}</li>
                    <li class="list-group-item">JERSEY : ${player.jersey_number}</li>
                    <li class="list-group-item">STATUS : ${player.status}</li>
                    </ul>
                </div>

              </div>`;
                });
                //appending the player cards to the page
                $(".teamplayers").append(playerList);

                const teamImg = $("<img>")
                    .attr("src", `./assets/img/nbaLogos/${response.id}.png`)
                    .attr("class", "teamImgs2 col-s6 col-m6 col-lg-6");

                //appending the img to the page
                $(".teamImg").append(teamImg);

                const teamAlias = $("<div class='card' style='height:100px;'>").text(`${response.alias}`);

                $(".teamInfo").append(teamAlias);

                $("button").on("click", function() {
                    const playerId = $(this).attr("value");
                    const playerName = $(this)
                        .prev()
                        .text();
                    style = 'height:100px;'

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