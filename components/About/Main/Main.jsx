import React from 'react'
import styles from "./Main.module.scss";
import Image from 'next/image';

export default function Main() {
    const paras = [
        {
            heading : "Our Mission",
            paras: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Parturient lorem purus justo, ultricies. Sollicitudin odio elementum urna placerat lacus, vulputate. Non malesuada viverra et ultrices cras. Tincidunt tempor, blandit augue ac feugiat. Praesent arcu tempus ullamcorper quisque in. Magna fermentum, lacus, fermentum arcu.",
                "Vulputate pellentesque proin facilisis dignissim gravida sed faucibus nunc. Nunc eget pharetra, in vitae porta lacus. Elit in nisl, in quis nulla tellus suscipit id. Semper velit odio cras pretium tristique habitant. Elit eu penatibus congue orci turpis. Enim diam id."
            ]
        },
        {
            heading : "Our Story",
            paras: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Parturient lorem purus justo, ultricies. Sollicitudin odio elementum urna placerat lacus, vulputate. Non malesuada viverra et ultrices cras. Tincidunt tempor, blandit augue ac feugiat. Praesent arcu tempus ullamcorper quisque in. Magna fermentum, lacus, fermentum arcu.",
                "Vulputate pellentesque proin facilisis dignissim gravida sed faucibus nunc. Nunc eget pharetra, in vitae porta lacus. Elit in nisl, in quis nulla tellus suscipit id. Semper velit odio cras pretium tristique habitant. Elit eu penatibus congue orci turpis. Enim diam id."
            ]
        }
    ]
  return (
    <div className={styles.main}>
        <div className={styles.imageDiv}>
            <div className={styles.text}>
                <h1 className={styles.heading}>Empowering Your Tech Repairs <br/>with <span className={styles.textRed}>Quality Parts Solutions</span></h1>
                <p>At Newmax, we are dedicated to delivering top-quality mobile and computer spare parts, 
                    tailored to meet your needs. From screens to chargers and everything in between, our commitment to precision sourcing and customer satisfaction ensures that you always have access to the best components.</p>
            </div>
            <div className={styles.imgContainer}>
                <Image src="/aboutUs-hero.png" alt="hero-aboutus" height={373} width={488}/>
            </div>
        </div>


       {paras.map((para,i)=>(
         <div className={styles.textContainer} key={i}>
         <h2>{para.heading}</h2>
            {para.paras.map((p,inx)=>(
                <p className={styles.para} key={inx}>{p}</p>
            ))}
        </div>
       ))}
       
    </div>
  )
}
