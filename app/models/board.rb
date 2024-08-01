class Board < ApplicationRecord

  def check_win
    board = self.ttt_board

    if (board[0] && board[0] == board[1] && board[0] == board[2] \
      || board[3] && board[3] == board[4] && board[3] == board[5] \
      || board[6] && board[6] == board[7] && board[6] == board[8]
      )
      return true
    elsif (board[0] && board[0] == board[3] && board[0] == board[6] \
      || board[1] && board[1] == board[4] && board[4] == board[7] \
      || board[2] && board[2] == board[5] && board[5] == board[8]
      )
      return true
    elsif (board[0] && board[0] == board[4] && board[4] == board[8] \
      || board[2] && board[2] == board[4] && board[4] == board[6] 
    )
    return true

  else
    # debugger
      return false
    end
  end

end
