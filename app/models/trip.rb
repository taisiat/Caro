# == Schema Information
#
# Table name: trips
#
#  id              :bigint           not null, primary key
#  total_price     :integer          not null
#  start_date      :datetime         not null
#  end_date        :datetime         not null
#  protection_plan :string           not null
#  driver_id       :bigint           not null
#  car_id          :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Trip < ApplicationRecord
  validates :start_date, :end_date, presence: true
  validates :protection_plan, inclusion: { in: ["Minimum", "Standard", "Premier", "None"] }
  validates :total_price , numericality: { greater_than_or_equal_to: 0 }
  validate :end_date_after_start_date
  validate :no_overlapping_bookings


  belongs_to :driver, class_name: :User, foreign_key: :driver_id
  belongs_to :car, class_name: :Car, foreign_key: :car_id



  private

  def end_date_after_start_date
    return if end_date.blank? || start_date.blank?
    if end_date < start_date
      errors.add(:end_date, "must be after the start date")
    end
  end

  def no_overlapping_bookings
     if car.trips.where.not(id: id).where('start_date < ? AND end_date > ?', end_date, start_date).exists?
      errors.add(:Trip, "dates overlap with an existing booking for the same car, please try another date range")
    end
  end
end
