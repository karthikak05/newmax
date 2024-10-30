'use client'
import React, { useEffect, useState } from 'react';
import styles from "./cartpage.module.scss";
import Total from '@/components/Cart/Total/Total';
import Product from '@/components/Cart/Product/product';
import RcProducts from '@/components/Cart/Recommended/RcProducts';
import CheckoutForm from '@/components/Cart/CheckoutForm/CheckoutForm';

const Cart = () => {
    const [isCheckedOut,setIsCheckedOut] = useState(false);

    const handleCheckedOut = (value)=>{
        setIsCheckedOut(value);
        localStorage.setItem("isCheckedOut", JSON.stringify(value));
    }

    useEffect(()=>{
        const checkout = localStorage.getItem("isCheckedOut");
        if( checkout !== null){
            setIsCheckedOut(JSON.parse(checkout));
        }else{setIsCheckedOut(checkout);}
        console.log(isCheckedOut)
    },[])

    return (
        <main className={styles.page}>
            {!isCheckedOut ? (
                <>
                    <section className={styles.main}>
                        <h1 className={styles.heading}>Your Cart, Your Spare Parts!</h1>
                        <p className={styles.subpara}>Review the items in your cart before proceeding to checkout. Make sure you've got everything you need to keep your devices running smoothly.</p>
                        <div className={styles.flexContainer}>
                            <Product/>
                            <Total handleCheckedOut={handleCheckedOut}/>
                        </div>
                    </section>

                    <div className={styles.recommended}>
                        <RcProducts/>
                    </div>
                </>
            ): (
                <div className={styles.checkout}>
                    <CheckoutForm handleCheckedOut={handleCheckedOut}/>
                </div>
            )}

        </main>
    );
};

export default Cart;