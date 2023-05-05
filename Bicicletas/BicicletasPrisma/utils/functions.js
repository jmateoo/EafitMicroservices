
export const methodNotAllowed = (req, res, next) => res.status(405).send({ error: "Method not allowed" });

export const wrappedResponse =  (res, message, statusCode, result) => {
  return res.status(statusCode).json({
    message,
    statusCode,
    result,
  });
};
