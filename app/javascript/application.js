// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import jquery from "jquery"
window.jQuery = jquery
window.$ = jquery


let pollingInterval;
let currentBoardId = null;
$(
    ()=>{ //can write jquery from here only: after every element loaded

        //function for polling states every 2 second
        function fetchGameState() {
            $.getJSON("/", (data)=>{
                
                if (data.id != currentBoardId){
                    currentBoardId = data.id; //update
                    fetchGameState();
                }

                data.board.forEach((value,index) => {
                    $(`#${index}`).text(value); //update each cell
                });
                
                //after gameover
                $("h4").html(`<span id="turn">${data.turn}</span>'s turn`)

                $("#turn").text(data.turn); //turn display

                //change
                $("#hidden").val(data.id)

                // $("#hidden").on("change").getJSON("/")

                if(data.won){
                    // $("h4").text(`Game Over. Won by ${data.won}`)
                    $("h4").text(`Game Over. Won by ${data.won}`);
                    $("#board").off("click"); // Disable further clicks on the board
                    // clearInterval(pollingInterval) //stop polling on gameover;
                }
            })
        }

        pollingInterval = setInterval(fetchGameState, 2000); //poll every 2 sec


        $("#board").on("click", (e) => {

            let turn = $("#turn").html(); 


            if ($(`#${e.target.id}`).html() == false)
            {
                $.getJSON("/", 
                {turn : turn ,position: e.target.id},
                (success) => { //success is json returned
                    $(`#${e.target.id}`).text(turn) //fill position
                    turn = success.turn
                    $("#turn").text(turn) //update turn
                    
                    if (success.won){
                        $("h4").text(`Game Over. Won by ${success.won}`);
                        clearInterval(pollingInterval);
                    }
                }
            )

            }
        })

        //handle "play new game button"
        $("#button").on("click",()=>{
            $.getJSON("/newgame", (data) => {

                data.board.forEach((value, index) =>{
                    $(`#${index}`).text(value); //updated each cell to nil
                })

                $("h4").html(`<span id="turn">${data.turn}</span>'s turn`) //display
                // $("#turn").text(data.turn); //display

                // Restart polling after starting a new game
                clearInterval(pollingInterval);
                currentBoardId = data.id; 
                pollingInterval = setInterval(fetchGameState, 2000);

            })
        })
});