class UpdateUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :profile_pic_url
  end
end
