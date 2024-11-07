import React from 'react';
import styles from "./procurement.module.scss"
import ImageSection from '@/components/custom-procurement/Image/ImageSection';
import Form from '@/components/custom-procurement/Form/Form';
import FAQ from '@/components/Categories/FAQ/FAQ';
import RcProducts from '@/components/Cart/Recommended/RcProducts';
const Procuerment = () => {
    return (
        <div className={styles.page}>
            <ImageSection/>

            <section>
                <Form/>
            </section>

            <section>
                <div>
                    <RcProducts/>
                </div>
                <FAQ/>
            </section>
        </div>
    );
};

export default Procuerment;