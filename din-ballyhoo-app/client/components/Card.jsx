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
          className={styles.card - image}
          src={data[imageField]}
          alt={data[titleField]}
          width="300"
          height="300"
        />
      )}
      <div className={styles.card - content}>
        <h2 className={styles.card - title}>{titleField}</h2>
        <h3 className={styles.card - subtitle}>{subtitleField}</h3>
        <ul className={styles.card - details}>
          {detailField.map((field) => (
            <li key={field}>{data[field]}</li>
          ))}
        </ul>
        {linkField && (
          <Link
            href={`${linkBase}/${data[linkField]}`}
            className={styles.card - link}
          >
            {" "}
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
