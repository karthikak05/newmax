import React from 'react';
import styles from "./about.module.scss";
import Companies from '@/components/home/Companies/Companies';
import Testimonials from '@/components/home/Testimonials/Testimonials';
import Main from '@/components/About/Main/Main';

const AboutUs = () => {
    return (
        <div className={styles.page}>
            <section>
                <Main/>
            </section>
            <section>
                <Companies/>
                <Testimonials/>
            </section>
        </div>
    );
};

export default AboutUs;