class CreatePromoVendors < ActiveRecord::Migration[4.2]
  def change
    create_table :promo_vendors do |t|
      t.string :name

      t.timestamps
    end
  end
end
