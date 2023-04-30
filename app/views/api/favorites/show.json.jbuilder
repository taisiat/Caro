json.favorite({})

json.favorite do
      json.partial! 'api/favorites/favorite', favorite: @favorite
end