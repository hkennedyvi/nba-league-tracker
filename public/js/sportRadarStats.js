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
      $("#first-points").append(firstPoints);
      $("#second-points").append(secondPoints);
      $("#third-points").append(thirdPoints);
      $("#first-assists").append(firstAssists);
      $("#second-assists").append(secondAssists);
      $("#third-assists").append(thirdAssists);
      $("#first-rebounds").append(firstRebounds);
      $("#second-rebounds").append(secondRebounds);
      $("#third-rebounds").append(thirdRebounds);
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
        return `<li class="list-group-item" data-rank="${teams.calc_rank.conf_rank}">${teams.calc_rank.conf_rank}. ${teams.name}</li>`;
      });
      console.log("WEST: " + westTeamsList);
      westTeamsList.sort(function(a, b) {
        return +$(a).data("rank") - +$(b).data("rank");
      });
      console.log("NEW" + westTeamsList);
      westTeamsList.map(team => {
        let position = `${team}`;
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
        return `<li class="list-group-item" data-rank="${teams.calc_rank.conf_rank}">${teams.calc_rank.conf_rank}. ${teams.name}</li>`;
      });
      eastTeamsList.sort(function(a, b) {
        return +$(a).data("rank") - +$(b).data("rank");
      });
      eastTeamsList.map(team => {
        let position = `${team}`;
        $("#east-list").append(position);
      });
    }
  });
});
