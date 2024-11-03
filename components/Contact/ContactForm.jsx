'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import styles from "./ContactForm.module.scss";
import CustomLoader from '../Reusables/CustomLoader';

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [city, setCity] = useState("");
    const [description, setDescription] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleReset = () => {
        setName("");
        setEmail("");
        setMobile("");
        setCity("");
        setDescription("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        // const data = {
        //     service_id: 'contact_us_newmax',
        //     template_id: 'contact_us_form',
        //     user_id: "XHmmT9b5Tw7bY1p2k",
        //     template_params: {
        //         name,
        //         from_mail: email,
        //         mobile,
        //         city,
        //         message: description
        //     }
        // };


        const data = {
            name,
            from_mail: email,
            mobile,
            city,
            message: description
        }
        try {
            setIsLoading(true);
            const response = await fetch('https://formspree.io/f/mbljgqzj', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            if (response.ok) {
                setShowSuccessPopup(true); 
            } else {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoading(false);
            handleReset();
            setShowSuccessPopup(true)
            setTimeout(() => {
                setShowSuccessPopup(false);
            }, 3000);
        }

    };
  return (
        <div className={styles.form}>
            {showSuccessPopup && (
                <div className={styles.popup}>
                    <h2>Mail Sent Successfully</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" id="tick" viewBox="0 0 400 400">
                    <path fill="white" d="m287.477 154.953-90.875 90.875-22.719 22.719-22.711-22.719-37.867-37.867 22.719-22.719 37.867 37.867 90.867-90.875z"></path>
                    <path fill="white" d="M77.344 207.891H14.063a7.5 7.5 0 0 1 0-15h63.281a7.5 7.5 0 0 1 0 15zm309.363 0h-63.27a7.499 7.499 0 0 1-7.5-7.5 7.5 7.5 0 0 1 7.5-7.5h63.27a7.5 7.5 0 0 1 7.5 7.5 7.5 7.5 0 0 1-7.5 7.5zM200.391 84.844a7.5 7.5 0 0 1-7.5-7.5V14.063a7.5 7.5 0 0 1 15 0v63.281a7.5 7.5 0 0 1-7.5 7.5zm0 309.854a7.5 7.5 0 0 1-7.5-7.5v-63.761a7.5 7.5 0 0 1 7.5-7.5c4.143 0 7.5 3.357 7.5 7.5v63.761a7.5 7.5 0 0 1-7.5 7.5zM332.588 339.2a7.481 7.481 0 0 1-5.304-2.196l-44.75-44.75a7.5 7.5 0 0 1 10.607-10.607l44.75 44.75a7.5 7.5 0 0 1-5.303 12.803zm-267.281-2.889a7.5 7.5 0 0 1-5.303-12.803l44.812-44.812a7.501 7.501 0 0 1 10.606 10.607L70.61 334.114a7.478 7.478 0 0 1-5.303 2.197zm218.667-218.712a7.5 7.5 0 0 1-5.304-12.803l44.743-44.743a7.5 7.5 0 0 1 10.607 10.606l-44.743 44.743a7.478 7.478 0 0 1-5.303 2.197zm-170.735 3.431a7.474 7.474 0 0 1-5.303-2.197L63.243 74.141a7.5 7.5 0 0 1 0-10.606 7.5 7.5 0 0 1 10.606 0l44.692 44.692a7.5 7.5 0 0 1-5.302 12.803z"></path>
                    <path fill="white" d="M153.926 93.927a7.502 7.502 0 0 1-6.97-4.727l-11.804-29.64a7.5 7.5 0 0 1 13.936-5.55l11.804 29.64a7.5 7.5 0 0 1-6.966 10.277zM85.85 162.845a7.47 7.47 0 0 1-2.648-.486l-26.409-9.975a7.499 7.499 0 0 1-4.366-9.666 7.499 7.499 0 0 1 9.666-4.366l26.409 9.975a7.499 7.499 0 0 1 4.366 9.666 7.503 7.503 0 0 1-7.018 4.852zM59.449 268.321a7.5 7.5 0 0 1-3.782-13.982l26.409-15.382a7.5 7.5 0 0 1 7.55 12.961L63.217 267.3a7.46 7.46 0 0 1-3.768 1.021zm77.648 79.726a7.5 7.5 0 0 1-6.936-10.349l11.667-28.43a7.498 7.498 0 0 1 9.786-4.091 7.5 7.5 0 0 1 4.091 9.786l-11.667 28.43a7.503 7.503 0 0 1-6.941 4.654zm127.271 0a7.503 7.503 0 0 1-6.883-4.514l-12.35-28.43a7.5 7.5 0 0 1 13.758-5.976l12.35 28.43a7.5 7.5 0 0 1-6.875 10.49zm75.878-84.153a7.488 7.488 0 0 1-2.974-.618l-25.32-10.953a7.5 7.5 0 1 1 5.955-13.767l25.32 10.953a7.5 7.5 0 0 1-2.981 14.385zm-27.405-106.037a7.499 7.499 0 0 1-6.867-4.479 7.5 7.5 0 0 1 3.84-9.887l27.413-12.074a7.501 7.501 0 0 1 6.047 13.728l-27.413 12.074a7.481 7.481 0 0 1-3.02.638zm-62.91-62.628a7.5 7.5 0 0 1-7.197-9.622l9.121-30.941c1.172-3.973 5.341-6.248 9.315-5.073a7.5 7.5 0 0 1 5.073 9.314l-9.121 30.941a7.505 7.505 0 0 1-7.191 5.381z"></path>
                    </svg>
                </div>
            )
            }
            <div className={styles.left}>
            <div className={styles.content}>
                <h2 className={styles.subHeading}>Get in Touch with Us</h2>
                <p>Please fill out the form below with your details and inquiry. Our team will review your message and get back to you as soon as possible. Your information is secure and will only be used to respond to your query.</p>
            </div>
            <div className={styles.imgContainer}>
                <Image src="/products-hero.png" alt="checkout-image" height={265} width={384} />
            </div>
            </div>

           {isLoading ? (
            <div className={styles.loader}>
                <CustomLoader color="white"/>
                <h2>Please wait while we deliver you email.</h2>
            </div>
           ):(
            <div className={styles.right}>
            <form className={styles.checkoutForm} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name <span>*</span></label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email <span>*</span></label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                </div>
   
                <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="mobile">Mobile Number <span>*</span></label>
                    <input
                        type="text"
                        id="mobile"
                        placeholder="Enter your mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="city">City <span>*</span></label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Enter your city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                </div>
   
                <div className={styles.desc}>
                    <label htmlFor="desc">Description</label>
                    <div className={styles.textarea}>
                        <textarea
                            name="desc"
                            id="desc"
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>
   
                <button type="submit" className={styles.submitBtn}>Contact Us</button>
            </form>
            </div>
           )}
        </div>
  )
}
