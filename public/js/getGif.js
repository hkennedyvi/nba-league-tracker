$(document).ready(makeGif);

$("#nba-button").click(function() {
  $("#nba-gif").empty();
  makeGif();
});

function makeGif() {
  const queryURL =
    "https://api.giphy.com/v1/gifs/random?api_key=IjaCAMg3qS7QHZTXGkuMC8ouIL0OZWZ1&tag=nba&rating=G";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    const results = response.data.images.fixed_height.url;
    const nbaDiv = $("#nba-gif");
    const nbaImage = $("<img>");
    nbaImage.attr("src", results);
    nbaDiv.append(nbaImage);
  });
}
