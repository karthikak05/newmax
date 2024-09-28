import React from 'react';
import styles from "./products.module.scss";
import Main from '@/components/Categories/main/Main';
import FAQ from '@/components/Categories/FAQ/FAQ';
import ProductsHero from '@/components/Categories/ProductsHero/Hero';

const Products = () => {
    return (
        <main className={styles.main}>
            <ProductsHero/>   

            <section>
                <Main/>    
            </section> 

            <section>
                <FAQ/>
            </section>
        </main>
    );
};

export default Products;