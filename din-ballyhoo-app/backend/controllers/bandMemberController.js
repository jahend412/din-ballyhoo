// const BandMember = require('../models/bandMemberModel'); // Import the BandMember model

// // Get All Band Members
// exports.getAllBandMembers = async (req, res) => {
//   try {
//     const bandMembers = await BandMember.find();
//     res.status(200).json({
//       status: 'success',
//       results: bandMembers.length,
//       data: {
//         bandMembers,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err.message, // Using err.message for clearer error reporting
//     });
//   }
// };

// // Create New Band Member
// exports.createBandMember = async (req, res) => {
//   try {
//     const newBandMember = await BandMember.create(req.body);
//     res.status(201).json({
//       status: 'success',
//       data: {
//         bandMember: newBandMember,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };

// // Get Band Member By ID
// exports.getBandMemberById = async (req, res) => {
//   try {
//     const bandMember = await BandMember.findById(req.params.id);
//     if (!bandMember) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'No band member found with that ID',
//       });
//     }
//     res.status(200).json({
//       status: 'success',
//       data: {
//         bandMember,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };

// // Update Band Member
// exports.updateBandMember = async (req, res) => {
//   try {
//     const bandMember = await BandMember.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     if (!bandMember) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'No band member found with that ID',
//       });
//     }
//     res.status(200).json({
//       status: 'success',
//       data: {
//         bandMember,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };

// // Delete Band Member
// exports.deleteBandMember = async (req, res) => {
//   try {
//     const bandMember = await BandMember.findByIdAndDelete(req.params.id);
//     if (!bandMember) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'No band member found with that ID',
//       });
//     }
//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };
