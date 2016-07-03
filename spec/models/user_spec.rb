# == Schema Information
#
# Table name: users
#
#  id                              :integer          not null, primary key
#  username                        :string(255)      not null
#  first_name                      :string(255)      
#  last_name                       :string(255)      
#  organization                    :string(255)
#  voice_number                    :string(255)
#  sms_number                      :string(255)
#  address_1                       :string(255)
#  address_2                       :string(255)
#  city                            :string(255)
#  state                           :string(255)
#  zip                             :string(255)
#  admin                           :boolean          default(FALSE)
#  email                           :string(255)      default(""), not null
#  encrypted_password              :string(255)      default(""), not null
#  reset_password_token            :string(255)
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
#  gender                          :string(255)
#  ethnicity                       :string           is an Array
#  yearsInMinneapolis              :integer
#  rentOrOwn                       :string(255)
#  previousTreeWateringExperience  :boolean
#  previousEnvironmentalActivities :boolean
#  valueForestryWork               :integer
#  heardOfAdoptATreeVia            :string           is an Array
#  awareness_code                  :string(255)
#

require 'rails_helper'

RSpec.describe User, :type => :model do
  subject{build(:user)}

  it "is valid with a name, email and password" do
    expect(subject).to be_valid
  end

  it "removes non-digits from voice number" do
    subject.voice_number = '555-555-5555'

    expect(subject).to be_valid
    expect(subject.voice_number).to eq 5555555555
  end

  it "removes non-digits from sms number" do
    subject.sms_number = '(555) 555-5555'

    expect(subject).to be_valid
    expect(subject.sms_number).to eq 5555555555
  end

  it 'uses username as title' do
    expect(subject.title).to eq(subject.username)
  end

  context 'invalid user' do
    it "is invalid without a name" do
      subject.username = nil
      expect(subject).to have_invalid_attribute(:username)
    end

    it "is invalide with an invalid email" do
      subject.email = 'invalid@example'
      expect(subject).to have_invalid_attribute(:email)
    end

    it "is invalide without an email" do
      subject.email =  nil
      expect(subject).to have_invalid_attribute(:email, 2)
    end

    it "is invalid with an invalid sms number" do
      subject.sms_number = '1-555-555-5555'
      expect(subject).to have_invalid_attribute(:sms_number)
    end

    it "is invalid with an invalid voice number" do
      subject.voice_number = '1-555-555-5555'
      expect(subject).to have_invalid_attribute(:voice_number)
    end

    context 'invalid password' do
      it "is invalid without a password" do
        subject.password =  nil
        expect(subject).to have_invalid_attribute(:password)
      end

      it "is invalid with a password length of 7" do
        subject.password = 'aaaaaaa'
        expect(subject).to have_invalid_attribute(:password)
      end

      it "is invalid with a password length of 129" do
        subject.password = 'a' * 129
        expect(subject).to have_invalid_attribute(:password)
      end
    end
  end

  context "first and last names are set" do
    subject {build(:modified_profile_user) }

    it "has accessible first and last names" do
      expect(subject.first_name).to_not be_blank
      expect(subject.last_name).to_not be_blank
    end

    it "has a full name" do
      expect(subject.full_name).to_not be_blank
      expect(subject.full_name).to eq("#{subject.first_name} #{subject.last_name}")
    end

  end

  context "complete_shipping_address?" do
    let(:user_attrs) {
        {
          "first_name" => Faker::Name.first_name,
          "last_name" => Faker::Name.last_name,
          "address_1" => Faker::Address.street_address, 
          "city" => Faker::Address.city, 
          "state" => Faker::Address.state_abbr, 
          "zip" => Faker::Address.zip
      }
    }
    subject{build(:user, user_attrs)}

    it "is true if required fields are complete" do
      expect(subject.complete_shipping_address?).to be true
    end

    it "is false if required fields are not complete" do
      user_attrs.each do |attr_name, attr_value|
        subject.send("#{attr_name}=", '')
        expect(subject.complete_shipping_address?).to be false
        subject.send("#{attr_name}=", attr_value)
      end
    end
  end

  context "used_code?" do

    it "is true if the User has a Promo Code" do
      promo_code = build(:promo_code)
      subject.promo_codes << promo_code

      expect(subject.used_code?).to be true
    end

    it "is false if the User does not have a Promo Code" do
      expect(subject.used_code?).to be false
    end
  end
end
