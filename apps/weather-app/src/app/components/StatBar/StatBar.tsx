import React from 'react';
import styles from './StatBar.module.css';

interface StatBarProps {
  stat: number;
  text: string;
}

const StatBar: React.FC<StatBarProps> = ({ stat, text }) => {
  return (
    <div className={styles.statContainer}>
      <div className={styles.header}>
        <p className={styles.statText}>{text}</p>
        <p className={styles.statNumber}>{stat}%</p>
      </div>
      <div className={styles.percentage}>%</div>
      <div className={styles.barBackground}>
        <div className={styles.barFill} style={{ width: `${stat}%` }} />
      </div>
      <div className={styles.scale}>
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default StatBar;
