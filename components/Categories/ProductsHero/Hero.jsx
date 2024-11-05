import React from 'react'
import styles from "./Hero.module.scss";
import HeroImage from '@/components/Reusables/HeroImage/Hero-Image';

export default function ProductsHero() {
  return (
    <div className={styles.main}>
        <HeroImage 
            image="products-hero.png" 
            heading={<h1 className={styles.heading}>Quality Spare Parts for Your <span className={styles.textRed}>Mobile and Computer</span></h1>}
            para="Find the perfect spare parts for your mobile and computer devices. Our wide range includes screens, batteries, chargers, and more."
            bg="/bg-categories.png"  
        />
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
    </div>
  )
}
