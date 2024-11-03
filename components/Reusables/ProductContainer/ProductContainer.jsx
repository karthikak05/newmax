import React, { useEffect, useState } from 'react'
import styles from "./ProductContainer.module.scss";
import Image from 'next/image';
import { Button } from '@mui/material';
import { useCartStore } from '@/store/cartStore';
import { encryptData,decryptData } from '@/store/dataHandler';

export default function ProductContainer({ url }) {
  const { add, remove, clearCart, isLoading } = useCartStore();
  const [currency,setCurrentCurrency] = useState("USD");
  const [currecySymbol,setCurrecySymbol] = useState("$");

  useEffect(()=>{
    const currency = localStorage.getItem("currency");
    if (currency !== null) {
      setCurrentCurrency(currency);
    } else {
      setCurrentCurrency("USD");
      localStorage.setItem("currency", "USD");
    };

    const storedSymbol = localStorage.getItem("currencySymbol");
    if (storedSymbol !== null) {
        setCurrecySymbol(storedSymbol);
    } else {
        setCurrecySymbol("$");
        localStorage.setItem("currencySymbol", "$");
    }
  },[])

  const handleCart = async () => {
    try {
      const item = {
        name,
        price:numericPrice,
        imageUrl: url,
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

  function extractNameAndPrice(url) {
    const decodedString = decodeURIComponent(url);
    const nameWithPrice = decodedString.substring(decodedString.lastIndexOf('/') + 1);
    const name = nameWithPrice.substring(0, nameWithPrice.lastIndexOf('(')).trim();
    
    let price = nameWithPrice.substring(nameWithPrice.lastIndexOf('(')+2,nameWithPrice.lastIndexOf(')'));
    let numericPrice = '';
    for (let ch of price) {
        if (!isNaN(ch) && ch !== ' ') { 
            numericPrice += ch;
        }
    }   
    return { name, numericPrice };
  }

  const { name, numericPrice } = extractNameAndPrice(url);

  return (
    <div className={styles.main}>
      <div className={styles.imgContainer}>
        <Image src={url} alt="product-image" height={300} width={300} />
      </div>
      <div className={styles.content}>
        <p>{name}</p>
        <h2>{currency} {currecySymbol}{numericPrice}/<span> per quantity</span></h2>
      </div>
      <div className={styles.btnContainer} onClick={handleCart}><Button  sx={{ textTransform: 'none' }} variant="contained" className={styles.cart}>Add To Cart</Button></div>
    </div>
  )
}
