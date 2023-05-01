class RemoveTripColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :trips, :total_price
  end
end
