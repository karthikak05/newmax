import React from 'react'
import styles from "./Main.module.scss";
import HeroImage from '@/components/Reusables/HeroImage/Hero-Image';

export default function Main() {

  return (
    <div className={styles.main}>
        <HeroImage 
            image="aboutUs-hero.png" 
            heading={<h1 className={styles.heading}>Empowering Your Tech Repairs <br/>with <span className={styles.textRed}>Quality Parts Solutions</span></h1>}
            para="At Newmax, we are dedicated to delivering top-quality mobile and computer spare parts, tailored to meet your needs. From screens to chargers and everything in between, our commitment to precision sourcing and customer satisfaction ensures that you always have access to the best components."
            bg="/bg-about.png"
        /> 
    </div>
  )
}
