class UpdateFavorites < ActiveRecord::Migration[7.0]
  def change
    add_index :favorites, [:driver_id, :car_id], unique: true
  end
end
