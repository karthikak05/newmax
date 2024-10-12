import React from 'react'
import styles from "./ImageSection.module.scss";
import HeroImage from '@/components/Reusables/HeroImage/Hero-Image';

export default function ImageSection() {
  return (
    <div className={styles.main}>
        <HeroImage image="custom-bg.png" 
        heading={<h1 className={styles.heading}>Custom Procurement for <span className={styles.textRed}>Mobile</span> and <span className={styles.textRed}>Computer Parts</span></h1>}
        para="Get high-quality spare parts tailored to your needs. We source screens, batteries, chargers, and more, ensuring you find the right components on time."
        bg="/bg-custom-procurement.png"
        />
    </div>
  )
}
