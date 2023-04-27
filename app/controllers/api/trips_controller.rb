class Api::TripsController < ApplicationController
    before_action :require_logged_in, only: [:create, :index, :update, :destroy]
      wrap_parameters include: Trip.attribute_names + ['carId'] + ['startDate'] + ['endDate'] + ['totalPrice']  + ['protectionPlan'] 
    
    def create
        @trip = Trip.new(trip_params);
        @trip.driver_id = current_user.id;

        if @trip.save
            render :show
        else
            render json: { errors: @trip.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        @trip = Trip.find(params[:id])
    end

    def index
        @trips = Trip.includes(:driver).includes(:car).where(driver_id: current_user.id).order(start_date: :desc)
    end

    def update
        @trip = current_user.trips.find(params[:id])
        if @trip&.update(trip_params)
            render :show
        else
            render json: { message: 'Unauthorized' }, status: :unauthorized
        end
    end

    def destroy
        @trip = current_user.trips.find(params[:id])
        if @trip&.destroy
            head :no_content
        else
            render json: { message: 'Unauthorized' }, status: :unauthorized
        end
    end


    
    private
    
    def trip_params
        params.require(:trip).permit(:total_price, :start_date, :end_date, :protection_plan, :car_id)
    end
end
