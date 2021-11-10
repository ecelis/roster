function sendResponse(payload, isError = false) {
    const response = {};
    if (isError) {
        response.error = payload;
    } else {
        response.data = payload;
    }
    return response;
}

export default sendResponse;
