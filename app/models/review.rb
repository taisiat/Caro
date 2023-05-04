# == Schema Information
#
# Table name: reviews
#
#  id                   :bigint           not null, primary key
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
  validates :comment, length: { minimum: 30 }
  validates :cleanliness_rating, :maintenance_rating, :communication_rating, :convenience_rating, :accuracy_rating, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
  validates :driver_id, uniqueness: { scope: :car_id, message: "has already reviewed this car" }
  validate :cannot_review_own_car
  validate :cannot_review_unrented_car

  belongs_to :driver, class_name: :User, foreign_key: :driver_id
  belongs_to :car

  def average_rating
    average = (cleanliness_rating + maintenance_rating + communication_rating + convenience_rating + accuracy_rating) / 5.0
    average && average.round(1)
  end

  private

  def cannot_review_own_car
    if driver_id == car.host_id
      errors.add(:driver, "cannot review their own car")
    end
  end

  def cannot_review_unrented_car
    if !car.trips.where(driver_id: driver_id).where(["end_date <= ?", Date.today]).exists?
      errors.add(:driver, "cannot review a car where they haven't yet completed a trip")
    end
  end
end
