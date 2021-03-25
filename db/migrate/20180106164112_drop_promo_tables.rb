class DropPromoTables < ActiveRecord::Migration[4.2]
  def change
    drop_table :promo_codes
    drop_table :promo_vendors
  end
end
