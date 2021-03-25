class CreatePromoCodes < ActiveRecord::Migration[4.2]
  def change
    create_table :promo_codes do |t|

      t.timestamps
    end
  end
end
