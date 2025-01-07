// "use client";

// import { useEffect, useState } from "react";

// export default function AlbumPage(data, config) {
//   const { imageField, titleField, subtitleField, linkField, linkBase } = config;
//   const [album, setAlbum] = useState(null);
//   //   const [error, setError] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const albumId = router.query.id;

//     fetch(`/api/v1/albums/${albumId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === "success") {
//           setAlbum(data.data);
//         } else {
//           console.error("Failed to fetch album: Unexpected data structure");
//         }
//       })
//       .catch((err) => console.error("Failed to fetch album:", err));
//   }, []);

//   return (
//     <div>
//       <h1>{album.title}</h1>
//     </div>
//   );
// }
