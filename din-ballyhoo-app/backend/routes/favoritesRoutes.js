const Express = require('express');
const FavoritesController = require('../controllers/favoritesController');
const AuthController = require('../controllers/authController');

const Router = Express.Router();

Router.use(AuthController.protect);

Router.route('/')
  .get(FavoritesController.getFavorites)
  .post(FavoritesController.addToFavorites)
  .delete(FavoritesController.removeFromFavorites);

module.exports = Router;