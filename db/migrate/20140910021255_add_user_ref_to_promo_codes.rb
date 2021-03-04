class AddUserRefToPromoCodes < ActiveRecord::Migration[4.2]
  def change
    add_reference :promo_codes, :user, index: true
  end
end
