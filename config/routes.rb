# == Route Map
#
#                   Prefix Verb   URI Pattern                      Controller#Action
#         new_user_session GET    /users/sign_in(.:format)         sessions#new
#             user_session POST   /users/sign_in(.:format)         sessions#create
#     destroy_user_session DELETE /users/sign_out(.:format)        sessions#destroy
#            user_password POST   /users/password(.:format)        passwords#create
#        new_user_password GET    /users/password/new(.:format)    passwords#new
#       edit_user_password GET    /users/password/edit(.:format)   passwords#edit
#                          PATCH  /users/password(.:format)        passwords#update
#                          PUT    /users/password(.:format)        passwords#update
# cancel_user_registration GET    /users/cancel(.:format)          users#cancel
#        user_registration POST   /users(.:format)                 users#create
#    new_user_registration GET    /users/sign_up(.:format)         users#new
#   edit_user_registration GET    /users/edit(.:format)            users#edit
#                          PATCH  /users(.:format)                 users#update
#                          PUT    /users(.:format)                 users#update
#                          DELETE /users(.:format)                 users#destroy
#          mailing_address GET    /users/mailing_address(.:format) users#mailing_address
#                   survey GET    /users/survey(.:format)          users#survey
#   restricted_user_update PUT    /users/restricted(.:format)      users#restricted_update
#                  address GET    /address(.:format)               addresses#show
#              info_window GET    /info_window(.:format)           info_window#index
#                  sitemap GET    /sitemap(.:format)               sitemaps#index
#                   search GET    /sidebar/search(.:format)        sidebar#search
#               combo_form GET    /sidebar/combo_form(.:format)    sidebar#combo_form
#             edit_profile GET    /sidebar/edit_profile(.:format)  sidebar#edit_profile
#                reminders POST   /reminders(.:format)             reminders#create
#            new_reminders GET    /reminders/new(.:format)         reminders#new
#           edit_reminders GET    /reminders/edit(.:format)        reminders#edit
#                          GET    /reminders(.:format)             reminders#show
#                          PATCH  /reminders(.:format)             reminders#update
#                          PUT    /reminders(.:format)             reminders#update
#                          DELETE /reminders(.:format)             reminders#destroy
#                   things POST   /things(.:format)                things#create
#               new_things GET    /things/new(.:format)            things#new
#              edit_things GET    /things/edit(.:format)           things#edit
#                          GET    /things(.:format)                things#show
#                          PATCH  /things(.:format)                things#update
#                          PUT    /things(.:format)                things#update
#                          DELETE /things(.:format)                things#destroy
#              promo_codes PATCH  /promo_codes(.:format)           promo_codes#update
#                          PUT    /promo_codes(.:format)           promo_codes#update
#          promo_codes_use GET    /promo_codes/use(.:format)       promo_codes#use
#              rails_admin        /admin                           RailsAdmin::Engine
#                     root GET    /                                main#index
# 
# Routes for RailsAdmin::Engine:
#   dashboard GET         /                                      rails_admin/main#dashboard
#       index GET|POST    /:model_name(.:format)                 rails_admin/main#index
#         new GET|POST    /:model_name/new(.:format)             rails_admin/main#new
#      export GET|POST    /:model_name/export(.:format)          rails_admin/main#export
# bulk_delete POST|DELETE /:model_name/bulk_delete(.:format)     rails_admin/main#bulk_delete
# bulk_action POST        /:model_name/bulk_action(.:format)     rails_admin/main#bulk_action
#        show GET         /:model_name/:id(.:format)             rails_admin/main#show
#        edit GET|PUT     /:model_name/:id/edit(.:format)        rails_admin/main#edit
#      delete GET|DELETE  /:model_name/:id/delete(.:format)      rails_admin/main#delete
# show_in_app GET         /:model_name/:id/show_in_app(.:format) rails_admin/main#show_in_app
# 

Rails.application.routes.draw do
  devise_for :users, controllers: {
    passwords: 'passwords',
    registrations: 'users',
    sessions: 'sessions',
  }
  devise_scope :user do
    get '/users/mailing_address', to: 'users#mailing_address', as: 'mailing_address'
    get '/users/survey', to: 'users#survey', as: 'survey'
    put '/users/restricted', to: 'users#restricted_update', as: 'restricted_user_update'
  end

  get '/address', to: 'addresses#show', as: 'address'
  get '/info_window', to: 'info_window#index', as: 'info_window'
  get '/sitemap', to: 'sitemaps#index', as: 'sitemap'

  scope '/sidebar', controller: :sidebar do
    get :search, as: 'search'
    get :combo_form, as: 'combo_form'
    get :edit_profile , as: 'edit_profile'
  end

  resource :reminders
  resource :things
  resource :promo_codes, only: [:update]
  get '/promo_codes/use', to: 'promo_codes#use', as: 'promo_codes_use'
  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'
  root to: 'main#index'
end
