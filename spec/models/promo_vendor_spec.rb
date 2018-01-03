# == Schema Information
#
# Table name: promo_vendors
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

require 'rails_helper'

RSpec.describe PromoVendor, :type => :model do
  subject{build(:promo_vendor)}

  it 'is valid with a name' do
    expect(subject).to be_valid
  end

  it 'is not valid without a name' do
    subject.name = nil
    expect(subject).to have_invalid_attribute(:name)
  end

  it 'is not valid with a zero-length name' do
    subject.name = ''
    expect(subject).to have_invalid_attribute(:name)
  end

  it 'is valid with a name of length 255' do
    subject.name = 'a' * 255
    expect(subject).to be_valid
  end

  it 'is valid with a name of length 256' do
    subject.name = 'a' * 256
    expect(subject).to have_invalid_attribute(:name)
  end
end
