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

  return (
    <div className={styles.card}>
      {imageField && data[imageField] && (
        <Image
          className={styles.cardImage}
          src={data[imageField]}
          alt={data[titleField]}
          width="300"
          height="300"
        />
      )}
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{titleField}</h2>
        <h3 className={styles.cardSubtitle}>{subtitleField}</h3>
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
            {" "}
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
