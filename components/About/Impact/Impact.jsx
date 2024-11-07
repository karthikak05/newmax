import React from 'react'
import styles from "./Impact.module.scss";
import Image from 'next/image';
export default function Impact() {
  const paras = [
    "Newmax delivers enhanced solutions worldwide",
    "Prioritizing feedback for continuous improvement.",
    "Dedicated team available around the clock.",
    "Leveraging the latest tech for efficient solutions.",
    "Ensuring quick and reliable delivery worldwide."
  ]
  return (
    <div className={styles.main}>
      <div className={styles.imgContainer}>
        <div className={styles.circle}></div>
        <Image src="/impact.jpeg" alt='impact-image' height={500} width={600}/>
      </div>
      <div className={styles.right}>
        <h2 className={styles.subHeading}>Impact that we created!</h2>
        <p>At Newmax, our commitment to delivering top-quality mobile and computer spare parts has transformed the way people approach device repairs and upgrades.</p>
        <div className={styles.numbers}>
        <p><span>120+</span> <br />Countries</p>
        <p><span>1000+</span> <br />Customers</p>
        <p><span>3000+</span> <br />Products</p>
        </div>
        <div className={styles.itemsWrapper}>
          {paras.map((para,i)=>(
             <div className={styles.item} key={i}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.4775 0 0 4.4775 0 10C0 15.5225 4.4775 20 10 20C15.5225 20 20 15.5225 20 10C20 4.4775 15.5225 0 10 0ZM15.5892 8.08917L9.28917 14.3892C9.1325 14.5458 8.92083 14.6333 8.7 14.6333C8.47917 14.6333 8.26667 14.5458 8.11083 14.3892L5.23333 11.5117C4.9075 11.1858 4.9075 10.6592 5.23333 10.3333C5.55917 10.0075 6.08583 10.0075 6.41167 10.3333L8.7 12.6217L14.4108 6.91083C14.7367 6.585 15.2633 6.585 15.5892 6.91083C15.915 7.23667 15.915 7.76333 15.5892 8.08917Z" fill="#F93822"/>
              </svg>
              <p>{para}</p>
             </div>
          ))}
        </div>
      </div>
    </div>
  )
}
