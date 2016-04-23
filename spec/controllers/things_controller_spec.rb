require 'rails_helper'

RSpec.describe ThingsController, :type => :controller do

  let(:thing) { create(:thing) }

  it 'should list trees' do
    thing.save!
    expect(Thing.count).to be > 0

    get :show, format: 'json', lat: 42.358431, lng: -71.059773

    expect(assigns(:things)).not_to be_empty
    expect(response).to have_http_status(:success)
  end

  it 'should update tree' do
    expect(thing.name).not_to eq('Birdsill')

    put :update, format: 'json', id: thing.id, thing: {name: 'Birdsill'}

    thing.reload
    expect(thing.name).to eq('Birdsill')
    expect(assigns(:thing)).not_to be_nil
    expect(response).to have_http_status(:success)
  end

  it 'should log abandonment' do
    thing.user_id = 88
    thing.save!
    Event.delete_all

    expect{put :update, format: 'json', id: thing.id, thing: {user_id: nil}}.to change(Event, :count).by(1)

    expect(Event.count).to eq(1)
    event = Event.first
    expect(event.abandon?).to be true
    expect(event.user_id).to eq(88)
    expect(event.thing_id).to eq(thing.id)
  end

  it 'should log adoption' do
    Event.delete_all

    expect{put :update, format: 'json', id: thing.id, thing: {user_id: 100000}}.to change(Event, :count).by(1)

    expect(Event.count).to eq(1)
    event = Event.first
    expect(event.adopt?).to be true
    expect(event.user_id).to eq(100000)
    expect(event.thing_id).to eq(thing.id)
  end
end
