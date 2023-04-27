json.extract! trip, 
    :id,      
    :total_price,
    :start_date,
    :end_date,
    :protection_plan,
    :driver_id,
    :car_id,
    :created_at,
    :updated_at

json.driver do
    json.partial! 'api/users/user', user: trip.driver
end

json.car do
    json.partial! 'api/cars/car', car: trip.car
end