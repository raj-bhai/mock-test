const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    const secretKey = 'supersecretkey';
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
    
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;
