$(document).ready(function() {

    $("li").on("click", function() {
        console.log($(this).value());
 
    })

    console.log($("li").text())

})