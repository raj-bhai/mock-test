const express = require('express');
const router = express.Router();
const questions = require('../data/question.json');

router.post('/', (req, res) => {
    const userAnswers = req.body.answers;

    if (!userAnswers || userAnswers.length !== questions.length) {
      return res.status(400).json({ error: 'Invalid submission' });
    }

    let score = 0;

    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        if (userAnswer !== 0) { // Assuming a null value for not attempted
            if (question.correctAnswer === userAnswer) {
                score += 3; // +3 for correct answer
            } else {
                score -= 1; // -1 for wrong answer
            }
        }
        // 0 for not attempted (no change in score)
    });

    res.json({ score });
});

module.exports = router;
