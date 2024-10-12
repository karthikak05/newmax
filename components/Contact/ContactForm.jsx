import React from 'react'
import Image from 'next/image'
import styles from "./ContactForm.module.scss";

export default function ContactForm() {
  return (
        <div className={styles.form}>
            <div className={styles.left}>
            <div className={styles.content}>
                <h2 className={styles.subHeading}>Get in Touch with Us</h2>
                <p>Please fill out the form below with your details and inquiry. Our team will review your message and get back to you as soon as possible. Your information is secure and will only be used to respond to your query.</p>
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
                    <label htmlFor="city">City <span>*</span></label>
                    <input type="text" id="city" placeholder="Enter your city" />
                </div>
                </div>

                <div className={styles.desc}>
                    <label htmlFor="dessc">Description</label>
                    <div className={styles.textarea}>
                        <textarea name="desc" id="desc" placeholder='Enter description'></textarea>
                    </div>
                </div>

                <button type="submit" className={styles.submitBtn}>Contact Us</button>
            </form>
            </div>
        </div>
  )
}
