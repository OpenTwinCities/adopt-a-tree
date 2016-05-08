class Event < ActiveRecord::Base
  validates :event_type, presence: true
  enum event_type: [:adopt, :abandon]
  belongs_to :user
  belongs_to :thing
end
