import React from 'react'
import styles from "./Missions.module.scss";

export default function Missions() {
    const paras = [
        {
            heading : "Our Mission",
            paras: [
                "At Newmax, our mission is to empower individuals and businesses by providing access to high-quality mobile and computer spare parts. We strive to be a reliable partner in every repair journey, ensuring that our customers have the right tools and resources at their fingertips.",
                "We believe in fostering a community where knowledge is shared, and solutions are found, enabling our customers to take control of their technology needs."
            ]
        },
        {
            heading : "Our Story",
            paras: [
                "Newmax began as a vision to revolutionize the way people access mobile and computer spare parts. Founded by a passionate team of tech enthusiasts, we recognized the challenges faced by individuals and businesses in sourcing reliable components for their devices.",
                "From humble beginnings, we set out to create a platform that not only provides high-quality spare parts but also empowers users with the knowledge and skills to tackle their tech challenges."
            ]
        }
    ]
  return (
    <div className={styles.main}>
        {/* <div className={styles.left}> */}
            {paras.map((para,i)=>(
            <div className={styles.textContainer} key={i}>
            <h2>{para.heading}</h2>
                {para.paras.map((p,inx)=>(
                    <p className={styles.para} key={inx}>{p}</p>
                ))}
            </div>
             ))}
            {/* </div> */}
        {/* <div className={styles.imgContainer}>
            <div className={styles.circle}></div>
            <Image src="/Ceo.png" alt="ceo-image" height={500} width={450}/>
        </div> */}
    </div>
  )
}
