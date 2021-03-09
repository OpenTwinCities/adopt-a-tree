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

require 'faker'

FactoryBot.define do
  factory :user, aliases: [:from_user, :to_user] do
    username  { Faker::Internet.user_name }
    email     { Faker::Internet.email }
    password  { Faker::Internet.password(8) }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    address_1 { Faker::Address.street_address }
    city { 'Minneapolis' }
    state { 'Minnesota' }
    zip { '55401' }


    factory :modified_profile_user do
      address_2 { Faker::Address.secondary_address }
      yob { 1900 + rand(100) }
      gender { rand(2) == 0 ? 'male' : 'female' }
      ethnicity { [rand(2) == 0 ? 'caucasian' : 'other'] }
      yearsInMinneapolis { rand(50) }
      rentOrOwn { rand(2) == 0 ? 'rent' : 'own' }
      previousTreeWateringExperience { rand(2) == 0 ? false : true }
      previousEnvironmentalActivities { rand(2) == 0 ? false : true }
      valueForestryWork { rand(9) + 1 }
      heardOfAdoptATreeVia { ['other'] }
    end
  end

end
