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

//   const removeFromCart = async () => {
//     await remove(name);
//   };

//   const addToCart = async (item) => {
//     const addItem = {
//       name,
//       price: numericPrice,
//       imageUrl: url,
//       timestamp: Date.now()
//     };
//     await add(addItem);
//   };

//   const handleQuantityChange = (e) => {
//     const newQuantity = e.target.value === "" ? "" : parseInt(e.target.value, 10); // Default to 1 if empty
//     setInputValues(newQuantity);

//     if (newQuantity > 0) {
//       setInputValues(newQuantity);
//       setError(""); // Reset error if the value is valid
//     } else if (newQuantity <= 0) {
//       setError("Value must be greater than 0"); // Display error message for invalid values
//     }
//   };

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
          {/* <div className={styles.btnMain}>
            <div className={styles.buttons}>
              <div className={styles.plus} onClick={addToCart}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                className={styles.inputBox}
                type="number" // Changed to number type for better validation
                value={inputValue}
                onChange={handleQuantityChange}
                placeholder="Enter quantity"
                min="1" // Prevents entering values less than 1 directly
              />
              <div className={styles.minus} onClick={removeFromCart}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19V5" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>} */}
          <div className={styles.btnContainer} onClick={handleCart}>
            <Button sx={{ textTransform: 'none' }} variant="contained" className={styles.cart}>Quick Add</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
