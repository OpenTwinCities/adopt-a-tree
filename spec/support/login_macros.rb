module LoginMacros
  def sign_in(user)
    visit root_path
    fill_in 'user_email', with: user.email
    find('#user_existing').click
    # wait for animation
    sleep 0.5
    fill_in 'user_password', with: user.password
    find_button('Sign in').click
  end

  def sign_up(user)
    visit root_path
    fill_in 'user_email', with: user.email
    fill_in 'user_username', with: user.username
    fill_in 'user_first_name', with: user.first_name
    fill_in 'user_last_name', with: user.last_name
    fill_in 'user_address_1', with: user.address_1
    find(:select, 'user_city').find(:xpath, "option[@value='#{user.city}']").select_option
    find(:select, 'user_state').find(:xpath, "option[contains(text(), '#{user.state}')]").select_option
    find(:select, 'user_zip').find(:xpath, "option[@value='#{user.zip}']").select_option
    fill_in 'user_password_confirmation', with: user.password
    find(:button, 'Sign up').trigger('click')
  end

  def sign_out
    if page.has_button? '#sign_out_link'
      click_button 'Sign out'
    end
  end
end
