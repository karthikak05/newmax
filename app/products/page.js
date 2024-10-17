'use client';
import React from 'react';
import styles from "./products.module.scss";
import Product from '../../components/products/Product';

export const metadata = {
    title: "Products",
    description: "All Mobile and Computer accessories in one place",
  };
  

const Products = () => {
    return (
        <main className={styles.page}>
            <section>
                <Product/>
            </section>
        </main>
    );
};

export default Products;