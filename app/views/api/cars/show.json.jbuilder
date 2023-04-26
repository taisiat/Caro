json.car({})

json.car do
      json.partial! 'api/cars/car', car: @car
end