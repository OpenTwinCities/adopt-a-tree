# == Schema Information
#
# Table name: users
#
#  id                              :integer          not null, primary key
#  username                        :string           not null
#  organization                    :string
#  voice_number                    :string
#  sms_number                      :string
#  address_1                       :string
#  address_2                       :string
#  city                            :string
#  state                           :string
#  zip                             :string
#  admin                           :boolean          default(FALSE)
#  email                           :string           default(""), not null
#  encrypted_password              :string           default(""), not null
#  reset_password_token            :string
#  reset_password_sent_at          :datetime
#  remember_created_at             :datetime
#  sign_in_count                   :integer          default(0), not null
#  current_sign_in_at              :datetime
#  last_sign_in_at                 :datetime
#  current_sign_in_ip              :inet
#  last_sign_in_ip                 :inet
#  created_at                      :datetime
#  updated_at                      :datetime
#  yob                             :integer
#  gender                          :string
#  ethnicity                       :string           is an Array
#  yearsInMinneapolis              :integer
#  rentOrOwn                       :string
#  previousTreeWateringExperience  :boolean
#  previousEnvironmentalActivities :boolean
#  valueForestryWork               :integer
#  heardOfAdoptATreeVia            :string           is an Array
#  awareness_code                  :string
#  first_name                      :string
#  last_name                       :string
#  emailed_at                      :datetime
#  mailed_token_at                 :datetime
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :reminders_from, class_name: 'Reminder', foreign_key: 'from_user_id'
  has_many :reminders_to,   class_name: 'Reminder', foreign_key: 'to_user_id'
  has_many :things
  has_many :events

  before_validation :remove_non_digits_from_phone_numbers

  validates :username, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :address_1, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zip, presence: true
  validates_formatting_of :email,         using: :email
  validates_formatting_of :sms_number,    using: :us_phone, allow_blank: true
  validates_formatting_of :voice_number,  using: :us_phone, allow_blank: true
  validates_formatting_of :zip,           using: :us_zip

  alias_attribute :title, :username

  def full_name
    "#{self.first_name} #{self.last_name}"
  end

  def complete_shipping_address?
    shipping_attrs = ["first_name", "last_name", "address_1", "city", "state", "zip"]
    shipping_attrs.none? {|attr_name| self.attributes[attr_name].blank?}
  end

  def remove_non_digits_from_phone_numbers
    if sms_number.present?
      self.sms_number = sms_number.to_s.gsub(/\D/, '').to_i
    end

    if voice_number.present?
      self.voice_number = voice_number.to_s.gsub(/\D/, '').to_i
    end
  end
end
