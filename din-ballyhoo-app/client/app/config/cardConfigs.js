export const albumConfig = {
  imageField: "coverImage",
  titleField: "title",
  subtitleField: ["releaseDate"],
  detailField: "artist",
  linkField: "_id",
  linkBase: "/albums",
};

export const showConfig = {
  imageField: "coverImage",
  titleField: "title",
  subtitleField: "releaseDate",
  detailField: ["data", "location"],
  linkField: "_id",
  linkBase: "/shows",
};

export const webcastConfig = {
  imageField: "coverImage",
  titleField: "title",
  subtitleField: "releaseDate",
  detailField: ["location"],
  linkField: "_id",
  linkBase: "/webcasts",
};

export const newsConfig = {
  imageField: "coverImage",
  titleField: "title",
  subtitleField: "datePosted",
  detailField: ["content"],
  linkField: "_id",
  linkBase: "/news",
};
