# == Schema Information
#
# Table name: cars
#
#  id          :bigint           not null, primary key
#  make        :string           not null
#  model       :string           not null
#  year        :integer          not null
#  mpg         :integer          not null
#  doors_count :integer          not null
#  seats_count :integer          not null
#  category    :string           not null
#  automatic   :boolean          default(TRUE)
#  description :text             not null
#  guidelines  :text             not null
#  daily_rate  :integer          not null
#  location    :text             default([]), is an Array
#  active      :boolean          default(TRUE)
#  host_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Car < ApplicationRecord
  validates :make, :model, :category, :description, :guidelines, presence: true
  validates :automatic, :active, inclusion: { in: [true, false] }
  validates :mpg, :doors_count, :seats_count, numericality: { only_integer: true }
  validates :daily_rate, numericality: { greater_than_or_equal_to: 0 }
  validates :location, length: { minimum: 2 }
  validates :year, length: { is: 4 }, numericality: { only_integer: true }

  has_many_attached :photos

  belongs_to :host,
    foreign_key: :host_id,
    class_name: :User

  has_many :trips,
    foreign_key: :car_id,
    class_name: :Trip,
    dependent: :destroy


  # def average_rating
  #   average = reviews.average(:rating)
  #   average && average.round(1)
  # end

end
