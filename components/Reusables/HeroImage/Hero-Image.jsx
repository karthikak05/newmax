import React from 'react'
import styles from "./HeroImage.module.scss";
import Image from 'next/image';
export default function HeroImage({image,heading,para,bg}) {
  return (
    <div className={styles.imageDiv} style={{ '--bg-image': `url(${bg})` }}>
        <div className={styles.text}>
            {heading}
            <p>{para}</p>
        </div>
        <div className={styles.imgContainer}>
            <Image src={`/${image}`} alt={`hero-${image}`} height={373} width={488}/>
        </div>
    </div>  
  )
}
