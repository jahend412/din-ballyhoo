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
  subtitleField: "venue",
  detailField: ["data", "location"],
  linkField: "_id",
  linkBase: "/shows",
};

export const webcastConfig = {
  imageField: "coverImage",
  titleField: "title",
  subtitleField: "date",
  detailField: ["location"],
  linkField: "_id",
  linkBase: "/webcasts",
};
