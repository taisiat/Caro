json.review({})

json.review do
      json.partial! 'api/reviews/review', review: @review
end