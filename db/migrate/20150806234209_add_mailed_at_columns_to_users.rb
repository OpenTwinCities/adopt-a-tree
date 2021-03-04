class AddMailedAtColumnsToUsers < ActiveRecord::Migration[4.2]
  def change
    add_column :users, :emailed_at, :timestamp
    add_column :users, :mailed_token_at, :timestamp
  end
end
