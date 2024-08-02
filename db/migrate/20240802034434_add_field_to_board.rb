class AddFieldToBoard < ActiveRecord::Migration[7.1]
  def change
    add_column :boards, :winner, :string
  end
end
