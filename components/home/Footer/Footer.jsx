import React from 'react'
import styles from "./Footer.module.scss";
import { Button } from '@mui/material';
import Image from 'next/image';
import { footerData } from '@/data/Footer';

export default function Footer() {
  return (
    <div className={styles.footer}>
        {/* newsletter */}
        <div className={styles.newsletter}>
            <div className={styles.left}>
                <h3>Join Our News Letter</h3>
                <p>We will send you a one nice letter once per week.  No spam.</p>
            </div>
            <div className={styles.inputDiv}>
                <label htmlFor="email">
                <input type="text" id='email' name='email' placeholder='Your Email Address'/>
                </label>
                <Button sx={{ textTransform: 'none' }} variant='contained' className={styles.subscribeBtn}>Subscribe</Button>
            </div>
            <div className={styles.socials}>
                <h3>Follow us on</h3>
                <div className={styles.icons}>
                    <svg width="22" height="22" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.1562 1.90625C17.5312 3.21875 17.5312 6.03125 17.5312 6.03125C17.5312 6.03125 17.5312 8.8125 17.1562 10.1562C16.9688 10.9062 16.375 11.4688 15.6562 11.6562C14.3125 12 9 12 9 12C9 12 3.65625 12 2.3125 11.6562C1.59375 11.4688 1 10.9062 0.8125 10.1562C0.4375 8.8125 0.4375 6.03125 0.4375 6.03125C0.4375 6.03125 0.4375 3.21875 0.8125 1.90625C1 1.15625 1.59375 0.5625 2.3125 0.375C3.65625 0 9 0 9 0C9 0 14.3125 0 15.6562 0.375C16.375 0.5625 16.9688 1.15625 17.1562 1.90625ZM7.25 8.5625L11.6875 6.03125L7.25 3.5V8.5625Z" fill="#ACACAC"/>
                    </svg>
                    <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.3438 4.75C14.3438 4.90625 14.3438 5.03125 14.3438 5.1875C14.3438 9.53125 11.0625 14.5 5.03125 14.5C3.15625 14.5 1.4375 13.9688 0 13.0312C0.25 13.0625 0.5 13.0938 0.78125 13.0938C2.3125 13.0938 3.71875 12.5625 4.84375 11.6875C3.40625 11.6562 2.1875 10.7188 1.78125 9.40625C2 9.4375 2.1875 9.46875 2.40625 9.46875C2.6875 9.46875 3 9.40625 3.25 9.34375C1.75 9.03125 0.625 7.71875 0.625 6.125V6.09375C1.0625 6.34375 1.59375 6.46875 2.125 6.5C1.21875 5.90625 0.65625 4.90625 0.65625 3.78125C0.65625 3.15625 0.8125 2.59375 1.09375 2.125C2.71875 4.09375 5.15625 5.40625 7.875 5.5625C7.8125 5.3125 7.78125 5.0625 7.78125 4.8125C7.78125 3 9.25 1.53125 11.0625 1.53125C12 1.53125 12.8438 1.90625 13.4688 2.5625C14.1875 2.40625 14.9062 2.125 15.5312 1.75C15.2812 2.53125 14.7812 3.15625 14.0938 3.5625C14.75 3.5 15.4062 3.3125 15.9688 3.0625C15.5312 3.71875 14.9688 4.28125 14.3438 4.75Z" fill="#ACACAC"/>
                    </svg>
                    <svg width="22" height="22" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 4.40625C9.96875 4.40625 11.5938 6.03125 11.5938 8C11.5938 10 9.96875 11.5938 8 11.5938C6 11.5938 4.40625 10 4.40625 8C4.40625 6.03125 6 4.40625 8 4.40625ZM8 10.3438C9.28125 10.3438 10.3125 9.3125 10.3125 8C10.3125 6.71875 9.28125 5.6875 8 5.6875C6.6875 5.6875 5.65625 6.71875 5.65625 8C5.65625 9.3125 6.71875 10.3438 8 10.3438ZM12.5625 4.28125C12.5625 4.75 12.1875 5.125 11.7188 5.125C11.25 5.125 10.875 4.75 10.875 4.28125C10.875 3.8125 11.25 3.4375 11.7188 3.4375C12.1875 3.4375 12.5625 3.8125 12.5625 4.28125ZM14.9375 5.125C15 6.28125 15 9.75 14.9375 10.9062C14.875 12.0312 14.625 13 13.8125 13.8438C13 14.6562 12 14.9062 10.875 14.9688C9.71875 15.0312 6.25 15.0312 5.09375 14.9688C3.96875 14.9062 3 14.6562 2.15625 13.8438C1.34375 13 1.09375 12.0312 1.03125 10.9062C0.96875 9.75 0.96875 6.28125 1.03125 5.125C1.09375 4 1.34375 3 2.15625 2.1875C3 1.375 3.96875 1.125 5.09375 1.0625C6.25 1 9.71875 1 10.875 1.0625C12 1.125 13 1.375 13.8125 2.1875C14.625 3 14.875 4 14.9375 5.125ZM13.4375 12.125C13.8125 11.2188 13.7188 9.03125 13.7188 8C13.7188 7 13.8125 4.8125 13.4375 3.875C13.1875 3.28125 12.7188 2.78125 12.125 2.5625C11.1875 2.1875 9 2.28125 8 2.28125C6.96875 2.28125 4.78125 2.1875 3.875 2.5625C3.25 2.8125 2.78125 3.28125 2.53125 3.875C2.15625 4.8125 2.25 7 2.25 8C2.25 9.03125 2.15625 11.2188 2.53125 12.125C2.78125 12.75 3.25 13.2188 3.875 13.4688C4.78125 13.8438 6.96875 13.75 8 13.75C9 13.75 11.1875 13.8438 12.125 13.4688C12.7188 13.2188 13.2188 12.75 13.4375 12.125Z" fill="#ACACAC"/>
                    </svg>
                    <svg width="22" height="22" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 1C13.3125 1 14 1.6875 14 2.5V13.5C14 14.3438 13.3125 15 12.5 15H8.1875V10.25H10L10.3438 8H8.1875V6.5625C8.1875 5.9375 8.5 5.34375 9.46875 5.34375H10.4375V3.4375C10.4375 3.4375 9.5625 3.28125 8.6875 3.28125C6.9375 3.28125 5.78125 4.375 5.78125 6.3125V8H3.8125V10.25H5.78125V15H1.5C0.65625 15 0 14.3438 0 13.5V2.5C0 1.6875 0.65625 1 1.5 1H12.5Z" fill="#ACACAC"/>
                    </svg>
                </div>
            </div>
        </div>

        {/* footer */}
        <div className={styles.main}>
            {/* logo */}
            <div className={styles.logoDiv}>
                <div className={styles.imgContainer}><Image src="/logo.png" alt='logo' width={195} height={25}/></div>
                <p>Enhance your skills with our quality spare parts and training programs. Need assistance? We&apos;re here to help!</p>
            </div>
            {/* listings */}
            {footerData.map((data,i)=>(
                <div key={i} className={styles.itemContainer}>
                    <h3 className={styles.itemHeading}>{data.heading}</h3>
                    {data.items.map((item,index)=>(
                        <p key={index} className={styles.itemText}>{item}</p>
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}
