Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # This is the route for the test method in the application controller
  post 'api/test', to: 'application#test'


  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
  end

end
