'use client'
import React, { useState } from 'react';
import styles from "./LeftMenu.module.scss";
import { LeftMenu } from '@/data/LeftMenu';

export default function LeftMenuComponent() {
    const [activeCategory, setActiveCategory] = useState(0); 

    const handleCategoryClick = (index) => {
        setActiveCategory(index);
    };

    return (
        <div className={styles.main}>
            {LeftMenu.map((category, index) => (
                <div key={index} className={styles.category}>
                    <div className={styles.headingContainer}
                    onClick={() => category.companies.length > 0 && handleCategoryClick(index)}
                    >
                        <h1 
                            className={index === activeCategory ? `${styles.activeCategory}` : ""}
                        >
                            {category.heading}
                        </h1>
                        {category.companies.length > 0 && (
                            <span className={`${styles.arrow} ${index === activeCategory ? styles.activeArrow : ""}`}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 9L10 12L7 9M19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10Z" stroke="#212121" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                        )}
                    </div>
                    {index === activeCategory && (
                        <ul className={styles.companyList}>
                            {category.companies.map((company, i) => (
                                <li key={i} className={styles.companyItem}>
                                    {company}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}
