$(document).ready(function() {

    $("ul").on("click", "li", function() {

        const teamId = $(this).attr("value");

        $.ajax({
            url: `https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/teams/${teamId}/profile.json?api_key=mwmtcg88b36qyudz6mqsxghj`,
            method: "GET",
            dataType: "json",
            success: function(response) {

              const teamPlayers = response.players;

              const playerList = teamPlayers.map(player => {

                $("ul").hide();

                console.log(player.full_name);
              })

            }
          });
    });
});