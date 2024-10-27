'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from "./Product.module.scss";
import Image from 'next/image';
import LeftMenu from './LeftMenu/LeftMenu';
import Dropdown from '../home/DropDown/DropDown';
const useStorage = dynamic(() => import('@/firebase/useStorage'), { ssr: false });

export default function Product() {
    const { fetchImages } = useStorage();
    const [currentCategory, setCurrentCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [imageUrls, setImageUrls] = useState([])

    const handleBrandChange = (value) => {
      setSelectedBrand(value);
      if (typeof window !== 'undefined') {
          localStorage.setItem("activeCompanyIndex", value);
      }
    };
  
    const handleCategoryChange = (value) => {
      setCurrentCategory(value);
      if (typeof window !== 'undefined') {
          localStorage.setItem("currentCategory", value);
      }
    };
  
    const handleProductChange = (event) => {
      setSelectedProduct(event.target.value);
    };  

    useEffect(() => {
      if (typeof window !== 'undefined') {   
        const category = localStorage.getItem("currentCategory");
        if (category !== null) {
          setCurrentCategory(category);
        } else {
          setCurrentCategory("PDA Accessories");
          localStorage.setItem("currentCategory", "PDA Accessories");
        }
    
        const activeCompanyIndex = localStorage.getItem("activeCompanyIndex");
        if (activeCompanyIndex !== null) {
          setSelectedBrand(activeCompanyIndex);
        } else {
          setSelectedBrand(0);
          localStorage.setItem("activeCompanyIndex", "Zebra");
        }
    
        const loadImages = async () => {
          const imageUrls = await fetchImages("/Card Printer Accessories/HC100");
          setImageUrls(imageUrls);
        };
    
        loadImages();
      }
    }, [fetchImages]);
    

  return (
    <div className={styles.main}>
        <span className={styles.listing}>Home / Products /<b className={styles.textRed}> {currentCategory}</b></span>
        <div className={styles.topContent}>
        <h1 className={styles.heading}>{currentCategory}</h1>
        <p className={styles.para}>Experience real-time tracking, proactive communication, and efficient problem-solving for your PDA accessory shipments. Enjoy a seamless and hassle-free delivery experience.</p>
        </div>

        <div className={styles.mainContainer}>

          {/* Left Menu */}
          <div className={styles.leftMenu}>
            <LeftMenu 
            currentCategory={currentCategory}
            currentBrand={selectedBrand}
            handleBrandChange={handleBrandChange}
            handleCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Products */}
          <div className={styles.listings}>
            <h2>Find the product you need</h2>
            
            {/* Dropdown */}
            <div className={styles.dropDown}>
                <Dropdown 
                  label="Choose Products"
                  value={selectedProduct}
                  onChange={handleProductChange}
                  options={categories}
                />
              </div>
          </div>
        </div>
        <div>
          {imageUrls.map((image, i) => (
            <div key={i}>
              <Image src={image} alt={image} height={300} width={300} />
            </div>
          ))}
        </div>
    </div>
  )
}
