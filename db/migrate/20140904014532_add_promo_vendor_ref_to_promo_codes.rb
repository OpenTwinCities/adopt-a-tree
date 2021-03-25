class AddPromoVendorRefToPromoCodes < ActiveRecord::Migration[4.2]
  def change
    add_reference :promo_codes, :promo_vendor, index: true
  end
end
