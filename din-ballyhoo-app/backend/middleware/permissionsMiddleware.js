const AppError = require('../utils/appError');

// The middleware that checks the user's permission
exports.checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    // Ensure user is logged in and req.user is available
    if (!req.user) {
      return next(new AppError('Invalid token. Please log in again.', 401));
    }

    // Check if the required permission is in the user's permissions array
    if (
      !req.user.permissions ||
      !req.user.permissions.includes(requiredPermission)
    ) {
      return next(
        new AppError('You do not have permission to perform this action.', 403)
      );
    }

    next(); // Allow access if the user has permission
  };
};

module.exports = exports.checkPermission;
