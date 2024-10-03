'use client'
import React, { useEffect, useState } from 'react'
import styles from "./Product.module.scss";
import LeftMenu from './LeftMenu/LeftMenu';
import { options1,categories } from '@/data/DropDown';
import Dropdown from '../home/DropDown/DropDown';

export default function Product() {
    const [currentCategory,setCurrentCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');


    const handleBrandChange = (event) => {
      setSelectedBrand(event.target.value);
    };

    const handleProductChange = (event)=>{
      setSelectedProduct(event.target.value)
    }
    useEffect(()=>{
      if( localStorage.getItem("currentCategory") == null){
        localStorage.setItem("currentCategory","PDA Accessories");
      }
      const value = localStorage.getItem("currentCategory");
      setCurrentCategory(value);
    },[]);

  return (
    <div className={styles.main}>
        <span className={styles.listing}>Home / Products /<b className={styles.textRed}> {currentCategory}</b></span>
        <div className={styles.topContent}>
        <h1 className={styles.heading}>{currentCategory}</h1>
        <p className={styles.para}>Experience real-time tracking, proactive communication, and efficient problem-solving for your PDA accessory shipments. Enjoy a seamless and hassle-free delivery experience.</p>
        </div>

        <div className={styles.mainContainer}>

          {/* leftmenu */}
          <div className={styles.leftMenu}>
            <LeftMenu />
          </div>

          {/* products */}
          <div className={styles.listings}>
            <h2>Find the product you need</h2>
            
            {/* dropdown */}
            <div className={styles.dropDown}>
                <Dropdown 
                  label="Choose Products"
                  value={selectedProduct}
                  onChange={handleProductChange}
                  options={categories}
                />
              </div>
            </div>
          {/* eofpr */}
        </div>
    </div>
  )
}
