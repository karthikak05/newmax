import React from 'react'
import styles from "./Hero.module.scss";
import Image from 'next/image';

export default function ProductsHero() {
  return (
    <div className={styles.main}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
        <div className={styles.content}>
            <h1 className={styles.heading}>Quality Spare Parts for Your <span className={styles.textRed}>Mobile and Computer</span></h1>
            <p>Find the perfect spare parts for your mobile and computer devices. Our wide range includes screens, batteries, chargers, and more.</p>
        </div>
        <div className={styles.imgContainer}>
            <Image src="/products-hero.png" alt="hero-section-products" height={373} width={488}/>
        </div>
    </div>
  )
}
