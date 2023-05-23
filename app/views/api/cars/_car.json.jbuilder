json.extract! car, 
    :id,      
    :make,
    :model,
    :year,
    :mpg,
    :doors_count,
    :seats_count,
    :category,
    :automatic,
    :description,
    :guidelines,
    :daily_rate,
    :location,
    :active,
    :host_id,
    :created_at,
    :avg_cleanliness_rating,
    :avg_maintenance_rating,
    :avg_communication_rating,
    :avg_convenience_rating,
    :avg_accuracy_rating,
    :trips_count,
    :reviews_count,
    :city,
    :trips
  
if car.photos.attached?
  photos = []
  car.photos.each do |photo|
    photos << url_for(photo)
  end
  json.photos_url photos
end

json.host do
    json.partial! 'api/users/user', user: car.host
end

json.reviews car.reviews do |review|
  json.extract! review, :cleanliness_rating,
    :maintenance_rating,
    :communication_rating,
    :convenience_rating,
    :accuracy_rating,
    :comment,
    :driver_id,
    :car_id,
    :created_at,
    :updated_at,
    :average_rating,
    :id

  json.driver do
    json.extract! review.driver, :id, :first_name, :last_name, :approved_to_drive, :is_superhost, :is_clean_certified, :email, :phone_number, :created_at, :updated_at, :trips_count, :user_rating, :hosted_cars_count
    json.photoUrl review.driver.photo.attached? ? review.driver.photo.url : nil
  end
end