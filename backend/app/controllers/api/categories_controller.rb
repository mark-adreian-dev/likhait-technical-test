
class Api::CategoriesController < ApplicationController
  def index
    begin
      categories = categories = Category.order(created_at: :desc).where(is_deleted: false)
      response = PaginatedResponse.new()

      render json: response.format_response(
        200,
        "Categories fetched successfully", 
        categories,
        params[:limit],
        params[:page],
        params[:sort_by],
        params[:order],
        params[:query],
        self
      ), status: :ok

    rescue => e
      render json: { 
        status: 500, 
        message: e.message, 
        stacktrace: e.backtrace 
      }, status: :internal_server_error
    end
  end

  def create
    begin
      request_category = params.permit(:name)
      category = Category.new(request_category)
      if category.save
        response = ApiResponse.new()
        render json: response.format_response(
          200,
          "Categories created successfully",
          category,
        ), status: :created
      end 
    rescue => e
      render json: { 
        status: 500, 
        message: e.message, 
        stacktrace: e.backtrace 
      }, status: :internal_server_error
    end
  end

  def update 
    begin
      request_category = params.permit(:name)
      category = Category.find(params[:id])
      if category.update(request_category)
        response = ApiResponse.new()
        render json: response.format_response(
          200,
          "Category updated successfully",
          category,
        ), status: :ok
      end 
    rescue => e
      render json: { 
        status: 500, 
        message: e.message, 
        stacktrace: e.backtrace 
      }, status: :internal_server_error
    end
  end 

  def destroy 
    begin
      category = Category.find(params[:id])
      if category.update(is_deleted: true)
        response = ApiResponse.new()
        render json: response.format_response(
          200,
          "Category deleted successfully",
          category,
        ), status: :ok
      end 
    rescue => e
      render json: { 
        status: 500, 
        message: e.message, 
        stacktrace: e.backtrace 
      }, status: :internal_server_error
    end
  end
end