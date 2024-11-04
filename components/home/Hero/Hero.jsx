'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.scss';
import { heroContent } from '@/data/Hero';
import { Button } from '@mui/material';
import { categories } from '@/data/DropDown';
import Dropdown from '../DropDown/DropDown';
import { useRouter } from 'next/navigation';

export default function Hero() {
    const router = useRouter();
    const [activeContainer, setActiveContainer] = useState(0);
    const scrollContainer = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');

    const handleCategory = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleProduct = (event) => {
        setSelectedProduct(event.target.value);
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

    const handleClick = ()=>{
        if( typeof window !== undefined){
            localStorage.setItem('currentCategory',selectedCategory);
        }
        router.push("/products")
    }

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
                    <div className={styles.itemContainer} key={i} style={{ backgroundImage: `url(${item.image})` }}>
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
                                label="Select Category"
                                value={selectedCategory}
                                onChange={handleCategory}
                                options={categories}
                            />
                        </div>
                        {/* <div className={styles.dropDown}>
                            <Dropdown 
                                label="Select Product"
                                value={selectedProduct}
                                onChange={handleProduct}
                                options={options1}
                            />
                        </div> */}
                        <Button  sx={{ textTransform: 'none' }} variant="contained" className={`${styles.containedBtn} ${styles.searchBtn}`} onClick={handleClick}>Search</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
