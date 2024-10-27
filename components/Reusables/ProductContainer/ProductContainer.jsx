import React, { useState } from 'react'
import styles from "./ProductContainer.module.scss";
import Image from 'next/image';
import { Button } from '@mui/material';
import { useCartStore } from '@/store/cartStore';
import { encryptData,decryptData } from '@/store/dataHandler';

export default function ProductContainer({ url }) {
  const { cartItems, total, add, remove, clearCart, isLoading } = useCartStore();
  const [currency,setCurrentCurrency] = useState("USD");
  const [currecySymbol,setCurrecySymbol] = useState("$");

  const handleCart = async () => {
    try {
      const item = {
        name,
        price,
        timestamp: Date.now() 
      };

      await add(item);

      const currentCart = useCartStore.getState().cartItems;
      const encryptedCart = encryptData(currentCart);
      if( typeof window !== undefined){
        localStorage.setItem("cart", encryptedCart);
      }
      // console.log('Stored Cart:', getStoredCart());
    } catch (error) {
      console.error('Error handling cart operation:', error);
    }
  };

  const getStoredCart = () => {
    const encryptedCart = localStorage.getItem("cart");
    if (encryptedCart) {
      const decryptedCart = decryptData(encryptedCart);
      return decryptedCart;
    }
    return null;
  }

  function extractNameAndPrice(url) {
    const decodedString = decodeURIComponent(url);
    const nameWithPrice = decodedString.substring(decodedString.lastIndexOf('/') + 1);
    const name = nameWithPrice.substring(0, nameWithPrice.lastIndexOf('(')).trim();
    
    let price = nameWithPrice.substring(nameWithPrice.lastIndexOf('(')+2,nameWithPrice.lastIndexOf(')'));
    // console.log(nameWithPrice+":"+price)
   
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
        <h2>{currency} {currecySymbol}{price}/<span> per quantity</span></h2>
      </div>
      <div className={styles.btnContainer} onClick={handleCart}><Button  sx={{ textTransform: 'none' }} variant="contained" className={styles.cart}>Add To Cart</Button></div>
    </div>
  )
}
