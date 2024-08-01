class CreateBoards < ActiveRecord::Migration[7.1]
  def change
    create_table :boards do |t|
      t.string :ttt_board, array: true, default: [nil]*9
      # t.timestamps
    end
  end
end
