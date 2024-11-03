'use client'
import React, { useEffect, useState } from 'react'
import styles from "./Total.module.scss";
import { Button } from '@mui/material';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

export default function Total({handleCheckedOut}) {
  const { total } = useCartStore();
  const deliveryFee = 10;
  const Tax = 20;
  const ExpressFee = 5;
  const [currency,setCurrency] = useState("USD") 
  const [currencySymbol,setCurrecySymbol] = useState("$") ;
  const router = useRouter();
  const [deliveryType,setDeliveryType] = useState(null);
  const types = ['Free','Express'];

  useEffect(()=>{
    let currencyValue = localStorage.getItem("currency");
    let currencySymbol = localStorage.getItem("currencySymbol");
    if( currencyValue ) setCurrency(currencyValue);
    if( currencySymbol )  setCurrecySymbol(currencySymbol);  
  },[]);


  const calculateTotal = ()=>{
    let totalAmount = total + deliveryFee + Tax;
    if( deliveryType === 'Express') totalAmount += ExpressFee;
    return totalAmount;
  }

  useEffect(()=>{
    const delivery = localStorage.getItem("deliveryType");
    if( delivery!==null)  setDeliveryType(delivery);
    else{
      localStorage.setItem("deliveryType","Free");
      setDeliveryType("Free")
    }

  },[])
  return (
    <div className={styles.main}>
      <h2>Total</h2>

      <div className={styles.type}>
        {types.map((type,i)=>(
          <p key={i} className={type === deliveryType ? styles.active : ""} onClick={()=>setDeliveryType(type)}>{type}</p>
        ))}
      </div>

      <div className={styles.calc}>
        <div className={styles.subtotal}><h2>SubTotal</h2><p>${total}</p></div>
        <div className={styles.gray}><p>Delivery</p><p>+{currencySymbol}{deliveryFee}</p></div>
        {deliveryType === "Express" &&
          <div className={styles.gray}><p>Express</p><p>+{currencySymbol}{ExpressFee}</p></div>
        }
        <div className={styles.gray}><p>Tax</p><p>+{currencySymbol}{Tax}</p></div>
      </div>

      <div className={styles.total}><h2>Total</h2><p>${calculateTotal()}</p></div>

      <div className={styles.buttons}>
      <Button  sx={{ textTransform: 'none' }} variant="contained" className={styles.checkout} onClick={()=>(handleCheckedOut(true))} disabled={total===0}>Proceed To Checkout</Button>
      <Button  sx={{ textTransform: 'none' }} variant="outlined" className={styles.outlined} onClick={()=>router.push("/products")}>Continue Shoppping</Button>
      </div>
    </div>
  )
}
