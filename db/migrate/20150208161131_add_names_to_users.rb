class AddNamesToUsers < ActiveRecord::Migration[4.2]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    rename_column :users, :name, :username
  end
end
