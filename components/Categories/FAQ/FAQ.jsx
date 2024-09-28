'use client'
import React, { useState } from 'react';
import styles from "./FAQ.module.scss";
import { FAQS } from '@/data/FAQ';

export default function FAQ() {
    const [toggledQues, setToggledQues] = useState(0); 

    const handleToggle = (i) => {
        if (toggledQues === i) {
            setToggledQues(null); 
        } else {
            setToggledQues(i); 
        }
    };

    return (
        <div className={styles.faq}>
            <h1 className={styles.heading}>Frequently Asked Questions</h1>
            <p className={styles.subpara}>Everything you need to know about the product and billing. Can&apos;t find the answer you&apos;re looking for? Please chat with our friendly team.</p>
            <div className={styles.faqContainer}>
                {FAQS.map((item, i) => (
                    <div className={styles.quote} key={i} onClick={() => handleToggle(i)}>
                        <div className={styles.minus}>                     
                            {toggledQues === i ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 19V5" stroke="#f5f5f5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#F8F8F8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                        </div>
                        <h2>{item.question}</h2>

                        <div
                            className={`${styles.answer} ${
                                toggledQues === i ? styles.open : styles.closed
                            }`}
                        >
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
