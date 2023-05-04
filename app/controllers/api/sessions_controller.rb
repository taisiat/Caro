class Api::SessionsController < ApplicationController
  
  def show
    if current_user
      @user = current_user
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:email], params[:password])
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['Please check your email and password.'] }, status: :unauthorized
    end
  end

  def destroy
    # if current_user
    #   logout!
    #   render json: { message: 'Logout successful.' }
    # else
    #   render json: { message: 'No current user.' }, status: :unauthorized
    # end
    logout!
    render json: { message: 'success' }
  end
end
