const Games = require('../models/Games');

// get all games
exports.getAllGames = async (req, res) => {
  try {
    const games = await Games.find(); 
    res.json(games); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching games', error: err });
  }
};

// get a specific game by ID
exports.getGameById = async (req, res) => {
  const { _id } = req.params;

  try {
    const game = await Games.findById(_id).lean();
    if (!game) return res.status(404).json({ message: 'Game not found' });

    const transformedActivities = game.activities.map((activity) => {
      const newActivity = { ...activity };
      if (newActivity.rounds && Array.isArray(newActivity.rounds) && newActivity.rounds.length > 0) {
        newActivity.questions = newActivity.rounds;
        delete newActivity.rounds;
      }
      return newActivity;
    });

    game.activities = transformedActivities;
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching game', error: err.message });
  }
};

// add a new game
exports.addGame = async (req, res) => {
  try {
    const newGame = new Games(req.body);
    await newGame.save();
    res.status(201).json({ message: 'Game saved successfully!', id: newGame._id });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// add activities to game
exports.addActivities = async (req, res) => {
  const { _id, activities } = req.body;

  if (!_id || !activities) {
    return res.status(400).json({ message: 'Game ID and activities are required' });
  }

  try {
    const game = await Games.findById(_id);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    const normalizedActivities = activities.map(activity => {
      const hasRounds = activity.questions?.every(q => q.questions && Array.isArray(q.questions));
      if (hasRounds) {
        return {
          ...activity,
          rounds: activity.questions,
          questions: undefined
        };
      }
      return activity;
    });

    game.activities.push(...normalizedActivities);
    await game.save();

    res.status(200).json({ message: 'Activities added successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};