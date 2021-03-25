class ConvertHeardOfToAnArray < ActiveRecord::Migration[4.2]
  def change
    change_column :users, :heardOfAdoptATreeVia, "varchar[] USING (string_to_array(\"heardOfAdoptATreeVia\", ','))"
  end
end
