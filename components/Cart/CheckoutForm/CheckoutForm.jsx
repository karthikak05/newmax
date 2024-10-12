import React from 'react';
import styles from './CheckoutForm.module.scss';
import Image from 'next/image';

export default function CheckoutForm({ handleCheckedOut }) {
  return (
    <div className={styles.form}>
      <div className={styles.left}>
        <div className={styles.content}>
          <div className={styles.return} onClick={()=>handleCheckedOut(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12L8 17M3 12L8 7M3 12H21" stroke="red" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Return to Cart</p>
          </div>
          <h2 className={styles.subHeading}>Complete Your Order Details</h2>
          <p>Please fill out the form below with your details to place your order. We’ll use this information to process your purchase and ensure a smooth delivery. Your details are safe with us and will only be used to fulfill your order.</p>
        </div>
        <div className={styles.imgContainer}>
          <Image src="/products-hero.png" alt="checkout-image" height={265} width={384} />
        </div>
      </div>

      {/* Form Section */}
      <div className={styles.right}>
        <form className={styles.checkoutForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name <span>*</span></label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email <span>*</span></label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="mobile">Mobile Number <span>*</span></label>
              <input type="text" id="mobile" placeholder="Enter your mobile number" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="shippingAddress">Shipping Address <span>*</span></label>
              <input type="text" id="shippingAddress" placeholder="Enter your shipping address" />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">City <span>*</span></label>
              <input type="text" id="city" placeholder="Enter your city" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="zipCode">Zip Code <span>*</span></label>
              <input type="text" id="zipCode" placeholder="Enter your zip code" />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
}
