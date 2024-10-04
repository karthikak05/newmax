'use client'
import React, { useEffect, useState } from 'react'
import styles from "./Total.module.scss";
import { Button } from '@mui/material';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

export default function Total() {
  const router = useRouter();
  const [deliveryType,setDeliveryType] = useState("free");
  const types = ['Free','Express']

  useEffect(()=>{
    const delivery = localStorage.getItem("deliveryType");
    if( delivery!==null)  setDeliveryType(delivery);
    else  localStorage.setItem("deliveryType","Free");

  },[])
  return (
    <div className={styles.main}>
      <h2>Total</h2>

      <div className={styles.type}>
        {types.map((type,i)=>(
          <p key={i} className={type === deliveryType ? styles.active : ""}>{type}</p>
        ))}
      </div>

      <div className={styles.calc}>
        <div className={styles.subtotal}><h2>SubTotal</h2><p>$100</p></div>
        <div className={styles.gray}><p>Delivery</p><p>$10.00</p></div>
        <div className={styles.gray}><p>Tax</p><p>+20.00</p></div>
      </div>

      <div className={styles.total}><h2>Total</h2><p>$80.00</p></div>

      <div className={styles.buttons}>
      <Button  sx={{ textTransform: 'none' }} variant="contained" className={styles.checkout}>Proceed To Checkout</Button>
      <Button  sx={{ textTransform: 'none' }} variant="outlined" className={styles.outlined} onClick={()=>router.push("/products")}>Continue Shoppping</Button>
      </div>
    </div>
  )
}
