class GameController < ApplicationController
  def index
    @board = [nil]*9 
    # @board = [nil]*9   #board empty on init
    @turn = 'X'        #initially x's turn

    if params["turn"].present?

      turn = params["turn"]
      position = params["position"].to_i
      @board[position] = turn #update board
      # debugger

      #update turn 
      if turn == 'X' 
        @turn = 'O'
      else
        @turn = 'X'
      end

    end


    respond_to do |format|
      format.html #index.html.erb
      format.json { render json: {turn: @turn}
        }
    end
  end

end
