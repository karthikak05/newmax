import React from 'react'
import styles from "./Companies.module.scss";
import Image from 'next/image';

export default function Companies() {
    const images = ["honeywell.png","zebra.jpeg","bluebird.png","uruvo.png","datalogic.png","chainway.jpeg","Newland.png","sunmi.png"]
  return (
    <div className={styles.companies}>
        <h1 className={styles.heading}>Partnering with the Best Brands</h1>
        <p>Delivering top-quality spare parts from industry-leading companies.</p>
        <div className={styles.gridContainer}>
        {images.slice(0, 4).map((image, i) => (
            <div className={styles.imgContainer} key={i}>
            <Image src={`/companies/${image}`} height={96} width={184} />
            </div>
        ))}

        <div className={styles.secondRow}>
            {images.slice(4, 8).map((image, i) => (
            <div className={styles.imgContainer} key={i}>
                <Image src={`/companies/${image}`} height={96} width={184} />
            </div>
            ))}
        </div>
        </div>
    </div>
  )
}
