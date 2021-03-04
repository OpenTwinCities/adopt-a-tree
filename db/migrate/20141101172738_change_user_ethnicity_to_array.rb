class ChangeUserEthnicityToArray < ActiveRecord::Migration[4.2]
  def change
    change_column :users, :ethnicity, "varchar[] USING (string_to_array(ethnicity, ','))"
  end
end
