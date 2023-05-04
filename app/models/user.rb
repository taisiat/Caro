# == Schema Information
#
# Table name: users
#
#  id                 :bigint           not null, primary key
#  first_name         :string           not null
#  last_name          :string           not null
#  approved_to_drive  :boolean          default(TRUE)
#  is_superhost       :boolean          default(FALSE)
#  is_clean_certified :boolean          default(FALSE)
#  email              :string           not null
#  phone_number       :string
#  password_digest    :string           not null
#  session_token      :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  validates :phone_number, allow_blank: true, format: { with: /\A\d{3}-\d{3}-\d{4}\z/, message: "should be in the format xxx-xxx-xxxx" }
  validates :first_name, :last_name, presence: true #password_digest is validated by has_secure_password
  validates :session_token, uniqueness: true, presence: true
  validates :email, presence:true, format: { with: URI::MailTo::EMAIL_REGEXP }, length: { in: 3..255 }, uniqueness: true
  validates :password, length: {in: 6..255}, allow_nil: true

  before_validation :ensure_session_token
  has_one_attached :photo

  has_many :cars,
    foreign_key: :host_id,
    class_name: :Car,
    dependent: :destroy,
    inverse_of: :host

  has_many :trips,
    foreign_key: :driver_id,
    class_name: :Trip,
    dependent: :destroy,
    inverse_of: :driver

  has_many :reviews,
    foreign_key: :driver_id,
    class_name: :Review,
    dependent: :destroy,
    inverse_of: :driver

  has_many :reviews_for_own_cars,
    through: :cars,
    source: :reviews

  has_many :favorites,
    foreign_key: :driver_id,
    class_name: :Favorite,
    dependent: :destroy,
    inverse_of: :driver

  def self.find_by_credentials(email, password)
    user = User.find_by(:email => email) #changed from User.find_by(email: email)
    user&.authenticate(password)
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

  def trips_count
    total_trips = trips.length
    cars.each do |car|
      total_trips += car.trips.length
    end
    total_trips
  end

  def hosted_cars_count
    cars.length
  end

  def user_rating  
    return 0.00 if reviews_for_own_cars.length == 0
    return 1/5.00*(reviews_for_own_cars.average(:communication_rating).round(2) +
    reviews_for_own_cars.average(:cleanliness_rating).round(2) +
    reviews_for_own_cars.average(:convenience_rating).round(2) +
    reviews_for_own_cars.average(:accuracy_rating).round(2) +
    reviews_for_own_cars.average(:maintenance_rating).round(2))
  end
  
  private

  def generate_unique_session_token
    loop do
      token = SecureRandom.base64
      break token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
