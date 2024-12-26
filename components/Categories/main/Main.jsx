'use client'
import React from 'react';
import styles from "./Main.module.scss";
import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { categoriesData } from '@/data/Categories';
import { commonStore } from '@/store/commonProps';

export default function Main() {
  const { setActiveHeader } = commonStore();

  const handleSetCategory = (category, i) => {
    setActiveHeader("Products");
    localStorage.setItem("currentCategory", category);
    localStorage.setItem("activeHeader", "Products");
    localStorage.setItem("activeIndex", i);
    localStorage.setItem("activeCompanyName", "Zebra");
    localStorage.setItem("selectedProduct", null);
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Shipping Visibility & Engagement</h1>
      <p className={styles.subpara}>
        Improved visibility in shipping enables efficient communication and smooth coordination, ensuring a streamlined process.
      </p>

      <div className={styles.gridContainer}>
        {categoriesData.map((data, i) => {
          const categoryLink = "/products";

          return (
            <div className={styles.item} key={i}>
              <div className={styles.imgContainer}>
                <Image src={data.image} alt={data.category} height={265} width={384} />
              </div>
              <h2>{data.category}</h2>
              <p>{data.para}</p>
              <Link 
                href={categoryLink} 
                onClick={() => handleSetCategory(data.category, i)} 
                passHref
              >
                <Button sx={{ textTransform: 'none' }} variant="contained" className={styles.containedBtn}>
                  View Products
                </Button>
              </Link>
            </div>
          );
        })}
        <div className={styles.viewMore}>
          <h2>View More</h2>
          <p>Explore a wider range of accessories and components for mobile computers, handheld devices, PDAs, and AIDC devices.</p>
          <Link href="/products" passHref>
            <div className={styles.svgContainer} onClick={() => setActiveHeader("Products")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="#B1B1B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
