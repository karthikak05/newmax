'use client'
import React, { useState } from 'react'
import styles from "./Form.module.scss";
import CustomLoader from '@/components/Reusables/CustomLoader';

export default function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [quantity, setQuantity] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [caseDescription, setCaseDescription] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = () => {
        setName("");
        setEmail("");
        setMobile("");
        setQuantity("");
        setCountry("");
        setZipCode("");
        setCaseDescription("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = {
            name,
            email,
            mobile,
            quantity,
            country,
            zipCode,
            description: caseDescription,
        };


        try {
            const response = await fetch('https://formspree.io/f/xanyqjdz', { 
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
            handleReset();
            setTimeout(() => setShowSuccessPopup(false), 3000);
        }
    };

    const points = [
        "Advanced Tech: We use the latest innovations to ensure high-quality, reliable custom products.",
        "Fast Global Delivery: Wherever you are, expect quick and efficient shipping.",
        "Customer-Driven: Your feedback shapes our continuous improvements.",
        "24/7 Support: Our team is always available to assist with your custom needs.",
        "Tailored Solutions: Get exactly what you need with our flexible customization options.",
        "Proven Reliability: Trusted by customers worldwide for delivering top-quality parts and service."
    ]
  return (
    <div className={styles.main}>
        <div className={styles.left}>
            <h1 className={styles.heading}>Why Choose Newmax for Your Custom Needs?</h1>
            <p>At Newmax, we don’t just deliver mobile and computer spare parts – we provide tailored solutions that suit your unique requirements. When you customize with us, you gain access to:</p>
            {points.map((point,i)=>(
                <div key={i} className={styles.point}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0C4.4775 0 0 4.4775 0 10C0 15.5225 4.4775 20 10 20C15.5225 20 20 15.5225 20 10C20 4.4775 15.5225 0 10 0ZM15.5892 8.08917L9.28917 14.3892C9.1325 14.5458 8.92083 14.6333 8.7 14.6333C8.47917 14.6333 8.26667 14.5458 8.11083 14.3892L5.23333 11.5117C4.9075 11.1858 4.9075 10.6592 5.23333 10.3333C5.55917 10.0075 6.08583 10.0075 6.41167 10.3333L8.7 12.6217L14.4108 6.91083C14.7367 6.585 15.2633 6.585 15.5892 6.91083C15.915 7.23667 15.915 7.76333 15.5892 8.08917Z" fill="#F93822"/>
                    </svg>
                    <p>{point}</p>
                </div>
            ))}
        </div>

        {/* right */}
        <div className={styles.right}>
        {showSuccessPopup &&( 
                    <div className={styles.popup}>
                        <h2>Mail Sent Successfully</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" id="tick" viewBox="0 0 400 400">
                        <path fill="white" d="m287.477 154.953-90.875 90.875-22.719 22.719-22.711-22.719-37.867-37.867 22.719-22.719 37.867 37.867 90.867-90.875z"></path>
                        <path fill="white" d="M77.344 207.891H14.063a7.5 7.5 0 0 1 0-15h63.281a7.5 7.5 0 0 1 0 15zm309.363 0h-63.27a7.499 7.499 0 0 1-7.5-7.5 7.5 7.5 0 0 1 7.5-7.5h63.27a7.5 7.5 0 0 1 7.5 7.5 7.5 7.5 0 0 1-7.5 7.5zM200.391 84.844a7.5 7.5 0 0 1-7.5-7.5V14.063a7.5 7.5 0 0 1 15 0v63.281a7.5 7.5 0 0 1-7.5 7.5zm0 309.854a7.5 7.5 0 0 1-7.5-7.5v-63.761a7.5 7.5 0 0 1 7.5-7.5c4.143 0 7.5 3.357 7.5 7.5v63.761a7.5 7.5 0 0 1-7.5 7.5zM332.588 339.2a7.481 7.481 0 0 1-5.304-2.196l-44.75-44.75a7.5 7.5 0 0 1 10.607-10.607l44.75 44.75a7.5 7.5 0 0 1-5.303 12.803zm-267.281-2.889a7.5 7.5 0 0 1-5.303-12.803l44.812-44.812a7.501 7.501 0 0 1 10.606 10.607L70.61 334.114a7.478 7.478 0 0 1-5.303 2.197zm218.667-218.712a7.5 7.5 0 0 1-5.304-12.803l44.743-44.743a7.5 7.5 0 0 1 10.607 10.606l-44.743 44.743a7.478 7.478 0 0 1-5.303 2.197zm-170.735 3.431a7.474 7.474 0 0 1-5.303-2.197L63.243 74.141a7.5 7.5 0 0 1 0-10.606 7.5 7.5 0 0 1 10.606 0l44.692 44.692a7.5 7.5 0 0 1-5.302 12.803z"></path>
                        <path fill="white" d="M153.926 93.927a7.502 7.502 0 0 1-6.97-4.727l-11.804-29.64a7.5 7.5 0 0 1 13.936-5.55l11.804 29.64a7.5 7.5 0 0 1-6.966 10.277zM85.85 162.845a7.47 7.47 0 0 1-2.648-.486l-26.409-9.975a7.499 7.499 0 0 1-4.366-9.666 7.499 7.499 0 0 1 9.666-4.366l26.409 9.975a7.499 7.499 0 0 1 4.366 9.666 7.503 7.503 0 0 1-7.018 4.852zM59.449 268.321a7.5 7.5 0 0 1-3.782-13.982l26.409-15.382a7.5 7.5 0 0 1 7.55 12.961L63.217 267.3a7.46 7.46 0 0 1-3.768 1.021zm77.648 79.726a7.5 7.5 0 0 1-6.936-10.349l11.667-28.43a7.498 7.498 0 0 1 9.786-4.091 7.5 7.5 0 0 1 4.091 9.786l-11.667 28.43a7.503 7.503 0 0 1-6.941 4.654zm127.271 0a7.503 7.503 0 0 1-6.883-4.514l-12.35-28.43a7.5 7.5 0 0 1 13.758-5.976l12.35 28.43a7.5 7.5 0 0 1-6.875 10.49zm75.878-84.153a7.488 7.488 0 0 1-2.974-.618l-25.32-10.953a7.5 7.5 0 1 1 5.955-13.767l25.32 10.953a7.5 7.5 0 0 1-2.981 14.385zm-27.405-106.037a7.499 7.499 0 0 1-6.867-4.479 7.5 7.5 0 0 1 3.84-9.887l27.413-12.074a7.501 7.501 0 0 1 6.047 13.728l-27.413 12.074a7.481 7.481 0 0 1-3.02.638zm-62.91-62.628a7.5 7.5 0 0 1-7.197-9.622l9.121-30.941c1.172-3.973 5.341-6.248 9.315-5.073a7.5 7.5 0 0 1 5.073 9.314l-9.121 30.941a7.505 7.505 0 0 1-7.191 5.381z"></path>
                        </svg>
                        </div>
                    )}
            <h2 className={styles.subHeading}>Customize your orders</h2>
            {isLoading ? (
                <div className={styles.loader}>
                    <CustomLoader color="red"/>
                    <h2>Please wait while we deliver you email.</h2>
                </div>
            ): (
                <form onSubmit={handleSubmit} className={styles.checkoutForm}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                        <label htmlFor="name">Name <span>*</span></label>
                        <input type="text" id="name" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div className={styles.formGroup}>
                        <label htmlFor="email">Email <span>*</span></label>
                        <input type="email" id="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                        <label htmlFor="mobile">Phone Number <span>*</span></label>
                        <input type="text" id="mobile" placeholder="Enter your mobile number" onChange={(e)=>setMobile(e.target.value)}/>
                        </div>
                        <div className={styles.formGroup}>
                        <label htmlFor="shippingAddress">Quantity <span>*</span></label>
                        <input type="text" id="shippingAddress" placeholder="Enter your shipping address" onChange={(e)=>setQuantity(e.target.value)}/>
                        </div>
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.flexRow}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.58333 8.33333H6V6H5.41667M6 3.66667H6.00583M11.25 6C11.25 6.68944 11.1142 7.37213 10.8504 8.00909C10.5865 8.64605 10.1998 9.2248 9.71231 9.71231C9.2248 10.1998 8.64605 10.5865 8.00909 10.8504C7.37213 11.1142 6.68944 11.25 6 11.25C5.31056 11.25 4.62787 11.1142 3.99091 10.8504C3.35395 10.5865 2.7752 10.1998 2.28769 9.71231C1.80018 9.2248 1.41347 8.64605 1.14963 8.00909C0.885795 7.37213 0.75 6.68944 0.75 6C0.75 4.60761 1.30312 3.27226 2.28769 2.28769C3.27226 1.30312 4.60761 0.75 6 0.75C7.39239 0.75 8.72774 1.30312 9.71231 2.28769C10.6969 3.27226 11.25 4.60761 11.25 6Z" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <label htmlFor="case">Describe your case</label>
                        </div>
                        <div className={styles.textarea}>
                            <textarea name="case" id="case" placeholder='Enter your custom requirement here' onChange={(e)=>setCaseDescription(e.target.value)}></textarea>
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                        <label htmlFor="city">Country <span>*</span></label>
                        <input type="text" id="city" placeholder="Enter your city" onChange={(e)=>setCountry(e.target.value)}/>
                        </div>
                        <div className={styles.formGroup}>
                        <label htmlFor="zipCode">Zip Code <span>*</span></label>
                        <input type="text" id="zipCode" placeholder="Enter your zip code" onChange={(e)=>setZipCode(e.target.value)}/>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn}>Submit</button>
                </form>
            )}
        </div>
    </div>
  )
}
