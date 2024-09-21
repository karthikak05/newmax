'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.scss';
import { heroContent } from '@/data/Hero';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Hero() {
    const [activeContainer, setActiveContainer] = useState(0); // Start at 1 to show the first content
    const scrollContainer = useRef(null);

    const handleNext = () => {
        if (activeContainer < heroContent.length ) {
            scrollContainer.current.scrollBy({ left: 500, behavior: 'smooth' });
            setActiveContainer(activeContainer + 1);
        }else{
            setTimeout(() => {
                scrollContainer.current.scrollTo({ left: 0, behavior: 'auto' }); // Reset scroll position instantly
                setActiveContainer(0);
            }, 500);
        }
    };

    const handlePrev = () => {
        if (activeContainer > 0) {
            scrollContainer.current.scrollBy({ left: -500, behavior: 'smooth' });
            setActiveContainer(activeContainer - 1);
        }
    };

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         handleNext();
    //     }, 5000); 

    //     return () => clearInterval(intervalId);
    // }, [activeContainer]); 

    return (
        <div className={styles.hero}>
            <div className={styles.scrollContainer} ref={scrollContainer}>
                <div 
                    className={styles.arrowContainer}
                    onClick={handlePrev}
                >
                    <ArrowBackIosIcon fontSize="small" color="primary" className={styles.arrow} />
                </div>
                
                {heroContent.map((item, i) => (
                    <div className={styles.itemContainer} key={i}>
                        <div className={styles.content}>
                            {i === 0 && <h2>Welcome to <span className={styles.newmax}>NewMax</span></h2>}
                            <h1>{item.heading}</h1>
                            <p>{item.para}</p>
                        </div>
                    </div>
                ))}

                <div className={styles.itemContainer} key={"last"} style={{ opacity: 0 }}>
                    <div className={styles.content}>
                        <h1>{heroContent[heroContent.length - 1].heading}</h1>
                        <p>{heroContent[heroContent.length - 1].para}</p>
                    </div>
                </div>

                <div 
                    className={styles.arrowContainer2}
                    onClick={handleNext}
                >
                    <ArrowBackIosIcon fontSize="small" color="primary" className={styles.arrow2} />
                </div>
            </div>

            {/* glassyDiv */}
            <div className={styles.outerDiv}>
                <div className={styles.innerDiv}></div>
            </div>
        </div>
    );
}
