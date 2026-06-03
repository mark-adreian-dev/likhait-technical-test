require 'pagy/extras/limit'

class PaginatedResponse < ApiResponse

  def format_response(status, message, data, limit, page, sort_by, order, query, context)
    if query.present?
      sanitized_query = ActiveRecord::Base.sanitize_sql_like(query)
      data = data.where("name ILIKE ?", "%#{sanitized_query}%")
    end

    allowed_columns = ['name', 'created_at', 'updated_at']
    sort_by = allowed_columns.include?(sort_by) ? sort_by : 'name'
    order = ['asc', 'desc'].include?(order&.downcase) ? order.downcase : 'asc'
    
    data = data.order("#{sort_by} #{order}")

    pagy, paginated_data = context.send(:pagy, data, page: page, limit: limit || 10)

    {
      status: status,
      message: message,
      data: {
        content: paginated_data,
        pagination: {
          current_page: pagy.page,
          next_page: pagy.next,
          prev_page: pagy.prev,
          total_pages: pagy.pages,
          total_count: pagy.count
        }
      }
    }
  end
end