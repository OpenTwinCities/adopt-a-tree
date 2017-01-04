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

class Event < ActiveRecord::Base
  validates :event_type, presence: true
  enum event_type: [:adopt, :abandon]
  belongs_to :user
  belongs_to :thing

  def title
    "#{created_at}: #{user.username} #{event_type}ed #{thing.title}"
  end
end
