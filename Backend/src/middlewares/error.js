const error = (err, req, res, next) => {
    const statusCode = err.status || 500;
    console.error(err); 
    res.status(statusCode).json({
        message: err.message || "An unexpected error occurred",
    });
};

export default error