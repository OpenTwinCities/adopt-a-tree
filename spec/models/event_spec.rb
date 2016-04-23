require 'rails_helper'

RSpec.describe Event, :type => :model do
  it "is invalid without a type" do
    event = build(:event, event_type: nil)
    expect(event).to_not be_valid
  end

  it "is valid with a type" do
    event = build(:event, event_type: 0)
    expect(event).to be_valid
    expect(event.event_type).to eql("adopt")
  end
end
