json.trip({})

json.trip do
      json.partial! 'api/trips/trip', trip: @trip
end