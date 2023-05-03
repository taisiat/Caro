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
#  city        :string
#
class Car < ApplicationRecord
  validates :make, :model, :category, :description, :guidelines, presence: true
  validates :automatic, :active, inclusion: { in: [true, false] }
  validates :mpg, :doors_count, :seats_count, numericality: { only_integer: true }
  validates :daily_rate, numericality: { greater_than_or_equal_to: 0 }
  validates :location, length: { minimum: 2 }
  validates :year, length: { is: 4 }, numericality: { only_integer: true }
  validates :city, presence: true

  has_many_attached :photos

  belongs_to :host,
    foreign_key: :host_id,
    class_name: :User

  has_many :trips,
    foreign_key: :car_id,
    class_name: :Trip,
    dependent: :destroy

  has_many :reviews,
    dependent: :destroy

  has_many :favorites,
    dependent: :destroy

  def avg_cleanliness_rating
    average = reviews.average(:cleanliness_rating)
    average && average.round(2)
  end

  def avg_maintenance_rating
    average = reviews.average(:maintenance_rating)
    average && average.round(2)
  end

  def avg_communication_rating
    average = reviews.average(:communication_rating)
    average && average.round(2)
  end

  def avg_convenience_rating  
    average = reviews.average(:convenience_rating)
    average && average.round(2)
  end

  def avg_accuracy_rating
    average = reviews.average(:accuracy_rating)
    average && average.round(2)
  end

  def trips_count
    trips.length
  end

  def reviews_count
    reviews.length
  end

  # def self.car_lat
  #   :location[0]
  # end

  # def self.car_lng
  #   :location[1]
  # end

  def self.in_bounds(bounds)
    # debugger
    lower_lat, lower_lng, upper_lat, upper_lng = bounds
    # car_lat, car_lng = :location
    # car_lat = :location[0]
    # car_lng = :location[1]
    # # where(car_lat: lower_lat..upper_lat, car_lng: lower_lng..upper_lng)
    Car.where("location[1]::float BETWEEN ? AND ?", lower_lat, upper_lat)
    .where("location[2]::float BETWEEN ? AND ?", lower_lng, upper_lng)
    # where("cast(location[0] as float) BETWEEN ? AND ?", lower_lat, upper_lat)
    # .where("cast(location[1] as float) BETWEEN ? AND ?", lower_lng, upper_lng)
    # Car.where("ARRAY_FIRST(location) BETWEEN ? AND ?", lower_lat, upper_lat)
    # .where("ARRAY_LAST(location) BETWEEN ? AND ?", lower_lng, upper_lng)
    # Car.where("ARRAY[location[1]] = 37.808205" )
        # Car.where(make: "Subaru" )

    # Car.where("location @> ARRAY[?,?]", 37.808205, -122.415480)

  end

  # def self.filter_by_superhost(superhost_filter)
  #   if superhost_filter == true
  #     joins(:host).where(users: { is_superhost: true })
  #   else
  #     all
  #   end
  # end

  # def self.no_overlapping_trips(date_range)
  #   # trip_start, trip_end = date_range
  #   # trip_start, trip_end = dateRange.map { |d| Date.parse(d) }
  #   trip_start = Date.parse(date_range[0]).iso8601
  #   trip_end = Date.parse(date_range[1]).iso8601
  #   Car
  #   .where.not(id: Trip.where("(start_date <= ? AND end_date >= ?) OR (start_date <= ? AND end_date >= ?)", trip_start, trip_start, trip_end, trip_end)
  #   .select(:car_id))    
  # end

end
