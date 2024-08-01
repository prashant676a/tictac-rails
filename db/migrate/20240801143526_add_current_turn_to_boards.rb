class AddCurrentTurnToBoards < ActiveRecord::Migration[7.1]
  def change
    add_column :boards, :current_turn, :string
  end
end
