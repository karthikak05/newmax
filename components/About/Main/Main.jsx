import React from 'react'
import styles from "./Main.module.scss";
import Image from 'next/image';

export default function Main() {
  return (
    <div className={styles.main}>
        <div className={styles.text}>
            <h1 className={styles.heading}>Empowering Your Tech Repairs <br/>with <span className={styles.textRed}>Quality Parts Solutions</span></h1>
            <p>At Newmax, we are dedicated to delivering top-quality mobile and computer spare parts, 
                tailored to meet your needs. From screens to chargers and everything in between, our commitment to precision sourcing and customer satisfaction ensures that you always have access to the best components.</p>
        </div>
        <div className={styles.imgContainer}>
            <Image src="/aboutus-hero.png" alt="hero-aboutus" height={373} width={488}/>
        </div>
    </div>
  )
}
