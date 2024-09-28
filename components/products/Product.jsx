'use client'
import React, { useEffect, useState } from 'react'
import styles from "./Product.module.scss";
import LeftMenu from './LeftMenu/LeftMenu';
import { options1,categories } from '@/data/DropDown';
import Dropdown from '../home/DropDown/DropDown';

export default function Product() {
    const [currentProduct,setCurrentProduct] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');


    const handleBrandChange = (event) => {
      setSelectedBrand(event.target.value);
    };

    const handleProductChange = (event)=>{
      setSelectedProduct(event.target.value)
    }
    useEffect(()=>{
      if( localStorage.getItem("currentProduct") == null){
        localStorage.setItem("currentProduct","PDA Accessories");
      }
      const value = localStorage.getItem("currentProduct");
      setCurrentProduct(value);
    },[]);

  return (
    <div className={styles.main}>
        <span className={styles.listing}>Home / Products /<b className={styles.textRed}> {currentProduct}</b></span>
        <div className={styles.topContent}>
        <h1 className={styles.heading}>{currentProduct}</h1>
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
            <div className={styles.dropDownContainer}>
            <div className={styles.dropDown}>
                <Dropdown 
                  label="Select Category"
                  value={selectedProduct}
                  onChange={handleProductChange}
                  options={categories}
                />
              </div>
              <div className={styles.dropDown}>
                <Dropdown 
                  label="Select Brand"
                  value={selectedBrand}
                  onChange={handleBrandChange}
                  options={options1}
                />
                </div>
            </div>
          </div>
          {/* eofpr */}
        </div>
    </div>
  )
}
