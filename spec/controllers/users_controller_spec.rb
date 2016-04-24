require 'rails_helper'

RSpec.describe UsersController, :type => :controller do
  before(:each) do
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  let(:user) { create(:user) }

  it 'should update user if password is correct' do
    sign_in user
    expect(user.first_name).not_to eql('New')
    put :update, user: {first_name: 'New', current_password: user.password}
    expect(response).to have_http_status(:redirect)
    user.reload
    expect(user.first_name).to eql('New')
  end

  it 'should return error if password is incorrect' do
    sign_in user
    expect(user.first_name).not_to eql('New')
    put :update, user: {first_name: 'New', current_password: 'badpassword'}
    expect(response).to have_http_status(:error)
    user.reload
    expect(user.first_name).not_to eql('New')
  end

  it 'should create user if information is valid' do
    post :create, format: 'json', user: {email: 'user@example.com', first_name: 'Userf', last_name: 'Userl', 
      password: 'correcT*1', password_confirmation: 'correcT*1', username: 'userfuserl',
      address_1: '350 S 5th St', city: 'Minneapolis', state: 'MN', zip: 55415}
    assert_response :success
  end

  it 'should return error if passwords do not match' do
    post :create, format: 'json', user: {email: 'user@example.com', first_name: 'Userf', last_name: 'Userl', 
      password: 'correcT*1', password_confirmation: 'incorrect', username: 'userfuserl',
      address_1: '350 S 5th St', city: 'Minneapolis', state: 'MN', zip: 55415}
    assert_response :error
  end

  it 'should return error if all requirements not met' do
    # no city
    post :create, format: 'json', user: {email: 'user@example.com', first_name: 'Userf', last_name: 'Userl', 
      password: 'correcT*1', password_confirmation: 'correcT*1', username: 'userfuserl',
      address_1: '350 S 5th St', state: 'MN', zip: 55415}
    assert_response :error
  end

end
