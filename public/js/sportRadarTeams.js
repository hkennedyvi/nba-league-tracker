$(document).ready(function() {
  const teamsCall =
    "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nba/trial/v7/en/league/hierarchy.json?api_key=y8panhwvn9mvan3qad5efwug";

  $.ajax({
    url: teamsCall,
    method: "GET",
    dataType: "json",
    success: function(response) {
      // team responses are seperated into conferences and then further seperated into divisons
      const southEast = response.conferences[0].divisions[0].teams;
      const atlantic = response.conferences[0].divisions[1].teams;
      const central = response.conferences[0].divisions[2].teams;
      const northWest = response.conferences[1].divisions[0].teams;
      const southWest = response.conferences[1].divisions[1].teams;
      const pacific = response.conferences[1].divisions[2].teams;

      //all the divisions get pushed into this array as arrays; so 6 seperate arrays within the allTeamsArrays
      const allTeamsArrays = []; //  example output: allTeamsArray = [ [{}], [{}], [{}], [{}], [{}], [{}] ]
      allTeamsArrays.push(
        // each sub array actually contains 5 objects(the teams)
        southEast,
        atlantic,
        central,
        northWest,
        southWest,
        pacific
      );

      // mapping allTeamsArrays, then mapping the arrays within it as well; basically a double map function
      // then it spits out all 30 objects(teams) into one new array. No more nested arrays ;)
      // example output: allTeams = [ {}, {}, {}, {}, {}, {} ] // actual result is 30 objects(total # of teams) in allTeams
      var allTeams = [];
      allTeamsArrays.map(function(subArray) {
        subArray.map(function(obj) {
          allTeams.push(obj);
        });
      });

      const teamsList = allTeams.map(teams => {
        return `
        <div class="teamList container col-6">
        <li class="list-group-item" value="${teams.id}">${teams.name}</li></div>`;
      });

      // appending the li elements to the "ul" element within teams.handlebars
      $("ul").append(teamsList);
    }
  });
});
