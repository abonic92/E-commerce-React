import React from "react";
import styles from "./styles.module.css";

interface CardListProps {
  children: React.ReactNode;
}

const CardList: React.FC<CardListProps> = ({ children }) => {
  return <div className={styles.cardList}>{children}</div>;
};

export default CardList;
