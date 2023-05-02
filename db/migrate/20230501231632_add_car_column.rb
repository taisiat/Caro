class AddCarColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :cars, :city, :string
  end
end
