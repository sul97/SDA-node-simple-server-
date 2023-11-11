export const successResponse = (
  res,
  statusCode = 200,
  message = "succesful",
  payload = {}
) => {
  res.status(statusCode).send({
    success: true,
    message: message,
    payload: payload,
  });
};

export const errorResponse = (
  res,
  statusCode = 500,
  message = "server error"
) => {
  res.status(statusCode).send({
    success: false,
    message: message,
  });
};
