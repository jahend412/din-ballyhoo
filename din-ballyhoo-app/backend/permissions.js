const permissions = {
  // Comment Management
  'create-comment': 'Allows creating a comment',
  'delete-comment': 'Allows deleting comments',
  'edit-comment': 'Allows editing their own comments',
  'reply-comment': 'Allows replying to a comment',

  // Track Management
  'upload-track': 'Allows uploading a new track',
  'edit-track': 'Allows editing track details',
  'delete-track': 'Allows deleting a track',
  'view-track': 'Allows viewing tracks',

  // Album Management
  'create-album': 'Allows creating a new album',
  'edit-album': 'Allows editing an album',
  'delete-album': 'Allows deleting albums',
  'view-album': 'Allows viewing album details',

  // Show Management
  'create-show': 'Allows creating a new show',
  'edit-show': 'Allows editing show details',
  'delete-show': 'Allows deleting a show',
  'view-show': 'Allows viewing shows',

  // Webcast Management
  'create-webcast': 'Allows creating a webcast',
  'edit-webcast': 'Allows editing webcast details',
  'delete-webcast': 'Allows deleting webcasts',
  'view-webcast': 'Allows viewing webcasts',

  // Merch Management
  'add-merch': 'Allows adding new merchandise',
  'edit-merch': 'Allows editing merchandise',
  'delete-merch': 'Allows deleting merchandise',
  'view-merch': 'Allows viewing available merchandise',

  // Profile Management
  'edit-profile': 'Allows editing their own profile',
  'view-profile': "Allows viewing other users' profiles",

  // Admin-Specific
  'manage-users': 'Allows managing user accounts',
  'view-analytics': 'Allows viewing website analytics',
  'assign-roles': 'Allows assigning roles to users',

  // General
  'like-content': 'Allows liking tracks, albums, or webcasts',
  'donate-content': 'Allows donating to content creators',
  'download-content': 'Allows downloading tracks or albums',
  'view-dashboard': 'Allows viewing the admin or band member dashboard',

  // User Management
  'create-user': 'Allows creating a new user',
  'view-user': 'Allows viewing user details',
  'view-users': 'Allows viewing all users',
  'update-user': 'Allows updating user details',
  'delete-user': 'Allows deleting a user',
  'update-password': 'Allows updating their own password',
  'delete-own-account': 'Allows users to delete their own account',
  'reset-password': 'Allows resetting passwords',
  'forgot-password': 'Allows initiating a forgot password flow',

  // Profile Management
  'update-profile': 'Allows updating their own profile',
};

module.exports = permissions;
