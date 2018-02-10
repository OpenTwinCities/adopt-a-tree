require 'rails_helper'

RSpec.describe RemindersController, :type => :controller do
  let(:user) { create :user }
  let(:thing) { create :thing }
  let(:mailer) { double 'mailer' }

  before(:each) do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    sign_in user
    thing.user = user
    thing.save!
  end

  it 'should send a reminder email' do
    expect(mailer).to receive(:deliver)
    expect(ThingMailer).to receive(:reminder).with(kind_of(Thing)).and_return(mailer)

    post :create, params: {format: :json, reminder: {thing_id: thing.id, to_user_id: user.id}}

    expect(response).to have_http_status(:success)
  end
end
