require 'rails_helper'

RSpec.describe Event, :type => :model do
  let (:user) {create(:user)}
  let (:thing) {create(:thing, :named)}
  subject { build(:event, user: user, thing: thing) }

  it "is invalid without a type" do
    subject.event_type = nil
    expect(subject).to have_invalid_attribute(:event_type)
  end

  it "is valid with a type" do
    subject.event_type = 'adopt'
    expect(subject).to be_valid
    expect(subject.event_type).to eql("adopt")
  end

  it 'it has a title that describes the event' do
    subject.event_type = 'adopt'
    subject.save!
    expect(subject.title).to eq("#{subject.created_at}: #{user.username} adopted #{thing.title}")
  end
end
