import React from 'react';
import styles from "./Popover.module.scss";
import { getNameAndPrice } from '@/functions/getName';
import { useCartStore } from '@/store/cartStore';
import { encryptData } from '@/store/dataHandler';
import { Button } from '@mui/material';
import Image from 'next/image';

export default function Popover({ url ,handlePopped}) {
  const {  add } = useCartStore();
  const { name, numericPrice } = getNameAndPrice(url);

  const handleCart = async () => {
    try {
      const item = {
        name,
        price: numericPrice,
        imageUrl: url,
        timestamp: Date.now()
      };

      await add(item);

      const currentCart = useCartStore.getState().cartItems;
      const encryptedCart = encryptData(currentCart);
    } catch (error) {
      console.error('Error handling cart operation:', error);
    }
  };

  return (
    <div className={styles.bg}>
      <div className={styles.main}>
        <div onClick={() => handlePopped(null)} className={styles.close}>
          <svg width="52" height="52" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="red" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill='red' />
          </svg>
        </div>
        <div className={styles.imgContainer}>
          <Image src={url} alt="bg-cover" height={300} width={300} />
        </div>
        <div className={styles.content}>
          <h2>{name}</h2>
          <h3 className={styles.price}>USD ${numericPrice}/<span> per quantity</span></h3>
          <div className={styles.btnContainer} onClick={handleCart}>
            <Button sx={{ textTransform: 'none' }} variant="contained" className={styles.cart}>Quick Add</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
