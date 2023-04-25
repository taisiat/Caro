json.user do
  json.extract! @user, :id, :first_name, :last_name, :approved_to_drive, :is_superhost, :is_clean_certified, :email, :phone_number, :created_at, :updated_at
  json.photoUrl @user.photo.attached? ? @user.photo.url : nil
end