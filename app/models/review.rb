# == Schema Information
#
# Table name: reviews
#
#  id                   :bigint           not null, primary key
#  star_rating          :integer          not null
#  cleanliness_rating   :integer          not null
#  maintenance_rating   :integer          not null
#  communication_rating :integer          not null
#  convenience_rating   :integer          not null
#  accuracy_rating      :integer          not null
#  comment              :string           not null
#  driver_id            :bigint           not null
#  car_id               :bigint           not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
class Review < ApplicationRecord
  validates :comment, presence: true
  validates :star_rating, :cleanliness_rating, :maintenance_rating, :communication_rating, :convenience_rating, :accuracy_rating, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
  validates :driver_id, uniqueness: { scope: :car_id, message: "has already reviewed this car" }

  belongs_to :driver, class_name: :User, foreign_key: :driver_id
  belongs_to :car
end
