class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :event_type, null: false
      t.integer :thing_id
      t.integer :user_id

      t.timestamps
    end
  end
end
