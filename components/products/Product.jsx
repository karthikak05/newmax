'use client'
import React, { useEffect, useState,useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from "./Product.module.scss";
import LeftMenu from './LeftMenu/LeftMenu';
import Dropdown from '../home/DropDown/DropDown';
import useStorage from '@/firebase/useStorage'; 
import ProductContainer from '../Reusables/ProductContainer/ProductContainer';
import { LeftMenu as DropDownData } from '@/data/LeftMenu';
import CustomLoader from '../Reusables/CustomLoader';
import { Button } from '@mui/material';
import Image from 'next/image';
import { openDatabase } from '@/store/imageStore';
import { getImageUrls } from '@/store/imageStore';

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
    const scrollRef = useRef()
    const imagesPerPage = 9;
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePopped = (url) => {
        setIsPopped(url);
    };

    const handleBrandChange = (value) => {
        setSelectedBrand(value);
        setSelectedProduct(null);
        setCurrentPage(1);
        if (typeof window !== 'undefined') {
            localStorage.setItem("activeCompanyName", value);
            localStorage.setItem("selectedProduct", null);
        }
    };

    const handleCategoryChange = (value) => {
        setCurrentCategory(value);
        setSelectedBrand(null);
        setSelectedProduct(null);
        setCurrentPage(1);
        if (typeof window !== 'undefined') {
            localStorage.setItem("currentCategory", value);
            localStorage.setItem("activeCompanyName", "Zebra");
            localStorage.setItem("selectedProduct", null);
        }
    };

    const handleProductChange = (e) => {
        setCurrentPage(1);
        setSelectedProduct(e.target.value);
        if (typeof window !== 'undefined') {
            localStorage.setItem("selectedProduct", e.target.value);
        }
        loadImages(currentCategory, e.target.value, selectedBrand, activeIndex);
    };

    const handleActiveIndexChange = (index) => {
        setActiveIndex(index);
        setCurrentPage(1);
        if (typeof window !== 'undefined') {
            localStorage.setItem("activeIndex", index);
        }
    };

    const filterValues = (activeIndexValue,activeCompanyName)=>{
        if (activeIndexValue === "0") {
            const filteredModels = DropDownData[activeIndexValue].models.filter(
                model => model.company === activeCompanyName
            );
            setDropDownValues(filteredModels);
            const selectedProductValue = filteredModels[0]?.value;
            setSelectedProduct(selectedProductValue)
        } else {
            setDropDownValues(DropDownData[activeIndexValue].models);
        }
    }


    const getSelectedCategory = (selectedCategory)=>{
        const categories = [
            'PDA Accessories',
            'Scanner Accessories',
            'Barcode Printer Accessories',
            'Card Printer Accessories',
            'Mobile Computers'
        ];        
        return categories.indexOf(selectedCategory);
    }

    const handleQueryParams =()=>{
        const category = decodeURIComponent(searchParams.get('category'));
        const company = decodeURIComponent(searchParams.get('company'));
        const model = decodeURIComponent(searchParams.get('model'));
        const index = getSelectedCategory(category);

        setSelectedBrand(company);
        setCurrentCategory(category);
        setActiveIndex(index);
        if( index !== 4){
            filterValues(index,company);
        }
        loadImages(category, model, company, index);
    
        const pageNo = decodeURIComponent(searchParams.get('page'));
        if (pageNo) {
            setCurrentPage(pageNo);
        }        
    }

    const setQueryParams = ( categoryValue,selectedProductValue,activeBrand)=>{
        const query = new URLSearchParams(searchParams);
        query.set('category', encodeURIComponent(categoryValue));
        if(categoryValue !== "Mobile Computers"){
            query.set('company', encodeURIComponent(activeBrand));
            query.set('model', encodeURIComponent(selectedProductValue));
        }
        query.set('page', encodeURIComponent(currentPage));
        const index = getSelectedCategory(categoryValue);

        router.push(`?${query.toString()}`, undefined, { shallow: true });
        loadImages(categoryValue,selectedProductValue,activeBrand,index)
    }

    const loadImages = async (categoryValue,selectedProductValue,activeBrand,activeIndexValue) => {
        let url = '';

        if(categoryValue === "PDA Accessories"){
            categoryValue ="PDA Accesssories";
        }
        if(activeBrand === "Psion Teklogix"){
            activeBrand = "Psion Texlogix";
        }

        url = "/" + categoryValue;
        const hasSubBrands = ["PDA Accesssories", "Barcode Printer Accessories"];
        if (hasSubBrands.includes(categoryValue)) {
            url += "/" + activeBrand;
        }
        if ( DropDownData[activeIndexValue].models.length > 0 ) {
            url += "/" + selectedProductValue;
        }

        const cachedImageUrls = await getImageUrls(url);
        if (cachedImageUrls) {
            setImageUrls(cachedImageUrls); 
            // console.log("Using cached images:");
        } else {
            setIsLoading(true); 
            const fetchedImageUrls = await fetchImages(url); 
            if(fetchedImageUrls.length > 0){
                const db = await openDatabase();
                await db.put('images', { url: url, imageUrls: fetchedImageUrls });
            }
            
            setImageUrls(fetchedImageUrls); // Use newly fetched URLs
            // console.log("Fetched and stored new images:");
            setIsLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {

            let categoryValue = localStorage.getItem("currentCategory");
            if (categoryValue !== null && categoryValue!== "null") {
                setCurrentCategory(categoryValue);
            } else {
                setCurrentCategory("PDA Accessories");
                localStorage.setItem("currentCategory", "PDA Accessories");
                categoryValue = "PDA Accessories";
            }

            let activeCompanyName = localStorage.getItem("activeCompanyName");
            if (activeCompanyName !== null && activeCompanyName!== "null") {
                setSelectedBrand(activeCompanyName);
            } else {
                setSelectedBrand(0);
                localStorage.setItem("activeCompanyName", "Zebra");
                activeCompanyName = "Zebra";
            }

            let activeIndexValue = localStorage.getItem("activeIndex");
            if (activeIndexValue !== null) {
                setActiveIndex(Number(activeIndexValue));
            } else {
                localStorage.setItem("activeIndex", 0);
                activeIndexValue = 0;
            }

            let selectedProductValue = localStorage.getItem('selectedProduct');
            if (selectedProductValue !== null && selectedProductValue!== "null") {
                setSelectedProduct(selectedProductValue);
            } else {
                let value = null;
                if (DropDownData[activeIndexValue].models.length > 0) {
                    value = DropDownData[activeIndexValue].models[0].value;
                }
                setSelectedProduct(value);
                localStorage.setItem("selectedProduct", value);
                selectedProductValue = value;
            }

            // console.log(DropDownData[activeIndexValue].models)
            if (activeIndexValue === "0") {
                const filteredModels = DropDownData[activeIndexValue].models.filter(
                    model => model.company === activeCompanyName
                );
                setDropDownValues(filteredModels);
                selectedProductValue = filteredModels[0]?.value;
                setSelectedProduct(selectedProductValue)
            } else {
                setDropDownValues(DropDownData[activeIndexValue].models);
            }

            // if (localProductValue !== null && localProductValue!== "null") {
            //     selectedProductValue =localProductValue;
            // };
            setQueryParams(categoryValue,selectedProductValue,activeCompanyName);
            // loadImages(categoryValue,selectedProductValue,activeCompanyName,activeIndexValue);
        }
    }, [selectedBrand,activeIndex]);

    useEffect(()=>{
        const isQueryParamsAvailable =  new URLSearchParams(searchParams).size > 0;
        if(isQueryParamsAvailable){
            handleQueryParams();
        }
    },[])
    
    
    const handleSearch = () => {
        if (selectedProduct === null) {
            alert("Please select a product.");
        }
        loadImages(currentCategory,selectedProduct,selectedBrand,activeIndex);
    };

    let totalPages = Math.ceil(imageUrls.length / imagesPerPage);

    const currentImages = imageUrls.slice(
        (currentPage - 1) * imagesPerPage,
        currentPage * imagesPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            if( scrollRef.current){
                scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setCurrentPage(currentPage + 1);
            const query = new URLSearchParams(searchParams);
            query.set('page', encodeURIComponent(currentPage+1));
            router.push(`?${query.toString()}`, undefined, { shallow: true });
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            const query = new URLSearchParams(searchParams);
            query.set('page', encodeURIComponent(currentPage-1));
            router.push(`?${query.toString()}`, undefined, { shallow: true });
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
                        <>
                            <div className={styles.gridContainer} ref={scrollRef}>
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
                                        <ProductContainer url={image} setIsPopped={handlePopped} />
                                    </div>
                                ))}
                            </div>

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
                        </>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
