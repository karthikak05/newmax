import React from 'react';
import styles from "./cartpage.module.scss";
import Total from '@/components/Cart/Total/Total';
import Product from '@/components/Cart/Product/product';
import RcProducts from '@/components/Cart/Recommended/RcProducts';

const Cart = () => {
    return (
        <main className={styles.page}>
        
            <section className={styles.main}>
                <h1 className={styles.heading}>Your Cart, Your Spare Parts!</h1>
                <p className={styles.subpara}>Review the items in your cart before proceeding to checkout. Make sure you've got everything you need to keep your devices running smoothly.</p>
                <div className={styles.flexContainer}>
                    <Product/>
                    <Total/>
                </div>
            </section>

            <div className={styles.recommended}>
                <h2>Recommended Products</h2>
                <RcProducts/>
            </div>
        </main>
    );
};

export default Cart;