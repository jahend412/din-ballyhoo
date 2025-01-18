"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Card.module.css";

export default function Card({ data, config }) {
  const backendBaseUrl = "http://localhost:8080";
  const { imageField, titleField, subtitleField, linkField, linkBase } = config;

  // Ensure image path has a leading slash if it's a relative path
  const imagePath =
    data[imageField] && !data[imageField].startsWith("/")
      ? `/uploads/${data[imageField]}`
      : data[imageField];

  return (
    <Link className={styles.cardLink} href={`${linkBase}/${data[linkField]}`}>
      <div className={styles.card}>
        {/* Cover Image */}

        {imageField && data[imageField] && (
          <Image
            className={styles.cardImage}
            src={`${backendBaseUrl}${data.coverImage}`}
            alt={data[titleField] || "Album cover"}
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
      </div>
    </Link>
  );
}
