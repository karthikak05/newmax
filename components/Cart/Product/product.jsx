'use client'
import React, { useEffect, useState } from 'react'
import styles from "./product.module.scss";
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';

export default function Product() {
  const { cartItems, add, remove, updateQuantity } = useCartStore();
  const [currency,setCurrency] = useState("USD") 
  const [currencySymbol,setCurrecySymbol] = useState("$") ;
  const [error,setError] = useState("")

  useEffect(()=>{
    let currencyValue = localStorage.getItem("currency");
    let currencySymbol = localStorage.getItem("currencySymbol");
    if( currencyValue ) setCurrency(currencyValue);
    if( currencySymbol )  setCurrecySymbol(currencySymbol);  
  },[])

  const removeFromCart = async(item)=>{
    await remove(item.name);
  }
  const addToCart = async(item)=>{
    await add(item);
  };
  const handleQuantityChange = (e, itemName) => {
    const newQuantity = parseInt(e.target.value, 10);
    // if( newQuantity <1 )  return;
    if (newQuantity > 0) {
      updateQuantity(itemName, newQuantity);
      setError("");
    }else{
      setError("Value must be greater than 0")
    }
  };
  

  return (
    <div className={styles.main}>
        <h2 className={styles.heading}>Cart Details</h2>
      <div className={styles.itemsContainer}>
        {cartItems.length === 0 ? (
          <h2 className={styles.empty}>No items in cart.<br/>Please add some products and come back.</h2>
        ): (
            cartItems.map((item,i)=>(
            <div className={styles.item} key={i}>
                <div className={styles.imgContainer}><Image src={item.imageUrl} alt={item.name} height={150} width={150}/></div>
                <div className={styles.contentMain}>
                  <div>
                  <p className={styles.name}>{item.name}</p>
                  <h2 className={styles.pricing}>{currency} {currencySymbol}{item.price}/<span> per quantity</span></h2>
                  </div>
                  <div className={styles.buttons}>
                    <div className={styles.plus} onClick={()=>addToCart(item)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <input
                      className={styles.inputBox}
                      type="text"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e, item.name)}
                    />
                    <div className={styles.minus} onClick={()=>removeFromCart(item)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 19V5" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className={styles.subTotal}>
                  <p>SubTotal</p>
                  <p className={styles.price}>{currency} {currencySymbol}{item.price*item.quantity}</p>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
