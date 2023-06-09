class Api::CarsController < ApplicationController
    before_action :require_logged_in, only: :create
    wrap_parameters include: Car.attribute_names  + ['doorsCount'] + ['seatsCount'] + ['dailyRate']

  def index
    @cars = Car.includes(:host).includes(:reviews).includes(:trips)
    @cars = @cars.in_bounds(bounds) if bounds
    @cars = @cars.where(daily_rate: price_range) if price_range
    
    if superhost_filter === 'true'
      @cars = @cars.where(host_id: User.where(is_superhost: true).pluck(:id))
    else
      @cars
    end
    
    if experience_filter === 'all'
      @cars
    else
      @cars = @cars.where(category: experience_filter)
    end
    
    if !date_range
      @cars
    elsif date_range === ["",""] || date_range === ["Invalid Date", "Invalid Date"]
      @cars
    else
      @cars = @cars.where.not(id: Trip.where("(start_date <= ? AND end_date >= ?) OR (start_date <= ? AND end_date >= ?) OR (start_date >= ? AND end_date <= ?)", Date.parse(date_range[0]),Date.parse(date_range[0]) , Date.parse(date_range[1]), Date.parse(date_range[1]), Date.parse(date_range[0]), Date.parse(date_range[1]))
      .select(:car_id)) 
    end
  end

  def show
    @car = Car.includes(:host).includes(:reviews).includes(:trips).find(params[:id])
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
      :active,
      :city
    )
  end

  def bounds
    return nil unless params[:bounds]
    params[:bounds]&.split(',').map(&:to_f)
  end

  def price_range
    return nil unless params[:min_pricing] && params[:max_pricing]
    params[:min_pricing]..params[:max_pricing]
  end

  def date_range
    return nil unless params[:trip_start] && params[:trip_end]
    [params[:trip_start],params[:trip_end]]
  end

  def superhost_filter
    return nil unless params[:superhost_filter]
    params[:superhost_filter]
  end

  def experience_filter 
    return nil unless params[:experience_type]
    params[:experience_type]
  end
end
