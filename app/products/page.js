'use client';
import React from 'react';
import styles from "./products.module.scss";
import dynamic from 'next/dynamic';
const Product = dynamic(
    ()=> import("../../components/products/Product"),
    {ssr: false}
)
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