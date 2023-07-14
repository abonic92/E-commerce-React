import React from "react";
import styles from "./styles.module.css";

interface CardChildrenProps {
  image: string;
  title: string;
  price?: number;
  description?: string;
}

const CardChildren: React.FC<CardChildrenProps> = ({ image, title, price, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img src={image} alt={title} className={styles.cardImage} />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      {price && <p className={styles.cardPrice}>Price: {price}</p>}
      {description && <p className={styles.cardDescription}>{description}</p>}
    </div>
  );
};

export default CardChildren;
