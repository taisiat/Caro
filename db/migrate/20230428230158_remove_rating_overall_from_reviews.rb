class RemoveRatingOverallFromReviews < ActiveRecord::Migration[7.0]
  def change
    remove_column :reviews, :star_rating
  end
end
