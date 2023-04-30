json.extract! user, :id, :first_name, :last_name, :approved_to_drive, :is_superhost, :is_clean_certified, :email, :phone_number, :created_at, :updated_at, :trips_count, :user_rating
json.photoUrl user.photo.attached? ? user.photo.url : nil
