# == Schema Information
#
# Table name: events
#
#  id         :integer          not null, primary key
#  event_type :integer          not null
#  thing_id   :integer
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

FactoryBot.define do
  factory :event do
    event_type 0
    thing_id 1
    user_id 2
  end

end
