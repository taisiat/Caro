json.extract! review, 
    :id,      
    :cleanliness_rating,
    :maintenance_rating,
    :communication_rating,
    :convenience_rating,
    :accuracy_rating,
    :comment,
    :driver_id,
    :car_id,
    :created_at,
    :updated_at,
    :average_rating

json.driver do
    json.partial! 'api/users/user', user: review.driver
end

json.car do
    json.partial! 'api/cars/car', car: review.car
end