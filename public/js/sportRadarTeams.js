const teamsCall = `https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nba/trial/
v7/en/league/hierarchy.json?api_key=mwmtcg88b36qyudz6mqsxghj`;


$(document).ready(function() {

    $.ajax({
        url: teamsCall,
        method: 'GET',
        dataType: 'json',
        success: function(response){

        const southEast = response.conferences[0].divisions[0].teams;
        const atlantic = response.conferences[0].divisions[1].teams;
        const central = response.conferences[0].divisions[2].teams;
        const northWest = response.conferences[1].divisions[0].teams;
        const southWest = response.conferences[1].divisions[1].teams;
        const pacific = response.conferences[1].divisions[2].teams;

        const allteams = [];
        allteams.push(southEast, atlantic, central, northWest, southWest, pacific);

       //  console.log(allteams);

        var res = allteams.map(getObject);

    function getObject(o) {
    console.log(o);
    //return Array.isArray(o) ?  getObject(o[0]) : o;
}
console.log(res);

        }
      });

});


