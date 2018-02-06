require 'rails_helper'

RSpec.describe UsersController, :type => :controller do
  before(:each) do
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  let(:user) { create(:user) }

  context '#update' do
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
      put :update, params: {user: {first_name: 'New', current_password: 'badpassword'}}
      expect(response).to have_http_status(:error)
      user.reload
      expect(user.first_name).not_to eql('New')
    end
  end

  context '#create' do
    context 'with valid parameters' do
      it 'should create user' do
        post :create, params: {format: 'json', user: {email: 'user1@example.com', first_name: 'Userf1', last_name: 'Userl', 
          password: 'correcT*1', password_confirmation: 'correcT*1', username: 'userfuserl1',
          address_1: '350 S 5th St', city: 'Minneapolis', state: 'MN', zip: 55415}}
        assert_response :success
      end

      it 'should send welcome email' do
        expect(ThingMailer).to receive(:sign_up).with(kind_of(User))
        post :create, params: {format: 'json', user: {email: 'user@example.com', first_name: 'Userf', last_name: 'Userl', 
          password: 'correcT*1', password_confirmation: 'correcT*1', username: 'userfuserl',
          address_1: '350 S 5th St', city: 'Minneapolis', state: 'MN', zip: 55415}}
      end
    end

    it 'should return error if passwords do not match' do
      post :create, params: {format: 'json', user: {email: 'user@example.com', first_name: 'Userf', last_name: 'Userl', 
        password: 'correcT*1', password_confirmation: 'incorrect', username: 'userfuserl',
        address_1: '350 S 5th St', city: 'Minneapolis', state: 'MN', zip: 55415}}
      assert_response :error
    end

    it 'should return error if all requirements not met' do
      # no city
      post :create, params: {format: 'json', user: {email: 'user@example.com', first_name: 'Userf', last_name: 'Userl', 
        password: 'correcT*1', password_confirmation: 'correcT*1', username: 'userfuserl',
        address_1: '350 S 5th St', state: 'MN', zip: 55415}}
      assert_response :error
    end
  end
end
