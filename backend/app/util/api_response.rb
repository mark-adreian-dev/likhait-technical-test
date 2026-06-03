class ApiResponse 

  def format_response(status, message, data)
    if(data == nil)
      {
        status: status,
        message: message,
      }

    else 
      {
        status: status,
        message: message,
        data: data
      }
    end
  end
end