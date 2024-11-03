'use client'
import React, { useState } from 'react'
import styles from "./Footer.module.scss";
import { Button } from '@mui/material';
import Image from 'next/image';
import { footerData } from '@/data/Footer';
import { useRouter } from 'next/navigation';
import CustomLoader from '@/components/Reusables/CustomLoader';
import { commonStore } from '@/store/commonProps';

export default function Footer() {
    const [email,setEmail] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { setActiveHeader } = commonStore();

    const handleSocials = (link)=>{
        window.open(link,'_blank');
    }
    const handleClick = (link,item)=>{
        localStorage.setItem('activeHeader',item);
        setActiveHeader(item)
        if(link!== ""){
            router.push(link)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = {
            email,
        }

        try {
            const response = await fetch('https://formspree.io/f/xkgnjppo', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
        
            if (response.ok) {
                setShowSuccessPopup(true);
            } else {
                throw new Error('EmailJS failed to send email');
            }
        } catch (error) {
            console.error("EmailJS error:", error);
        } finally {
            setIsLoading(false);
            setEmail("");
            setTimeout(() => setShowSuccessPopup(false), 3000);
        }

    };
  return (
    <div className={styles.footer}>
        {/* newsletter */}
        <div className={styles.newsletter}>
            <div className={styles.left}>
                <h3>Join Our News Letter</h3>
                <p>We will send you a one nice letter once per week.  No spam.</p>
            </div>
            {isLoading ? (
                <div className={styles.loader}>
                        <CustomLoader color="red"/>
                        <h2>Adding you to our subscribers list..</h2>
                </div>
            ):(
                <div className={styles.inputDiv}>
                    <form method='post' action='submit' onSubmit={handleSubmit}>
                            <label htmlFor="email">
                                <input type="text" id='email' name='email' placeholder='Your Email Address' onChange={()=>(setEmail(event.target.value))} required/>
                            </label>
                            <Button type='submit' sx={{ textTransform: 'none' }} variant='contained' className={styles.subscribeBtn}>Subscribe</Button>
                    </form>
                </div>
            )

            }
            <div className={styles.socials}>
                <h3>Follow us on</h3>
                <div className={styles.icons}>
                    {/* LINKEDIN */}
                    <svg xmlns="http://www.w3.org/2000/svg"width="25" height="25" viewBox="0 0 30 30" fill="none" onClick={()=>handleSocials("https://www.linkedin.com/company/newmax-barcode-parts/people/")}>
                        <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" fill="#ACACAC"></path>
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
                <div key={i} className={styles.itemContainer} onClick={()=>handleClick(data.link,data.headerName)}>
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
