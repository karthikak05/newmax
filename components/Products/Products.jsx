import React from 'react'
import styles from "./Products.module.scss";

export default function Products() {
  return (
    <div className={styles.topProducts}>
        <div className={styles.headingDiv}>
            <h1 className={styles.heading}>Top Selling Products</h1>
            <button>View More</button>
        </div>

        
    </div>
  )
}
