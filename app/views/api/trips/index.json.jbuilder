json.trips({})

json.trips do
  @trips.each do |trip|
    json.set! trip.id do
      json.partial! 'api/trips/trip', trip: trip
    end
  end
end