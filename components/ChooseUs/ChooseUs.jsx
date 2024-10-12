import React from 'react'
import styles from "./ChooseUs.module.scss";

export default function ChooseUs() {
    const content =[
        {
            heading : "Quality You Can Trust",
            para : "We prioritize quality in every product we offer. Our spare parts undergo rigorous testing and quality control processes to ensure they meet the highest industry standards.",
        },
        {
            heading : "Tailored Solutions",
            para : "We believe that every customer has unique requirements. Our custom procurement services are designed to understand your specific needs and provide tailored solutions that fit perfectly.",
        },
        {
            heading : "Timely Deliveryt",
            para : "In the fast-paced world of technology, time is of the essence. At Newmax, we are committed to delivering your orders promptly, so you can keep your projects on track and minimize downtime.",
        }
    ]
  return (
    <div className={styles.main}>
        <div className={styles.left}>
            <button>Our Values</button>
            <h2>Why Choose Us?</h2>
            <p className={styles.textGray}>At Newmax, we understand that choosing the right supplier for mobile and computer spare parts is crucial for your business and personal needs. Here’s why we stand out from the competition</p>
        </div>
        <div className={styles.right}>
            {content.map((item,i)=>(
                <div key={i} className={styles.item}>
                    <h3>{item.heading}</h3>
                    <p className={styles.textGray}>{item.para}</p>
                </div>
            ))}
        </div>
    </div>
  )
}
