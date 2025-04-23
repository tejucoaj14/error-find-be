const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  is_correct: { type: Boolean, required: true },
  stimulus: { type: String, required: true },
  order: { type: Number, required: true },
  user_answers: { type: [Boolean], default: [] },
  feedback: { type: String, required: true },
});

const roundSchema = new mongoose.Schema({
  round_title: { type: String, required: true },
  order: { type: Number, required: true },
  questions: { type: [questionSchema], required: true },
});

const activitySchema = new mongoose.Schema({
  activity_name: { type: String, required: true },
  order: { type: Number, required: true },
  questions: { type: [questionSchema], default: [] }, // for flat activities
  rounds: { type: [roundSchema], default: [] }, // for activities with rounds
});

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  heading: { type: String, required: true },
  activities: { type: [activitySchema], default: [] },
});

const Games = mongoose.model('Games', gameSchema);

module.exports = Games;