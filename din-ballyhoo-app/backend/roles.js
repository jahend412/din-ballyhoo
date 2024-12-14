const permissions = require('./permissions');

const roles = {
  fan: [
    permissions['create-comment'],
    permissions['edit-profile'],
    permissions['like-content'],
    permissions['donate-content'],
    permissions['view-track'],
    permissions['view-album'],
    permissions['view-show'],
    permissions['view-merch'],
    permissions['view-webcast'],
  ],
  bandMember: [
    ...roles.fan, // Inherit Fan permissions
    permissions['upload-track'],
    permissions['edit-track'],
    permissions['create-album'],
    permissions['create-show'],
    permissions['create-webcast'],
    permissions['edit-show'],
    permissions['edit-webcast'],
    permissions['add-merch'],
    permissions['edit-merch'],
    permissions['view-dashboard'],
  ],
  admin: [
    ...roles.bandMember, // Inherit Band Member permissions
    permissions['delete-comment'],
    permissions['delete-track'],
    permissions['delete-album'],
    permissions['delete-show'],
    permissions['delete-webcast'],
    permissions['delete-merch'],
    permissions['manage-users'],
    permissions['assign-roles'],
    permissions['view-analytics'],
  ],
};

module.exports = roles;
