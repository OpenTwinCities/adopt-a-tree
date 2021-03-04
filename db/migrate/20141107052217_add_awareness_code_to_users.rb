class AddAwarenessCodeToUsers < ActiveRecord::Migration[4.2]
  def change
    add_column :users, :awareness_code, :string
  end
end
