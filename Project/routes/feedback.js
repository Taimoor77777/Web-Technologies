const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// Display feedback with pagination
router.get('/', async (req, res) => {
  const perPage = 5;
  const page = parseInt(req.query.page) || 1;

  try {
    const feedbacks = await Feedback.find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .sort({ date: -1 });

    const count = await Feedback.countDocuments();

    res.render('feedback', {
      feedbacks,
      current: page,
      pages: Math.ceil(count / perPage)
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Handle new feedback submission
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();
    res.redirect('/feedback');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
