class Api::CarsController < ApplicationController
    before_action :require_logged_in, only: :create
    wrap_parameters include: Car.attribute_names  + ['doorsCount'] + ['seatsCount'] + ['dailyRate']
    # wrap_parameters include: Car.attribute_names + [:photo], format: :multipart_form + ['doorsCount'] + ['seatsCount'] + ['dailyRate']

  def index
    @cars = Car.includes(:host).all
  end

  def show
    @car = Car.includes(:host).find(params[:id])
  end

  def create
    @car = Car.new(car_params)
    @car.host_id = current_user.id

    if @car.save
      render :show
    else 
      render json: { errors: @car.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def car_params
    params.require(:car).permit(
      :make,
      :model,
      :year,
      :mpg,
      :doors_count,
      :seats_count,
      :category,
      :automatic,
      :description,
      :guidelines,
      :daily_rate,
      :location,
      :active
    )
  end

end
