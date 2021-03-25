# == Schema Information
#
# Table name: things
#
#  id          :integer          not null, primary key
#  name        :string
#  user_id     :integer
#  mpls_id     :integer
#  mpls_unique :string
#  lat         :decimal(32, 29)  not null
#  lng         :decimal(32, 29)  not null
#  species     :string
#  properties  :json
#  created_at  :datetime
#  updated_at  :datetime
#

require 'rails_helper'

RSpec.describe Thing, :type => :model do

  context 'with a valid lat and lng' do
    subject {build(:thing)}

    it 'is valid' do
      expect(subject).to be_valid
    end
  end

  context 'without a valid lat and lng' do
    subject {build(:thing, lat: nil, lng: nil) }

    it 'is invalid without a lat and lng' do
      expect(subject).to have_invalid_attribute(:lat)
      expect(subject).to have_invalid_attribute(:lng)
    end
  end

  context 'with a name' do
    subject { create(:thing, :named)}

    it "uses it's id and name as it's title" do
      expect(subject.title).to eq("#{subject.id} (#{subject.name})")
    end
  end

  context 'without a name' do
    subject {create(:thing)}

    it "uses it's id as it's title" do
      expect(subject.title).to eq(subject.id)
    end
  end
end
