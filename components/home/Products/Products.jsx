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
    const [selectedValue, setSelectedValue] = useState('');


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if (typeof window !== 'undefined') {
            localStorage.setItem('currentCategory',event.target.value)   
        }
    };

    const handleClick = ()=>{
        if(selectedValue === ""){
            localStorage.setItem('currentCategory','PDA Accessories')
        }
        router.push("/products")
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
