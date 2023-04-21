class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.boolean :approved_to_drive, default:true
      t.boolean :is_superhost, default:false
      t.boolean :is_clean_certified, default:false
      t.string :email, null: false
      t.string :phone_number, null: false
      t.string :profile_pic_url
      t.string :password_digest, null: false
      t.string :session_token, null: false

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
