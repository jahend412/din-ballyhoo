import Image from "next/image";
import Link from "next/link";
import styles from "./Card.module.css";

export default function Card({ data, config }) {
  const {
    imageField,
    titleField,
    subtitleField,
    detailField,
    linkField,
    linkBase,
  } = config;

  // Ensure image path has a leading slash if it's a relative path
  const imagePath =
    data[imageField] && !data[imageField].startsWith("/")
      ? `/uploads/${data[imageField]}`
      : data[imageField];

  return (
    <div className={styles.card}>
      {imageField && data[imageField] && (
        <Image
          className={styles.cardImage}
          src={`http://localhost:8080/${data.coverImage}`} // Use absolute path for image
          alt={data[titleField] || "Card image"} // Default alt if titleField is not found
          width="300"
          height="300"
        />
      )}
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{data[titleField]}</h2>
        <h3 className={styles.cardSubtitle}>{data[subtitleField]}</h3>
        <ul className={styles.cardDetails}>
          {detailField.map((field) => (
            <li key={field}>{data[field]}</li>
          ))}
        </ul>
        {linkField && (
          <Link
            href={`${linkBase}/${data[linkField]}`}
            className={styles.cardLink}
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
