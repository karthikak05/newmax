import React, { useEffect, useState } from 'react'
import styles from "./ProductContainer.module.scss";
import Image from 'next/image';
import { Button } from '@mui/material';
import { useCartStore } from '@/store/cartStore';
import { encryptData,decryptData } from '@/store/dataHandler';
import { getNameAndPrice } from '@/functions/getName';

export default function ProductContainer({ url,popover,isPopped,setIsPopped }) {
  const { add } = useCartStore();
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

  const { name, numericPrice } = getNameAndPrice(url);

  return (
    <div className={styles.main}>
      <div className={styles.imgContainer} onClick={()=>setIsPopped(url)}>
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
