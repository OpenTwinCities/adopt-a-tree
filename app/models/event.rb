class Event < ActiveRecord::Base
  validates :event_type, presence: true
  enum event_type: [:adopt, :abandon]
end
