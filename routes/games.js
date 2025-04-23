const express = require('express');
const router = express.Router();
const basicAuth = require("../middlewares/basicAuth");
const gamesController = require('../controllers/gamesController');

router.get('/games', basicAuth, gamesController.getAllGames);
router.get('/games/:_id', basicAuth, gamesController.getGameById);
router.post('/games', basicAuth, gamesController.addGame);
router.post('/games/activities', basicAuth, gamesController.addActivities);

module.exports = router;
