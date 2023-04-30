class Api::FavoritesController < ApplicationController


    before_action :require_logged_in, only: [:create, :index, :destroy]
      wrap_parameters include: Favorite.attribute_names + ['carId']

    def create
        @favorite = Favorite.new(favorite_params);
        @favorite.driver_id = current_user.id;

        if @favorite.save
            # render :show
            head :no_content
        else
            render json: { errors: @favorite.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        @favorites = Favorite.includes(:driver).includes(:car).where(driver_id: current_user.id).order(updated_at: :desc)
    end
    
    def destroy
        @favorite = current_user.favorites.find(params[:id])
        if @favorite&.destroy
            # render :index
            head :no_content

        else
            # render json: { message: 'Unauthorized' }, status: :unauthorized
            # render json: { errors: @favorite.errors.full_messages }, status: :unprocessable_entity
            render json: { message: 'Unauthorized' }, status: :unauthorized

        end
    end

    private

    def favorite_params
        params.require(:favorite).permit(:car_id)
    end

end
