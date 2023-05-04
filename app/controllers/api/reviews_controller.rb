class Api::ReviewsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]
    wrap_parameters include: Review.attribute_names + ['carId'] + ['cleanlinessRating']  + ['maintenanceRating'] + ['communicationRating'] + ['convenienceRating'] +['accuracyRating']
    
    def create
        @review = Review.new(review_params);
        @review.driver_id = current_user.id;

        if @review.save
            render :show
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        @review = Review.includes(:driver).includes(:car).find(params[:id])
    end

    def index
        @reviews = Review.includes(:driver).includes(:car).order(updated_at: :desc)
    end

    def update
        @review = current_user.reviews.find(params[:id])
        if @review&.update(review_params)
            render :show
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @review = current_user.reviews.find(params[:id])
        if @review&.destroy
            head :no_content
        else
            render json: { message: 'Unauthorized' }, status: :unauthorized
        end
    end
    
    private
    
    def review_params
        params.require(:review).permit( :cleanliness_rating, :maintenance_rating, :communication_rating, :convenience_rating, :accuracy_rating, :comment, :car_id)
    end
end
