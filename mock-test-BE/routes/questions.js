const express = require('express');
const router = express.Router();
const questions = require('../data/question.json');

router.get('/', (req, res) => {
    // Send questions without the correctAnswer for security reasons
    const questionsToSend = questions.map(({ correctAnswer, ...rest }) => rest);
    res.json(questionsToSend);
});

module.exports = router;
