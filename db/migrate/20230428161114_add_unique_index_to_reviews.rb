class AddUniqueIndexToReviews < ActiveRecord::Migration[7.0]
  def change
        add_index :reviews, [:driver_id, :car_id], unique: true
  end
end
