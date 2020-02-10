var unirest = require("unirest");

var req = unirest("GET", "https://api-nba-v1.p.rapidapi.com/players/lastName/James");

req.headers({
	"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
	"x-rapidapi-key": "f83b4dfcb5msh0d566ff00db4c13p117963jsnba16ad1564ac"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

     console.log(res.body);
    console.log(res.body.api.filters);
    console.log(res.body.api.message);
    console.log(res.body.api.players[0].firstName);
});
