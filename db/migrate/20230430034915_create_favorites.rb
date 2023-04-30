class CreateFavorites < ActiveRecord::Migration[7.0]
  def change
    create_table :favorites do |t|
      t.references :driver, null: false, foreign_key: { to_table: :users }
      t.references :car, null: false, foreign_key: true

      t.timestamps
    end
  end
end
