def format_api_response(data, status=200):
    return {
        "status": status,
        "data": data
    }

def handle_api_error(error_message, status=400):
    return {
        "status": status,
        "error": error_message
    }