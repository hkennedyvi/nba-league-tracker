const authKey = "6adwam4h8umugdtsftp4wwae";
const statsQuery =
  "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/seasons/2019/REG/leaders.json?api_key=" +
  authKey;
const standingsQuery =
  "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/seasons/2019/REG/standings.json?api_key=" +
  authKey;

$(document).ready(function() {
  $.ajax({
    url: statsQuery,
    method: "GET",
    dataType: "json",
    success: function(response) {
      let firstPoints = response.categories[1].ranks[0].player.full_name;
      let secondPoints = response.categories[1].ranks[1].player.full_name;
      let thirdPoints = response.categories[1].ranks[2].player.full_name;
      let firstAssists = response.categories[2].ranks[0].player.full_name;
      let secondAssists = response.categories[2].ranks[1].player.full_name;
      let thirdAssists = response.categories[2].ranks[2].player.full_name;
      let firstRebounds = response.categories[17].ranks[0].player.full_name;
      let secondRebounds = response.categories[17].ranks[1].player.full_name;
      let thirdRebounds = response.categories[17].ranks[2].player.full_name;
      let leaders = `<div class="container-fluid">
      <div class="row">
        <div class="col-md-2.5">
          <div class="card text-white shadow-lg">
            <div class="card-header bg-primary">
              <h5>SEASON POINTS LEADERS:</h5>
              <h6>1. ${firstPoints}</h6>
              <h6>2. ${secondPoints}</h6>
              <h6>3. ${thirdPoints}</h6>
            </div>
          </div>
        </div>
        <div class="col-md-2.5">
          <div class="card text-white shadow-lg">
            <div class="card-header bg-primary">
              <h5>SEASON ASSISTS LEADERS:</h5>
              <h6>1. ${firstAssists}</h6>
              <h6>2. ${secondAssists}</h6>
              <h6>3. ${thirdAssists}</h6>
            </div>
          </div>
        </div>
        <div class="col-md-2.5">
          <div class="card text-white shadow-lg">
            <div class="card-header bg-primary">
              <h5>SEASON REBOUNDS LEADERS:</h5>
              <h6>1. ${firstRebounds}</h6>
              <h6>2. ${secondRebounds}</h6>
              <h6>3. ${thirdRebounds}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>`;
      $("#leader-div").append(leaders);
    }
  });
});

$(document).ready(function() {
  $.ajax({
    url: standingsQuery,
    method: "GET",
    dataType: "json",
    success: function(response) {
      const southEast = response.conferences[0].divisions[0].teams;
      const atlantic = response.conferences[0].divisions[1].teams;
      const central = response.conferences[0].divisions[2].teams;
      const northWest = response.conferences[1].divisions[0].teams;
      const southWest = response.conferences[1].divisions[1].teams;
      const pacific = response.conferences[1].divisions[2].teams;

      const westTeamsArray = [];
      westTeamsArray.push(southEast, atlantic, central);
      const eastTeamsArray = [];
      eastTeamsArray.push(northWest, southWest, pacific);

      let westTeams = [];

      function giveWestRank(team) {
        team.map(function(obj) {
          westTeams.push(obj);
        });
      }
      westTeamsArray.map(giveWestRank);
      const westTeamsList = westTeams.map(teams => {
        return `{rank: ${teams.calc_rank.conf_rank}, name: ${teams.name}}`;
      });
      console.log("WEST: " + westTeamsList);
      westTeamsList.sort();
      console.log("NEW" + westTeamsList);
      westTeamsList.map(team => {
        let position = `<li>${team}</li>`;
        $("#west-list").append(position);
      });

      let eastTeams = [];

      function giveEastRank(team) {
        team.map(function(obj) {
          eastTeams.push(obj);
        });
      }
      eastTeamsArray.map(giveEastRank);
      const eastTeamsList = eastTeams.map(teams => {
        return `{rank: ${teams.calc_rank.conf_rank}, name: ${teams.name}}`;
      });
      console.log("EAST: " + eastTeamsList);
      eastTeamsList.sort();
      console.log("NEW" + eastTeamsList);
      eastTeamsList.map(team => {
        let position = `<li>${team}</li>`;
        $("#east-list").append(position);
      });
    }
  });
});
