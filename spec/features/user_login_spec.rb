require 'rails_helper'

describe 'User Login' do
  before do
    User.create!(email: 'elwood@rubyonracetracks.com',
                 first_name: 'Elwood',
                 last_name: 'Blues',
                 username: 'elwood_blues',
                 password: 'Mission from God',
                 password_confirmation: 'Mission from God',
                 address_1: '1060 W. Addison St.',
                 city: 'Chicago',
                 state: 'IL',
                 zip: '60613')
    visit root_path
  end

  def login_process(email, password)
    fill_in 'user_email', with: email
    choose 'user_existing'
    sleep 0.5
    fill_in 'user_password', with: password
    click_on 'Sign in'
  end

  context 'Unsuccessful login' do
    it 'does not login with invalid email address', js: true do
      within '#combo-form' do
        login_process('invalid@aol.com', 'Mission from God')
        expect(page).to have_button 'Sign in'
        expect(page).to have_field 'user_email'
        expect(page).to have_field 'user_password_confirmation'
      end
    end

    it 'does not login with wrong password', js: true do
      within '#combo-form' do
        login_process('elwood@rubyonracetracks.com', 'Bass-o-matic')
        expect(page).to have_button 'Sign in'
        expect(page).to have_field 'user_email'
        expect(page).to have_field 'user_password_confirmation'    
      end
    end
  end

  context 'Successful login and logout' do
    it 'successful login and logout given the correct username and password', js: true do
      within '.sidebar' do
        login_process('elwood@rubyonracetracks.com', 'Mission from God')
        expect(page).to_not have_selector '#combo-form'
        expect(page).to have_text 'Signed in!'
        click_on 'Sign out'

        expect(page).to have_text 'Signed out.'
        sign_up_button = page.find_button 'Sign up'
        expect(page).to have_field 'user_email'
        expect(page).to have_field 'user_username'
        expect(page).to have_field 'user_password_confirmation'
        expect(sign_up_button).to_not be_disabled
      end
    end
  end
end
