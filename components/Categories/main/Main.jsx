'use client'
import React from 'react'
import styles from "./Main.module.scss";
import { Button } from '@mui/material';
import Image from 'next/image';
import { categoriesData } from '@/data/Categories';
import { useRouter } from 'next/navigation';

export default function Main() {
  const router = useRouter()

  const handleClick = (category)=>{
    localStorage.setItem("currentCategory",category);
    router.push("/products");
  }
  return (
    <div className={styles.main}>
        <h1 className={styles.heading}>Shipping Visibility & Engagement</h1>
        <p className={styles.subpara}>Improved visibility in shipping enables efficient communication and smooth coordination, ensuring a streamlined process.</p>

        <div className={styles.gridContainer}>
            {categoriesData.map((data,i)=>(
                <div className={styles.item} key={i}>
                    <div className={styles.imgContainer}><Image src={data.image} alt={data.category} height={265} width={384}/></div>
                    <h2>{data.category}</h2>
                    <p>{data.para}</p>
                    <div onClick={()=>handleClick(data.category)}>
                    <Button sx={{ textTransform: 'none' }} variant="contained" className={styles.containedBtn}>View Products</Button>
                    </div>
                </div>
            ))}
            <div className={styles.viewMore}>
              <h2>View More</h2>
              <p>Explore a wider range of accessories and components for mobile computers, handheld devices, PDAs, and AIDC devices.</p>
              <div className={styles.svgContainer} onClick={()=>(router.push("/products"))}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="#B1B1B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
        </div>
    </div>
  )
}
