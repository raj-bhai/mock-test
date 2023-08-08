const express = require('express');
const router = express.Router();
const users = require('../data/user.json');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    const { userId, password } = req.body;

    const secretKey = 'supersecretkey';

    const user = users[userId];
    if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    if (user.password !== password) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId, name: user.name }, secretKey, {
        expiresIn: '1h',
    });

    res.json({ success: true, name: user.name, token });
});

module.exports = router;
