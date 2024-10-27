
'use client'
import React, { useEffect, useState } from 'react'
import styles from "./Product.module.scss";
import LeftMenu from './LeftMenu/LeftMenu';
import Dropdown from '../home/DropDown/DropDown';
import useStorage from '@/firebase/useStorage'; 
import ProductContainer from '../Reusables/ProductContainer/ProductContainer';
import { LeftMenu as DropDownData } from '@/data/LeftMenu';

export default function Product() {
    const { fetchImages } = useStorage();
    const [currentCategory, setCurrentCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [activeIndex,setActiveIndex] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(DropDownData[activeIndex].models[0].label);
    const [imageUrls, setImageUrls] = useState([]);

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
  
    const handleProductChange = (e) => {
      setSelectedProduct(e.target.value);
    };  

    const handleActiveIndexChange = (index)=>{
      setActiveIndex(index);
      if (typeof window !== 'undefined') {
        localStorage.setItem("activeIndex", value);
      }
    }

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

        const activeIndex = localStorage.getItem("activeIndex");
        if(activeIndex !== null){
          setActiveIndex(activeIndex)
        }else{
          localStorage.setItem("activeIndex", 0);
        }
        
        const loadImages = async () => {
          let imageUrls = null;
          if( selectedProduct !==null){
            imageUrls = await fetchImages(`/Card Printer Accessories/${selectedProduct}`);
          }
          setImageUrls(imageUrls)
        };
    
        loadImages();
      }
    }, [selectedProduct]);
    

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
            handleActiveIndexChange={handleActiveIndexChange}
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
                  options={DropDownData[activeIndex].models}
                />
              </div>
            
            {/* grid */}
            <div className={styles.gridContainer}>
              {imageUrls.map((image, i) => (
                <div key={i}>
                  <ProductContainer url={image}/>
                </div>
              ))}
            </div>
          </div>

        </div>

    </div>
  )
}
