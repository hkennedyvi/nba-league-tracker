$(document).ready(() => {
    const idArray = [];

    $.get("/api/starred", function(playersArray) {
        playersArray.map(playerId => {
            const playerQueryId = playerId.api_id;
            idArray.push(playerQueryId);
        });

        console.log(idArray);

        for (let i = 0; i < idArray.length; i++) {
            setTimeout(function timer() {
                $.ajax({

                    url: `https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/players/${idArray[i]}/profile.json?api_key=y8panhwvn9mvan3qad5efwug`,

                    method: "GET",
                    dataType: "json",
                    success: function(response) {
                        console.log(response);

                        const starredPlayer = () => {

                            return `<div class="card text-white shadow-lg ${response.id}" style="max-width: 100%; float: left;">

                  <div class="card-header bg-primary">
                    <h3>${response.full_name}</h3>
                    <div>
                    <button class="deleteplayer btn btn-danger" value="${response.id}">Delete Player</button>
                    </div>
                  </div>
                  <div class="card-body b-light">
                    <ul class="list-group list-group-flush text-dark shadow-sm">
                      <li class="list-group-item" style="margin: 10px !important;">POSITION: &nbsp&nbsp ${response.position}</li>
                      <li class="list-group-item" style="margin: 10px !important;">JERSEY: &nbsp&nbsp ${response.jersey_number}</li>
                      <li class="list-group-item" style="margin: 10px !important;">STATUS: &nbsp&nbsp ${response.status}</li>
                      </ul>
                  </div>
                </div>`;
                        };


                        $("body").append(starredPlayer());
                    }
                });
            }, i * 1200);
        }
    });

    $("body").on("click", ".deleteplayer", function() {
        const id = $(this).attr("value");
        console.log(id);
        $.ajax({
            method: "DELETE",
            url: "/api/starred/" + id
        }).then(function() {
            $("." + id).remove();
        });
    });
});