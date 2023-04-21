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
#  phone_number       :string           not null
#  password_digest    :string           not null
#  session_token      :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :first_name, :last_name, :phone_number, :password_digest, presence: true
  validates :session_token, uniqueness: true, presence: true
  validates :email, presence:true, format: { with: URI::MailTo::EMAIL_REGEXP }, length: { in: 3..255 }, uniqueness: true
  validates :password, length: {in: 6..255}, allow_nil: true

  before_validation :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user&.authenticate(password)
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end
  
  private

  def generate_unique_session_token
    loop do
      token = SecureRandom.base64
      return token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

end
