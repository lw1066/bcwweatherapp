import React from 'react';
import styles from './NumberCard.module.css';

interface NumberCardProps {
  text: string;
  number: string;
}

const NumberCard: React.FC<NumberCardProps> = ({ text, number }) => {
  return (
    <div className={styles.card}>
      <div className={styles.text}>{text}</div>
      <div className={styles.number}>{number}</div>
    </div>
  );
};

export default NumberCard;
