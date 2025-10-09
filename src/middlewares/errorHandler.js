module.exports = (err, req, res, next) => {
    console.error('❌', err);
    const status = err.statusCode || 500;
    res.status(status).json({
        status: false,
        message: err.message || 'Internal Server Error'
    });
};
