# == Schema Information
#
# Table name: favorites
#
#  id         :bigint           not null, primary key
#  driver_id  :bigint           not null
#  car_id     :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Favorite < ApplicationRecord
  validates :driver_id, uniqueness: { scope: :car_id, message: "has already favorited this car" }
  belongs_to :driver, class_name: :User, foreign_key: :driver_id
  belongs_to :car
end
