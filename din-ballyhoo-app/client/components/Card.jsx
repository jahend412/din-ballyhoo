"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Card.module.css";
import { use, useState } from "react";
import Cookies from "js-cookie";
import { FaHeart } from "react-icons/fa";
API_URL = process.env.BACKEND_URL;

export default function Card({
  data,
  config,
  entityType,
  entityId,
  isFavInit,
  showFavIcon,
}) {
  const [isFavorite, setIsFavorite] = useState(isFavInit);
  const [error, setError] = useState("");

  const { imageField, titleField, subtitleField, linkField, linkBase } = config;

  // Ensure image path has a leading slash if it's a relative path
  const imagePath =
    data[imageField] && !data[imageField].startsWith("/")
      ? `/${data[imageField]}`
      : data[imageField];

  const handleFavorite = async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    const method = isFavorite ? "DELETE" : "POST";
    const url = `${API_URL}/api/v1/favorites/${entityType}/${entityId}`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsFavorite((prev) => !prev); // Toggle favorite state
      } else {
        console.error("Failed to update favorite");
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <Link className={styles.cardLink} href={`${linkBase}/${data[linkField]}`}>
      <div className={styles.card}>
        {/* Cover Image */}

        {imageField && data[imageField] && (
          <Image
            className={styles.cardImage}
            src={`${backendBaseUrl}${imagePath}`}
            alt={data[titleField] || `Cover Image`}
            width={300}
            height={300}
            unoptimized // Disable image optimization for external URLs like Firebase
            priority
          />
        )}

        {/* Content Section */}
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>{data[titleField]}</h2>
          <h3 className={styles.cardSubtitle}>
            {new Date(data[subtitleField]).toDateString("en-US")}
          </h3>
        </div>
        {showFavIcon && (
          <div
            className={styles.heartIcon}
            onClick={handleFavorite}
            aria-label="Favorite"
          >
            <FaHeart color={isFavorite ? "red" : "gray"} size={24} />
          </div>
        )}
      </div>
    </Link>
  );
}
