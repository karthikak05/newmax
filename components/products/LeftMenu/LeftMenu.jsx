'use client'
import React, { useState } from 'react'
import styles from "./LeftMenu.module.scss";
import { options1 } from '@/data/DropDown';

export default function LeftMenu() {
    const [activeIndex,setactiveIndex] = useState(0);
    
  return (
    <div className={styles.main}>
        <h1>PDA Accessories</h1>
        <ul>
            {options1.map((item,i)=>(
                <li className={i === activeIndex ? `${styles.active}` : ""} key={i}>{item.label}</li>
            ))}
        </ul>
    </div>
  )
}
