import React, { useState } from 'react'
import styles from "./ProductContainer.module.scss";
import Image from 'next/image';
import { Button } from '@mui/material';

export default function ProductContainer({ url }) {
  const [currency,setCurrentCurrency] = useState("USD")
  function extractNameAndPrice(url) {
    const decodedString = decodeURIComponent(url);
    const nameWithPrice = decodedString.substring(decodedString.lastIndexOf('/') + 1);
    const name = nameWithPrice.substring(0, nameWithPrice.indexOf('(')).trim();
    
    const priceMatch = nameWithPrice.match(/\((\$\d+)\)/);
    const price = priceMatch ? priceMatch[1] : null;
    
    return { name, price };
  }

  const { name, price } = extractNameAndPrice(url);

  return (
    <div className={styles.main}>
      <div className={styles.imgContainer}>
        <Image src={url} alt="product-image" height={300} width={300} />
      </div>
      <div className={styles.content}>
        <p>{name}</p>
        <h2>{currency}{price}/<span> per quantity</span></h2>
      </div>
      <Button  sx={{ textTransform: 'none' }} variant="contained" className={styles.cart}>Add To Cart</Button>
    </div>
  )
}
