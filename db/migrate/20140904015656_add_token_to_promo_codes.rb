class AddTokenToPromoCodes < ActiveRecord::Migration[4.2]
  def change
    add_column :promo_codes, :token, :string
  end
end
