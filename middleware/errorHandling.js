const handleServerError = (err, req, res, next) => {
    console.error('Internal Server Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Error handling middleware for handling not found errors
const handleNotFoundError = (req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
};

// Error handling middleware for handling validation errors
const handleValidationError = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).json({ error: err.message });
    } else {
        next(err);
    }
};
const handleServerError = (err, req, res, next) => {
    console.error('Internal Server Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Error handling middleware for handling not found errors
const handleNotFoundError = (req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
};

// Error handling middleware for handling validation errors
const handleValidationError = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).json({ error: err.message });
    } else {
        next(err);
    }
};