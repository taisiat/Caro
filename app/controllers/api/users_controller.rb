class Api::UsersController < ApplicationController

  wrap_parameters include: User.attribute_names + ['password'] + ['phoneNumber'] + ['firstName'] + ['lastName'] + ['approvedToDrive'] + ['isSuperhost'] + ['isCleanCertified']

  def create
      @user = User.new(user_params);
      if @user.save
        login!(@user)
        render :show
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def show
    @user = User.includes(:cars).includes(:trips).includes(:reviews).includes(:favorites).includes(:reviews_for_own_cars).find(params[:id])
    
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :approved_to_drive, :is_superhost, :is_clean_certified, :email, :phone_number, :password)
  end
end
