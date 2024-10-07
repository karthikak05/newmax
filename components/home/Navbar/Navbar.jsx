'use client'
import React, { useState } from 'react'
import styles from "./Navbar.module.scss";
import Image from 'next/image';
import { navItems } from '@/data/NavItems';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter()
  const [activeIndex,setActiveIndex] = useState(null);

  const handleClick = (i)=>{
    const link = navItems[i].toLowerCase().replace(/\s+/g, '-');
    setActiveIndex(i);
    router.push(link);
  }

  const handleHome = ()=>{
    router.push("/");
    setActiveIndex(null)
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.imgContainer} onClick={handleHome} style={{cursor:"pointer"}}>
        <Image src="/logo.png" alt='logo' width={195} height={25}/>
      </div>
      <div className={styles.itemsContainer}>
        {navItems.map((item,i)=>(
          <p className={activeIndex === i ? styles.active : ''} key={i} onClick={()=>handleClick(i)}>{item}</p>
        ))}
      </div>
      <div className={styles.buttons}>
        <button className={styles.outlinedButton} onClick={()=>(router.push("/cart"))}>
          <span className={styles.svgContainer}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM15 15H7.29395C6.83288 15 6.60193 15 6.41211 14.918C6.24466 14.8456 6.09938 14.7291 5.99354 14.5805C5.8749 14.414 5.82719 14.1913 5.73274 13.7505L3.27148 2.26465C3.17484 1.81363 3.12587 1.58838 3.00586 1.41992C2.90002 1.27135 2.75477 1.15441 2.58732 1.08205C2.39746 1 2.16779 1 1.70653 1H1M4 4H16.8732C17.595 4 17.9555 4 18.1978 4.15036C18.41 4.28206 18.5653 4.48862 18.633 4.729C18.7104 5.00343 18.611 5.34996 18.411 6.04346L17.0264 10.8435C16.9068 11.2581 16.8469 11.465 16.7256 11.6189C16.6185 11.7547 16.4772 11.861 16.317 11.9263C16.1361 12 15.9211 12 15.4921 12H5.73047M6 19C4.89543 19 4 18.1046 4 17C4 15.8954 4.89543 15 6 15C7.10457 15 8 15.8954 8 17C8 18.1046 7.10457 19 6 19Z" 
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          Cart
        </button>
        <Button  sx={{ textTransform: 'none' }} variant="contained" className={styles.containedBtn}>Contact Us</Button>
      </div>
    </nav>
  )
}
