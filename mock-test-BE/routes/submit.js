const express = require('express');
const router = express.Router();
const questions = require('../data/question.json');

const verifyToken = require('../middleware/verifyToken')


router.post('/', verifyToken, (req, res) => {
    const userAnswers = req.body.answers;

    if (!userAnswers || userAnswers.length !== questions.length) {
      return res.status(400).json({ error: 'Invalid submission' });
    }

    let score = 0;

    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        if (userAnswer !== 0) { 
            if (question.correctAnswer === userAnswer) {
                score += 3; 
            } else {
                score -= 1; 
            }
        }
    });

    res.json({ score });
});

module.exports = router;
