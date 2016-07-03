def render_events_list
  v = bindings[:view]
  v.content_tag(:ul) do
    v.content_tag_for(:li, value) do |event|
      am = RailsAdmin.config(event).abstract_model
      show_action = v.action(:show, am, event)
      v.link_to(event.title, v.url_for(action: show_action.action_name, model_name: am.to_param, id: event.id))
    end
  end
end

RailsAdmin.config do |config|

  ### Popular gems integration

  ## == Devise ==
  config.authenticate_with do
    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new do
      except ['Event']
    end
    export
    bulk_delete
    show
    edit do
      except ['Event']
    end
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.model 'Thing' do |thing_config|
    show do
      configure :events do
        pretty_value {render_events_list}
      end
    end
    edit do
      exclude_fields :events, :reminders
    end

    # `name` can be empty, but Rails Admin will still use it. Force
    # Rails Admin to use title.
    object_label_method { :title }
  end

  config.model 'User' do
    show do
      configure :events do
        pretty_value {render_events_list}
      end
    end
    edit do
      exclude_fields :events, :reminders_from, :reminders_to
    end
  end
end
