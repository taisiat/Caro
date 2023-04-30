class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.integer :star_rating, null: false
      t.integer :cleanliness_rating, null: false
      t.integer :maintenance_rating, null: false
      t.integer :communication_rating, null: false
      t.integer :convenience_rating, null: false
      t.integer :accuracy_rating, null: false
      t.string :comment, null: false
      t.references :driver, null: false, foreign_key: { to_table: :users }
      t.references :car, null: false, foreign_key: true

      t.timestamps
    end
  end
end
