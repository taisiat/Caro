json.favorites({})

json.favorites do
  @favorites.each do |favorite|
    json.set! favorite.id do
      json.partial! 'api/favorites/favorite', favorite: favorite
    end
  end
end