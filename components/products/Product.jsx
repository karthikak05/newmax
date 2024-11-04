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
    const [dropDownValues, setDropDownValues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); 
    const [isPopped, setIsPopped] = useState(null);
    const imagesPerPage = 9;

    const handlePopped = (url) => {
        console.log(url);
        setIsPopped(url);
    };

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
        const isProductsAvailable = dropDownValues.length > 0;
        if ((isProductsAvailable && selectedProduct !== null) || !isProductsAvailable) {
            setIsLoading(true);
            url = "/" + currentCategory;
            const hasSubBrands = ["PDA Accesssories", "Barcode Printer Accessories"];
            if (hasSubBrands.includes(currentCategory)) {
                url += "/" + selectedBrand;
            }
            if (dropDownValues.length > 0) {
                url += "/" + selectedProduct;
            }
            const checkifUrlsExist = localStorage.getItem(url);
            if( url !== null){
                console.log(checkifUrlsExist);
                imageUrls = checkifUrlsExist;
            }else{
                // imageUrls = await fetchImages(url);
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

            let activeCompanyIndex = localStorage.getItem("activeCompanyIndex");
            if (activeCompanyIndex !== null) {
                setSelectedBrand(activeCompanyIndex);
            } else {
                setSelectedBrand(0);
                localStorage.setItem("activeCompanyIndex", "Zebra");
                activeCompanyIndex = "Zebra";
            }

            let activeIndex = localStorage.getItem("activeIndex");
            if (activeIndex !== null) {
                setActiveIndex(Number(activeIndex));
            } else {
                localStorage.setItem("activeIndex", 0);
                activeIndex = 0;
            }

            const selectedProduct = localStorage.getItem('selectedProduct');
            if (selectedProduct !== null) {
                setSelectedProduct(selectedProduct);
            } else {
                let value = null;
                if (DropDownData[activeIndex].models.length > 0) {
                    value = DropDownData[activeIndex].models[0].value;
                }
                setSelectedProduct(value);
                localStorage.setItem("selectedProduct", value);
            }

            // console.log(DropDownData[activeIndex].models)
            if (activeIndex === "0") {
                console.log("in")
                const filteredModels = DropDownData[activeIndex].models.filter(
                    model => model.company === activeCompanyIndex
                );
                setDropDownValues(filteredModels);
            } else {
                setDropDownValues(DropDownData[activeIndex].models);
            }
            console.log(dropDownValues)
            loadImages();
        }
    }, [selectedBrand,activeIndex]);


    const handleSearch = () => {
        if (selectedProduct === null) {
            alert("Please select a product.");
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
                    {dropDownValues.length > 0 && (
                        <div className={styles.dropDown}>
                            <div className={styles.dropDownContainer}>
                                <Dropdown
                                    label="Choose Products"
                                    value={selectedProduct}
                                    onChange={handleProductChange}
                                    options={dropDownValues}
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
                            <h2 className={styles.error}>Error fetching products. Please try again.</h2>
                        ) : (
                            <div className={styles.gridContainer}>
                                {isPopped !== null && (
                                    <div className={styles.bg}>
                                        <div className={styles.imgContainer}>
                                            <div onClick={() => handlePopped(null)} className={styles.close}>
                                                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#F8F8F8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                            <Image src={isPopped} alt="bg-cover" height={300} width={300} />
                                        </div>
                                    </div>
                                )}
                                {currentImages.map((image, i) => (
                                    <div key={i} className={styles.item}>
                                        <ProductContainer url={image} popover={handlePopped} />
                                    </div>
                                ))}
                            </div>
                        )
                    )}

                    {/* Pagination */}
                    <div className={styles.pagination}>
                        <Button
                            variant="outlined"
                            className={styles.paginationBtn}
                            disabled={currentPage === 1}
                            onClick={handlePrevPage}
                        >
                            Previous
                        </Button>
                        <span>{currentPage} of {totalPages}</span>
                        <Button
                            variant="outlined"
                            className={styles.paginationBtn}
                            disabled={currentPage === totalPages}
                            onClick={handleNextPage}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
