import React from 'react'
import styles from "./Products.module.scss";
import { productContainerDetails } from '@/data/ProductContainer';
import ProductContainer from './ProductContainer';

export default function Products() {

    return (
    <div className={styles.topProducts}>
        <div className={styles.headingDiv}>
            <h1 className={styles.heading}>Top Selling Products</h1>
            <button>View More</button>
        </div>

        <div className={styles.gridContainer}>
            {productContainerDetails.map((product,i)=>(
                <ProductContainer product={product} key={i}/>
            ))}
        </div>
    </div>
  )
}
