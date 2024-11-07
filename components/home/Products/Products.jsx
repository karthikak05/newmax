'use client'
import React, { useState } from 'react'
import styles from "./Products.module.scss";
import { productContainerDetails } from '@/data/ProductContainer';
import ProductContainer from './ProductContainer';
import Dropdown from '../DropDown/DropDown';
import { Button } from '@mui/material';
import { categories } from '@/data/DropDown';
import {useRouter} from 'next/navigation'

export default function Products() {
    const router = useRouter()
    const [selectedValue, setSelectedValue] = useState('PDA Accessories');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleClick = ()=>{
        const categories = [
            'PDA Accessories',
            'Scanner Accessories',
            'Barcode Printer Accessories',
            'Card Printer Accessories',
            'Mobile Computers'
        ];        
        const activeIndex = categories.indexOf(selectedValue);
        localStorage.setItem('selectedProduct',null);
        if( typeof window !== undefined){
            localStorage.setItem('currentCategory',selectedValue);
            if(activeIndex === 0 || activeIndex=== 2){
                localStorage.setItem("activeCompanyName", "Zebra");
            }else{
                localStorage.setItem("activeCompanyName", null);
            }
            localStorage.setItem("activeIndex", activeIndex);
        }
        router.push("/products");
    };

    return (
    <div className={styles.topProducts}>
        <div className={styles.headingDiv}>
            <h1 className={styles.heading}>Top Selling Products</h1>
            <div className={styles.right}>
                <div className={styles.dropdown}>
                    <Dropdown 
                        label="Categories"
                        value={selectedValue}
                        onChange={handleChange}
                        options={categories}
                    />
                    </div>
                    <Button  sx={{ textTransform: 'none' }} variant="contained" className={styles.containedBtn} onClick={handleClick}>View More</Button>
            </div>
        </div>

        <div className={styles.gridContainer}>
            {productContainerDetails.map((product,i)=>(
                <ProductContainer product={product} key={i}/>
            ))}
        </div>
    </div>
  )
}
