// Card.js
import React from 'react';
import styles from './Card.module.css';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';

const Card = () => {
  return (
    <div className={styles.card}>
    <span className={styles.spanblock}> <AddToDriveIcon style={{ width: '50px', height: '50px' }} />
</span>
    <strong>Composable</strong>
    <p className={styles.text}>Quickly build your charts with decoupled, reusable React components.</p>
    </div>
  );
};

export default Card;
