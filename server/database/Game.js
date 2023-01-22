const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/rebellion', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const RoleSchema = new mongoose.Schema({
  role: { type: String },
});

const PlayerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  balance: { type: Number, required: true },
  roles: [RoleSchema],
});

const GameSchema = new mongoose.Schema({
  players: [PlayerSchema],
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
