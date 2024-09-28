'use client'
import React, { useState } from 'react'
import styles from "./Products.module.scss";
import { productContainerDetails } from '@/data/ProductContainer';
import ProductContainer from './ProductContainer';
import Dropdown from '../DropDown/DropDown';
import { options1 } from '@/data/DropDown';

export default function Products() {
    const [selectedValue, setSelectedValue] = useState('');


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
    <div className={styles.topProducts}>
        <div className={styles.headingDiv}>
            <h1 className={styles.heading}>Top Selling Products</h1>
            <div className={styles.right}>
                <div className={styles.dropdown}>
                    <Dropdown 
                        label="Honeywell"
                        value={selectedValue}
                        onChange={handleChange}
                        options={options1}
                    />
                    </div>
                <button>View More</button>
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
