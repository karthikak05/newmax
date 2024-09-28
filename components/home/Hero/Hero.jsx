'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.scss';
import { heroContent } from '@/data/Hero';
import { Button } from '@mui/material';
import { options1,options2 } from '@/data/DropDown';
import Dropdown from '../DropDown/DropDown';
export default function Hero() {
    const [activeContainer, setActiveContainer] = useState(0);
    const scrollContainer = useRef(null);
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');

    const handleChange1 = (event) => {
        setSelectedValue1(event.target.value);
    };

    const handleChange2 = (event) => {
        setSelectedValue2(event.target.value);
    };

    const handleNext = () => {
        if (activeContainer < heroContent.length) {
            scrollContainer.current.scrollBy({ left: 1000, behavior: 'smooth' });
            setActiveContainer(activeContainer + 1);
        }else{
            setTimeout(() => {
                scrollContainer.current.scrollTo({ left: 0, behavior: 'auto' }); 
                setActiveContainer(0);
            }, 500);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleNext();
        }, 5000); 

        return () => clearInterval(intervalId);
    }, [activeContainer]); 

    return (
        <div className={styles.hero}>
            <div className={styles.scrollContainer} ref={scrollContainer}>                
                {heroContent.map((item, i) => (
                    <div className={styles.itemContainer} key={i}>
                        <div className={styles.content}>
                            {i === 0 && <h2>Welcome to <span className={styles.newmax}>NewMax</span></h2>}
                            <h1>{item.heading}</h1>
                            <p>{item.para}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* glassyDiv */}
            <div className={styles.outerDiv}>
                <div className={styles.innerDiv}>
                    <h2>What are you looking for</h2>
                    <div className={styles.dropdownContainer}>
                        <div className={styles.dropDown}>
                            <Dropdown 
                                label="Select Brand"
                                value={selectedValue1}
                                onChange={handleChange1}
                                options={options1}
                            />
                        </div>
                        <div className={styles.dropDown}>
                            <Dropdown 
                                label="Select Product"
                                value={selectedValue2}
                                onChange={handleChange2}
                                options={options2}
                            />
                        </div>
                        <Button  sx={{ textTransform: 'none' }} variant="contained" className={`${styles.containedBtn} ${styles.searchBtn}`}>Search</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
