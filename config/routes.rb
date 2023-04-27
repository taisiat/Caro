Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create,:show]
    resource :session, only: [:show, :create, :destroy]
    resources :cars, only: [:index, :show, :create, :update, :destroy]
    resources :trips, only: [:create, :index, :update, :destroy]
  end

    # get '*path', to: "static_pages#frontend_index"


end
