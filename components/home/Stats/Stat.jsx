import React from 'react'
import styles from "./Stat.module.scss"
import { stats } from '@/data/Stats'
import Image from 'next/image'

export default function Stat() {
  return (
    <div className={styles.stats}>
        <h2 className={styles.subHeading}>World-class solutions for all industries</h2>
        <p>Extensive experience across different business fields.</p>

        <div className={styles.numbers}>
            <p><b>120+</b> Countries</p>
            <div className={styles.gradientDiv}></div>
            <p><b>1000+</b> Customers</p>
            <div className={styles.gradientDiv}></div>
            <p><b>3000+</b> Products</p>
        </div>

        <div className={styles.textContent}>
            <h2 className={styles.heading}>Enabling Visibility Engagement</h2>
            <p className={styles.textGray}>Enabling visibility and engagement empowers your team to communicate effectively and collaborate seamlessly, fostering a productive work environment where everyone is informed and involved.</p>
            <div className={styles.statsContents}>
                {stats.map((stat,i)=>(
                    <div className={styles.outerStat} key={i}>
                      <div className={styles.stat}>
                        <div className={styles.imgContainer}><Image src={stat.image} alt={stat.heading} height={80} width={50}/></div>
                        <h3>{stat.heading}</h3>
                        <p>{stat.para}</p>
                      </div>
                      {(i < stats.length-1 || i<1) && <div className={styles.gradientDiv}></div>}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
