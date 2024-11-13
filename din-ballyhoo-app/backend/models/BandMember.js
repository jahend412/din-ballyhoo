const mongoose = require('mongoose');

const bandMemberSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    roles: [{ type: String }], // e.g., ['guitarist', 'vocalist']
    instruments: [{ type: String }], // e.g., ['guitar', 'keyboard']
    bio: { type: String },
    socialLinks: [{ platform: String, url: String }],
    profileImageUrl: { type: String },
    shows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }]
  });
  
  const BandMember = mongoose.model('BandMember', bandMemberSchema);
  module.exports = BandMember;
  