class CreateCars < ActiveRecord::Migration[7.0]
  def change
    create_table :cars do |t|
      t.string :make, null: false
      t.string :model, null: false
      t.integer :year, null: false
      t.integer :mpg, null: false
      t.integer :doors_count, null: false
      t.integer :seats_count, null: false
      t.string :category, null: false
      t.boolean :automatic, default: true
      t.text :description, null: false
      t.text :guidelines, null: false
      t.integer :daily_rate, null: false
      t.text :location, array: true, default: []
      t.boolean :active, default: true
      t.references :host, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
