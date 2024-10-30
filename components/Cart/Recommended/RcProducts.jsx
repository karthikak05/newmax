'use client'
import React from 'react'
import styles from "./rc.module.scss";
import { recommended } from '@/data/Recommended';
import ProductContainer from '@/components/Reusables/ProductContainer/ProductContainer';

export default function RcProducts() {
  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>Recommended Products</h2>
      <div className={styles.itemsContainer}>
      {recommended.map((url,i)=>(
        <div className={styles.item} key={i}>
          <ProductContainer url={url}/>
        </div>
      ))}
      </div>
    </div>
  )
}
