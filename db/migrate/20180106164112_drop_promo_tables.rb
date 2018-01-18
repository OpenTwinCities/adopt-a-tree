class DropPromoTables < ActiveRecord::Migration
  def change
    drop_table :promo_codes
    drop_table :promo_vendors
  end
end
