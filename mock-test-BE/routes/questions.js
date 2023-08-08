const express = require('express');
const router = express.Router();
const questions = require('../data/question.json');
const verifyToken = require('../middleware/verifyToken')

router.get('/',verifyToken, (req, res) => {
    const questionsToSend = questions.map(({ correctAnswer, ...rest }) => rest);
    res.json(questionsToSend);
});

module.exports = router;
