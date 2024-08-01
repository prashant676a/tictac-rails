// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import jquery from "jquery"
window.jQuery = jquery
window.$ = jquery

$(
    ()=>{
        $("#board").on("click", (e) => {

            let turn = $("#turn").html();

            // console.log($(`#${e.target.id}`).html() == false)

            if ($(`#${e.target.id}`).html() == false)
            {
                // console.log("...requesting....");
                // console.log(e.target.id);
                $.getJSON("/", 
                {turn : turn ,position: e.target.id},
                (success) => { //success is json returned
                    $(`#${e.target.id}`).text(turn) //fill position
                    turn = success.turn
                    $("#turn").text(turn) //update turn
                    
                    if (check_game()){
                        $("h4").text("Game Over")
                    }
                }
            )

            }
        })


        //check game condition
        function check_game(){
            if (
                $("#0").html() != '' && $("#0").html() == $("#1").html() && $("#0").html() == $("#2").html()
                || $("#3").html() != '' && $("#3").html() == $("#4").html() && $("#3").html() == $("#5").html()
                || $("#6").html() != '' && $("#6").html() == $("#7").html() && $("#6").html() == $("#8").html()
            ){
                    return true
            }
            else if (
                $("#0").html() != '' && $("#0").html() == $("#3").html() && $("#0").html() == $("#6").html()
                || $("#1").html() != '' && $("#1").html() == $("#4").html() && $("#4").html() == $("#7").html()
                || $("#2").html() != '' && $("#2").html() == $("#5").html() && $("#5").html() == $("#8").html()
                )
                {
                    return true
                }

            else if (
                $("#0").html() != '' && $("#0").html() == $("#4").html() && $("#0").html() == $("#8").html()
                || $("#2").html() != '' && $("#2").html() == $("#4").html() && $("#4").html() == $("#6").html()
            ){
                return true
            }
            else{
                return false
            }
        }

    }
);