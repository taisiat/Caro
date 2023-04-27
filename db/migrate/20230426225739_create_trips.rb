class CreateTrips < ActiveRecord::Migration[7.0]
  def change
    create_table :trips do |t|
      t.integer :total_price, null: false
      t.datetime :start_date, null: false
      t.datetime :end_date, null: false
      t.string :protection_plan, null: false
      t.references :driver, null: false, foreign_key: { to_table: :users}
      t.references :car, null: false, foreign_key: true

      t.timestamps
    end
  end
end
