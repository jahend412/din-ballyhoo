// const mongoose = require('mongoose');
// const User = require('./userModel');

// const fanSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   firstName: {
//     type: String,
//     required: [true, 'First name is required'],
//   },
//   lastName: {
//     type: String,
//     required: false,
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//   },
//   profileImage: {
//     type: String,
//     required: false,
//   },
//   purchaseHistory: [
//     {
//       itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchandise' },
//       purchaseDate: { type: Date, default: Date.now },
//     },
//   ],
//   favoriteTracks: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Track',
//       required: false,
//     },
//   ],
//   favoriteAlbums: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Album',
//       required: false,
//     },
//   ],
//   comments: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Comment',
//       required: false,
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
// });

// const Fan = User.discriminator('Fan', fanSchema);

// module.exports = Fan;
