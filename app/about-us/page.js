import React from 'react';
import styles from "./about.module.scss";
import Companies from '@/components/home/Companies/Companies';
import Testimonials from '@/components/home/Testimonials/Testimonials';
import Main from '@/components/About/Main/Main';
import Impact from '@/components/About/Impact/Impact';
import Missions from '@/components/Missions/Missions';
import ChooseUs from '@/components/ChooseUs/ChooseUs';

const AboutUs = () => {
    return (
        <div className={styles.page}>
            <Main/>
            <Impact/>
            <ChooseUs/>
            
            <section>
                <Missions/>
            </section>

            <section>
                <Companies/>
                <Testimonials/>
            </section>
        </div>
    );
};

export default AboutUs;