class Api::FavoritesController < ApplicationController
    before_action :require_logged_in, only: [:create, :index, :destroy]
    wrap_parameters include: Favorite.attribute_names + ['carId']

    def create
        @favorite = Favorite.includes(:driver).includes(:car).new(favorite_params);
        @favorite.driver_id = current_user.id;

        if @favorite.save
            render :show
        else
            head :no_content
        end
    end

    def index
        if current_user
            @favorites = Favorite.includes(:driver).includes(:car).where(driver_id: current_user.id).order(updated_at: :desc)
        else
            head :no_content
        end
    end
    
    def destroy
        @favorite = current_user.favorites.find(params[:id])
        if @favorite&.destroy
            head :no_content
        else
            head :no_content
        end
    end

    private

    def favorite_params
        params.require(:favorite).permit(:car_id)
    end
end
