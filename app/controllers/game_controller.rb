class GameController < ApplicationController
  def index
    @board = Board.last.ttt_board
    @turn = Board.last.current_turn || 'X'        #initially x's turn
    
    if params["turn"].present?
      turn = params["turn"]
      position = params["position"].to_i

      @board[position] = turn #update board
      Board.last.update(ttt_board: @board, current_turn: turn) #save current status to database
      
      # check win condition and send to frontend
      winner = Board.last.check_win ? turn : false

      #update turn 
      new_turn = turn == 'X' ? 'O' : 'X'
      

      Board.last.update(current_turn: new_turn)
      @turn = new_turn
    end

    
    respond_to do |format|
      format.html #index.html.erb
      format.json { render json: {board: @board, turn: @turn, won: winner || false} # if doesn't work winner || false use
      }
    end

  end

  def newgame
    Board.create(current_turn: 'X')
    # redirect_to request.referrer
    @board = Board.last.ttt_board
    @turn = "X"

    render json: { board: @board, turn: @turn }
  
  end

end
