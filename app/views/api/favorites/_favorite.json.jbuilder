json.extract! favorite, 
    :id,      
    :driver_id,
    :car_id,
    :created_at

 json.car do
  json.extract! favorite.car, :id,      
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
    :city

  if favorite.car.photos.attached?
    photos = []
      favorite.car.photos.each do |photo|
    photos << url_for(photo)
  end
    json.photos_url photos
  end

    json.host do
      json.extract! favorite.car.host, :id, :first_name, :last_name, :approved_to_drive, :is_superhost, :is_clean_certified, :email, :phone_number, :created_at, :updated_at, :trips_count, :user_rating, :hosted_cars_count
  end
end
