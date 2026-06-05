const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.method} ${req.originalUrl}`));
};

const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message || "Server error";

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((validationError) => validationError.message)
      .join(", ");
  }

  if (error.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${error.path}: ${error.value}`;
  }

  if (error.code === 11000) {
    statusCode = 409;
    const field = Object.keys(error.keyValue || {})[0] || "Field";
    message = `${field} already exists`;
  }

  if (message.startsWith("CORS blocked request")) {
    statusCode = 403;
  }

  res.status(statusCode).json({ message });
};

module.exports = { errorHandler, notFound };
