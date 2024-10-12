import React from 'react'
import styles from "./Form.module.scss";

export default function Form() {
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
            <h2 className={styles.subHeading}>Customize your orders</h2>
                <form className={styles.checkoutForm}>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                    <label htmlFor="name">Name <span>*</span></label>
                    <input type="text" id="name" placeholder="Enter your name" />
                    </div>
                    <div className={styles.formGroup}>
                    <label htmlFor="email">Email <span>*</span></label>
                    <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                    <label htmlFor="mobile">Phone Number <span>*</span></label>
                    <input type="text" id="mobile" placeholder="Enter your mobile number" />
                    </div>
                    <div className={styles.formGroup}>
                    <label htmlFor="shippingAddress">Quantity <span>*</span></label>
                    <input type="text" id="shippingAddress" placeholder="Enter your shipping address" />
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
                        <textarea name="case" id="case" placeholder='Enter your custom requirement here'></textarea>
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                    <label htmlFor="city">Country <span>*</span></label>
                    <input type="text" id="city" placeholder="Enter your city" />
                    </div>
                    <div className={styles.formGroup}>
                    <label htmlFor="zipCode">Upload File <span>*</span></label>
                    <input type="text" id="zipCode" placeholder="Enter your zip code" />
                    </div>
                </div>

                <button type="submit" className={styles.submitBtn}>Submit</button>
                </form>
        </div>
    </div>
  )
}
