'use client'
import React, { useState } from 'react';
import styles from './CheckoutForm.module.scss';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutForm({ handleCheckedOut }) {
  const { cartItems, total,clearCart } = useCartStore();
  
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    shippingAddress: '',
    city: '',
    zipCode: ''
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const convertToString = (data) => {
    // Convert each item in the data array to a readable string format
    return data
      .map(item => `Product: ${item.name}, Quantity: ${item.quantity}, Price: $${item.price}`)
      .join("\n"); // Join each item with a new line for better readability
  };
  console.log(convertToString(cartItems))

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setIsLoading(true); // Set loading state

    const { name, email, mobile, shippingAddress, city, zipCode } = formData;

  // Convert cartItems to a readable string format
  const JsonString = convertToString(cartItems);

  const data = {
    service_id: 'contact_us_newmax',
    template_id: 'contact_us_form',
    user_id: "XHmmT9b5Tw7bY1p2k",
    template_params: {
      name,
      email,
      mobile,
      shippingAddress,
      city,
      zipCode,
      cartItems: JsonString, 
      total,
    }
  };

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Send the request body as JSON
      });

      if (response.ok) {
        setShowSuccessPopup(true); // Show success popup
        setFormData({ // Reset form fields on success
          name: '',
          email: '',
          mobile: '',
          shippingAddress: '',
          city: '',
          zipCode: ''
        });
        setTimeout(() => setShowSuccessPopup(false), 3000);
        clearCart();
      } else {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.left}>
        <div className={styles.content}>
          <div className={styles.return} onClick={() => handleCheckedOut(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12L8 17M3 12L8 7M3 12H21" stroke="red" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Return to Cart</p>
          </div>
          <h2 className={styles.subHeading}>Complete Your Order Details</h2>
          <p>Please fill out the form below with your details to place your order. We’ll use this information to process your purchase and ensure a smooth delivery. Your details are safe with us and will only be used to fulfill your order.</p>
        </div>
        <div className={styles.imgContainer}>
          <Image src="/products-hero.png" alt="checkout-image" height={265} width={384} />
        </div>
      </div>

      {/* Form Section */}
      <div className={styles.right}>
        <form className={styles.checkoutForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name <span>*</span></label>
              <input
                type="text"
                id="name"
                name="name" 
                placeholder="Enter your name"
                value={formData.name} 
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email <span>*</span></label>
              <input
                type="email"
                id="email"
                name="email" 
                placeholder="Enter your email"
                value={formData.email} 
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="mobile">Mobile Number <span>*</span></label>
              <input
                type="text"
                id="mobile"
                name="mobile" // Added name attribute
                placeholder="Enter your mobile number"
                value={formData.mobile} // Controlled input
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="shippingAddress">Shipping Address <span>*</span></label>
              <input
                type="text"
                id="shippingAddress"
                name="shippingAddress" // Added name attribute
                placeholder="Enter your shipping address"
                value={formData.shippingAddress} // Controlled input
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">City <span>*</span></label>
              <input
                type="text"
                id="city"
                name="city" // Added name attribute
                placeholder="Enter your city"
                value={formData.city} // Controlled input
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="zipCode">Zip Code <span>*</span></label>
              <input
                type="text"
                id="zipCode"
                name="zipCode" // Added name attribute
                placeholder="Enter your zip code"
                value={formData.zipCode} // Controlled input
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Confirming...' : 'Confirm Order'}
          </button>
        </form>

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className={styles.successPopup}>
            <p>Order Confirmed!You will recieve an email soon🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}
