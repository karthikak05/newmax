import React from 'react'
import styles from "./contactUs.module.scss";
import CheckoutForm from '@/components/Cart/CheckoutForm/CheckoutForm';
import Companies from '@/components/home/Companies/Companies';
import FAQ from '@/components/Categories/FAQ/FAQ';
import RcProducts from '@/components/Cart/Recommended/RcProducts';
import ContactForm from '@/components/Contact/ContactForm';

export default function page() {
  return (
    <div className={styles.page}>
        <section>
            <ContactForm/>
            <div className={styles.Recommended}>
                <h2>Recommended Products</h2>
                <RcProducts/>
            </div>
        </section>
        <section>
            <Companies/>
            <FAQ/>
        </section>
    </div>
  )
}
CheckoutForm