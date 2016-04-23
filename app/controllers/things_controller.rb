class ThingsController < ApplicationController
  respond_to :json

  def show
    @things = Thing.find_closest(params[:lat], params[:lng], params[:limit] || 10)
    if @things.blank?
      render(json: {errors: {address: [t('errors.not_found', thing: t('defaults.thing'))]}}, status: 404)
    else
      respond_with @things, except: [:mpls_id, :mpls_unique, :species, :properties]
    end
  end

  def update
    @thing = Thing.find(params[:id])
    @previous_user_id = @thing.user_id
    if @thing.update_attributes(thing_params)
      create_event
      respond_with @thing
    else
      render(json: {errors: @thing.errors}, status: 500)
    end
  end

  private

  def thing_params
    params.require(:thing).permit(:name, :user_id)
  end

  def create_event
    event_type = (@thing.user_id.nil? ? :abandon : :adopt)
    user_id = (@thing.user_id.nil? ? @previous_user_id : @thing.user_id)
    Event.new(event_type: event_type, thing_id: @thing.id, user_id: user_id).save!
  end
end
