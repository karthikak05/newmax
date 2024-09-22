import React from 'react'
import styles from "./ProductContainer.module.scss";
import Image from 'next/image';
import { Button } from '@mui/material';

export default function ProductContainer({product}) {

    return (
    <div className={styles.productContainer}>
        <div className={styles.content}>
            <div className={styles.imgContainer}><Image src={product.image} alt={product.description} height={265} width={384}/></div>
            <h2>{product.name}</h2>
            <p className={styles.textGray}>{product.description}</p>
            <p className={styles.price}><b>USD $ {product.price}</b></p>
            <div className={styles.btnContainer}>
                <button className={styles.outlinedButton}>Know More</button>
                <Button  sx={{ textTransform: 'none' }} variant="contained" className={styles.containedBtn}>Add to Cart</Button>
            </div>
        </div>
        
    </div>
  )
}
