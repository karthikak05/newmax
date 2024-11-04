import React, { useEffect, useState } from 'react';
import styles from "./Product.module.scss";
import LeftMenu from './LeftMenu/LeftMenu';
import Dropdown from '../home/DropDown/DropDown';
import useStorage from '@/firebase/useStorage'; 
import ProductContainer from '../Reusables/ProductContainer/ProductContainer';
import { LeftMenu as DropDownData } from '@/data/LeftMenu';
import CustomLoader from '../Reusables/CustomLoader';
import { Button } from '@mui/material';
import Image from 'next/image';

export default function Product() {
    const { fetchImages } = useStorage();
    const [currentCategory, setCurrentCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); 
    const [isPopped,setIsPopped] = useState(null);
    const imagesPerPage = 9;

    const handlePopped = (url)=>{
        console.log(url)
        setIsPopped(url)
    }

    const handleBrandChange = (value) => {
        setSelectedBrand(value);
        setSelectedProduct(null);
        if (typeof window !== 'undefined') {
            localStorage.setItem("activeCompanyIndex", value);
        }
    };

    const handleCategoryChange = (value) => {
        setCurrentCategory(value);
        setSelectedBrand(null);
        setSelectedProduct(null);
        if (typeof window !== 'undefined') {
            localStorage.setItem("currentCategory", value);
        }
    };

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
        if (typeof window !== 'undefined') {
            localStorage.setItem("selectedProduct", e.target.value);
        }
    };

    const handleActiveIndexChange = (index) => {
        setActiveIndex(index);
        if (typeof window !== 'undefined') {
            localStorage.setItem("activeIndex", index);
        }
    };

    const loadImages = async () => {
        let imageUrls = null;
        let url = '';
        const isProductsAvailable = DropDownData[activeIndex].models.length > 0;
        if ((isProductsAvailable && selectedProduct !== null) || !isProductsAvailable) {
            setIsLoading(true);
            url = "/" + currentCategory;
            const hasSubBrands = ["PDA Accessories", "Barcode Printer Accessories"];
            if (hasSubBrands.includes(currentCategory)) {
                url += "/" + selectedBrand;
            }
            if (DropDownData[activeIndex].models.length > 0) {
                url += "/" + selectedProduct;
            }
            imageUrls = await fetchImages(url);
            localStorage.setItem(url, imageUrls);
            setImageUrls(imageUrls);
            setCurrentPage(1); // Reset to first page whenever images are loaded
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const category = localStorage.getItem("currentCategory");
            if (category !== null) {
                setCurrentCategory(category);
            } else {
                setCurrentCategory("PDA Accessories");
                localStorage.setItem("currentCategory", "PDA Accessories");
            }

            const activeCompanyIndex = localStorage.getItem("activeCompanyIndex");
            if (activeCompanyIndex !== null) {
                setSelectedBrand(activeCompanyIndex);
            } else {
                setSelectedBrand(0);
                localStorage.setItem("activeCompanyIndex", "Zebra");
            }

            let activeIndex = localStorage.getItem("activeIndex");
            if (activeIndex !== null) {
                setActiveIndex(activeIndex);
            } else {
                localStorage.setItem("activeIndex", 0);
                activeIndex = 0;
            }

            const selectedProduct = localStorage.getItem('selectedProduct');
            if (selectedProduct !== null) {
                setSelectedProduct(selectedProduct);
            } else {
                let value = null;
                console.log(DropDownData[activeIndex])
                if( DropDownData[activeIndex].models.length > 0 )   value = DropDownData[activeIndex].models[0].value;
                setSelectedProduct(value);
                localStorage.setItem("selectedProduct", value);
            }

            loadImages();
        }
    }, [selectedBrand,selectedProduct]);

    const handleSearch = () => {
        if (selectedProduct === null) {
            alert();
        }
        loadImages();
    };

    const totalPages = Math.ceil(imageUrls.length / imagesPerPage);

    const currentImages = imageUrls.slice(
        (currentPage - 1) * imagesPerPage,
        currentPage * imagesPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={styles.main}>
            <span className={styles.listing}>Home / Products /<b className={styles.textRed}> {currentCategory}</b></span>
            <div className={styles.topContent}>
                <h1 className={styles.heading}>{currentCategory}</h1>
                <p className={styles.para}>
                    Experience real-time tracking, proactive communication, and efficient problem-solving for your PDA accessory shipments. Enjoy a seamless and hassle-free delivery experience.
                </p>
            </div>

            <div className={styles.mainContainer}>
                {/* Left Menu */}
                <div className={styles.leftMenu}>
                    <LeftMenu
                        currentCategory={currentCategory}
                        currentBrand={selectedBrand}
                        handleBrandChange={handleBrandChange}
                        handleCategoryChange={handleCategoryChange}
                        handleActiveIndexChange={handleActiveIndexChange}
                    />
                </div>

                {/* Products */}
                <div className={styles.listings}>
                    <h2>Find the product you need</h2>

                    {/* Dropdown */}
                    {DropDownData[activeIndex].models.length > 0 && (
                        <div className={styles.dropDown}>
                            <div className={styles.dropDownContainer}>
                                <Dropdown
                                label="Choose Products"
                                value={selectedProduct}
                                onChange={handleProductChange}
                                options={DropDownData[activeIndex].models}
                            />
                            </div>
                            <Button
                                sx={{ textTransform: 'none' }}
                                variant="contained"
                                className={styles.containedBtn}
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </div>
                    )}

                    {/* Grid */}
                    {isLoading ? (
                        <div className={styles.loader}><CustomLoader color="red" /></div>
                    ) : (
                        imageUrls.length === 0 ? (
                            <h2 className={styles.error}>Error fetching products.Please try again</h2>
                        ) : (
                            <div className={styles.gridContainer}>
                            {isPopped!==null && (
                                <div className={styles.bg}>
                                    <div onClick={()=>handlePopped(null)}>
                                        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#F8F8F8" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className={styles.imgContainer}><Image src={isPopped} alt="bg-cover" height={300} width={300}/></div>
                                </div>
                            )}
                            {currentImages.map((image, i) => (
                                <div key={i} className={styles.item}>
                                    <ProductContainer url={image} popover={true} isPopped={isPopped} setIsPopped={handlePopped}/>
                                </div>
                            ))}
                        </div>
                        )
                    )}

                    {!isLoading && imageUrls.length > 0 && (
                        <div className={styles.pagination}>
                            <Button sx={{ textTransform: 'none' }} onClick={handlePrevPage}  className={`${styles.prev} ${currentPage === 1 ? styles.disabled : ''}`}>
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.56 12L11.5 11.06L8.44667 8L11.5 4.94L10.56 4L6.56 8L10.56 12Z" fill="#505050"/>
                                </svg>
                                    Previous
                            </Button>
                                <span className={styles.pages}>{currentPage}/{totalPages}</span>
                            <Button sx={{ textTransform: 'none' }} onClick={handleNextPage}  className={`${styles.next} ${currentPage === totalPages  ? styles.disabled : ''}`}>
                                Next
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.56 12L11.5 11.06L8.44667 8L11.5 4.94L10.56 4L6.56 8L10.56 12Z" fill="#505050"/>
                                </svg>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
