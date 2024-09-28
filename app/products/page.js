import React from 'react';
import styles from "./products.module.scss";
import Hero from '@/components/products/ProductsHero/Hero';
import Main from '@/components/Categories/main/Main';
import FAQ from '@/components/Categories/FAQ/FAQ';

const Products = () => {
    return (
        <main className={styles.main}>
            <Hero/>   

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