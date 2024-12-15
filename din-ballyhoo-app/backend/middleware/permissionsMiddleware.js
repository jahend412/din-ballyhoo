const appError = require('../utils/appError');

const checkPermissions = (permissions) => {
  return (req, res, next) => {
    if (!req.user || !req.user.permissions.includes(permissions)) {
      return next(
        new appError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

module.exports = checkPermissions;
