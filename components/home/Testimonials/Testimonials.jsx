'use client'
import React, { useState } from 'react'
import styles from "./Testimonials.module.scss"
import { testimonials } from '@/data/Testimonials';
import Image from 'next/image';

export default function Testimonials() {
    const [active,setActive] = useState(1);
    const handleActive=(i)=>{
        setActive(i)
    }
  return (
    <div className={styles.testimonials}>
        <h1 className={styles.heading}>Testimonials</h1>
        <p className={styles.subpara}>Discover how <span className={styles.textRed}>NewMax</span> has empowered customers with quality parts and valuable training experiences.</p>
        <div className={styles.outerContainer}>
            {testimonials.map((item,i)=>(
                <div key={i}  className={`${styles.item} ${i === active ? styles.active : ''}`}>
                    <h1 className={styles.quote}>“</h1>
                    <p className={styles.feedback}>{item.feedback}</p>
                    <div className={styles.imgContainer}><Image src={item.image} alt="feedback-image" height={94} width={94}/></div>
                </div>
            ))}
        </div>
    </div>
  )
}
