'use client';
import React from 'react';
import styles from "./products.module.scss";
import Product from '../../components/products/Product';

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