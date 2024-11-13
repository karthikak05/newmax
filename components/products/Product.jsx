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
import { openDatabase } from '@/store/imageStore';
import { getImageUrls } from '@/store/imageStore';
import Popover from '../Reusables/Popover/Popover';

export default function Product() {
    const { fetchImages,fetchDropDown } = useStorage();
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
        const query = new URLSearchParams(searchParams);
        if (url!==null) {
            query.set('image', encodeURIComponent(btoa(url)));
        } else {
            query.delete('image');
        }
        router.push(`?${query.toString()}`, undefined, { shallow: true });
        setIsPopped(url);
    };
    
    const handleBrandChange = (value) => {
        setSelectedBrand(value);
        setSelectedProduct(null);
        setCurrentPage(1);
        handlePopped(null);
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
        handlePopped(null);
        if (typeof window !== 'undefined') {
            localStorage.setItem("currentCategory", value);
            localStorage.setItem("activeCompanyName", "Zebra");
            localStorage.setItem("selectedProduct", null);
        }
    };

    const handleProductChange = (e) => {
        setCurrentPage(1);
        setSelectedProduct(e.target.value);
        handlePopped(null);
        if (typeof window !== 'undefined') {
            localStorage.setItem("selectedProduct", e.target.value);
        }
        const query = new URLSearchParams(searchParams);
        query.set('model', encodeURIComponent(e.target.value));
        router.push(`?${query.toString()}`, undefined, { shallow: true }); 
        loadImages(currentCategory, e.target.value, selectedBrand, activeIndex);
    };

    const handleActiveIndexChange = (index) => {
        setActiveIndex(index);
        setCurrentPage(1);
        if (typeof window !== 'undefined') {
            localStorage.setItem("activeIndex", index);
        }
    };


    const getSelectedCategory = (selectedCategory)=>{
        const categories = [
            'PDA Spare Parts',
            'Scanner Spare Parts',
            'Barcode Printer Spare Parts',
            'Card Printer Spare Parts',
            'Mobile Computers'
        ];        
        return categories.indexOf(selectedCategory);
    };

    const handleQueryParams =async()=>{
        const category = decodeURIComponent(searchParams.get('category'));
        const company = decodeURIComponent(searchParams.get('company'));
        const model = decodeURIComponent(searchParams.get('model'));
        const index = getSelectedCategory(category).toString();
        const selectedProduct = await getDropDownValues(category,company);

        setSelectedBrand(company);
        setCurrentCategory(category);
        setActiveIndex(index);
        if(model==null){
            setSelectedProduct(selectedProduct);
            localStorage.setItem("selectedProduct",selectedProduct);
        }else{
            setSelectedProduct(model);
            localStorage.setItem("selectedProduct",model);
        }

        localStorage.setItem("currentCategory", category);
        localStorage.setItem("activeIndex", index);
        localStorage.setItem("activeCompanyName", company);

        if(model==null){
            loadImages(category, selectedProduct, company, index);
        }else{
            loadImages(category, model, company, index);
        }
    
        const pageNo = decodeURIComponent(searchParams.get('page'));
        if (pageNo) {
            setCurrentPage(pageNo);
        }        
    }

    const setQueryParams = ( categoryValue,selectedProductValue,activeBrand)=>{
        const query = new URLSearchParams(searchParams);
        query.delete('page')
        query.set('category', encodeURIComponent(categoryValue));
        if (categoryValue === "Mobile Computers") {
            query.delete('company');
            query.delete('model');
        } else {
            query.set('company', encodeURIComponent(activeBrand));
            query.set('model', encodeURIComponent(selectedProductValue));
        }
        if( categoryValue === "PDA Spare Parts" || categoryValue === "Barcode Spare Parts"){
            query.set('company', encodeURIComponent(activeBrand));
        }else{
            query.delete('company');
        }

        query.set('page', encodeURIComponent(currentPage));
        const index = getSelectedCategory(categoryValue);

        localStorage.setItem("currentCategory", categoryValue);
        localStorage.setItem("activeIndex", index);
        localStorage.setItem("activeCompanyName", activeBrand);
        localStorage.setItem("selectedProduct", selectedProductValue);

        router.push(`?${query.toString()}`, undefined, { shallow: true });
        loadImages(categoryValue,selectedProductValue,activeBrand,index);
        const image = query.get('image');
        
        if (image!=null) {
            const decodedImage = decodeURIComponent(image);
            const imageUrl = atob(decodedImage);
            setIsPopped(imageUrl);
        }
    }

    const loadImages = async (categoryValue,selectedProductValue,activeBrand,activeIndexValue) => {
        let url = '';

        if(categoryValue === "PDA Spare Parts"){
            categoryValue ="PDA Accesssories";
        }else if(categoryValue === "Barcode Printer Spare Parts"){
            categoryValue = "Barcode Accessories"
        }
        categoryValue = categoryValue.replace("Spare Parts", "Accessories");

        if(activeBrand === "Psion Teklogix"){
            activeBrand = "Psion Texlogix";
        }

        url = "/" + categoryValue;
        const hasSubBrands = ["PDA Accesssories", "Barcode Accessories"];
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
            const fetchedImageUrls = await fetchImages(url); 
            setIsLoading(true); 
            if(fetchedImageUrls.length > 0){
                const db = await openDatabase();
                await db.put('images', { url: url, imageUrls: fetchedImageUrls });
            }
            
            setImageUrls(fetchedImageUrls); // Use newly fetched URLs
            // console.log("Fetched and stored new images:");
            setIsLoading(false)
        }
    };
    const getLastPathValues = (array) => {
        return array.map((item) => {
          const parts = item.split("/");
          return parts[parts.length - 1];
        });
      };
      
    const getDropDownValues = async(category,brand)=>{
        const key = category + "_dropdown";
        let brandKey = category+"_"+brand+"_dropdown";
        let localValues;
        if(category === "PDA Spare Parts" || category === "Barcode Printer Spare Parts"){
            localValues = JSON.parse(localStorage.getItem(brandKey));
        }else{
            JSON.parse(localStorage.getItem(key));
        }

        if( localValues!==null && localValues!== undefined){
            setDropdown(localValues);
            return localValues[0];
        }
        if(category === "PDA Spare Parts"){
            category ="PDA Accesssories";
        }else if(category === "Barcode Printer Spare Parts"){
            category = "Barcode Accessories"
        }
        category = category.replace("Spare Parts", "Accessories");

        if(brand === "Psion Teklogix"){
            brand = "Psion Texlogix";
        }
        let url = category;

        const noBrands = ["Card Printer Accessories","Mobile Computers","Scanner Accessories"]
        if( !noBrands.includes(category)){
            url += "/" + brand;
        }

        let result = await fetchDropDown(url);
        let dropDownValues = getLastPathValues(result);
        if(category === "PDA Accesssories" || category === "Barcode Accesssories"){
            localStorage.setItem(brandKey,JSON.stringify(dropDownValues));
        }else{
            localStorage.setItem(key,JSON.stringify(dropDownValues));
        }
        if( dropDownValues!==null && dropDownValues!==undefined){
            setDropdown(dropDownValues);
        }
        return dropDownValues[0];
    };

    const setDropdown= (dropDownValues)=>{
        const formattedDropDownValues = dropDownValues.map((item) => ({
            value: item,
            label: item,
        }));        
          
        setDropDownValues(formattedDropDownValues);
        // setSelectedProduct(dropDownValues[0]);
    }

    useEffect(() => {
        const handleUseEffect = async()=>{
            if (typeof window !== 'undefined') {
                const isQueryParamsAvailable =  new URLSearchParams(searchParams).size > 0;
                const isFirstTimeLoaded = sessionStorage.getItem('loaded');
                if(isQueryParamsAvailable && isFirstTimeLoaded == null){
                    sessionStorage.setItem('loaded',"true")
                    handleQueryParams();
                }else{
    
                let categoryValue = localStorage.getItem("currentCategory");
                if (categoryValue !== null && categoryValue!== "null") {
                    setCurrentCategory(categoryValue);
                } else {
                    setCurrentCategory("PDA Spare Parts");
                    localStorage.setItem("currentCategory", "PDA Spare Parts");
                    categoryValue = "PDA Spare Parts";
                }
    
                let activeCompanyName = localStorage.getItem("activeCompanyName");
                if (activeCompanyName !== null && activeCompanyName!== "null") {
                    setSelectedBrand(activeCompanyName);
                } else {
                    setSelectedBrand(0);
                    localStorage.setItem("activeCompanyName", "Zebra");
                    activeCompanyName = "Zebra";
                }
                //Get the dynamic dropdown
                // const productValue = getDropDownValues(categoryValue,activeCompanyName);
    
                let activeIndexValue = Number(localStorage.getItem("activeIndex"));
                if (activeIndexValue !== null && activeIndexValue > 0) {
                    setActiveIndex(activeIndexValue);
                } else {
                    localStorage.setItem("activeIndex", 0);
                    activeIndexValue = 0;
                }
    
                let selectedProductValue = localStorage.getItem('selectedProduct');
                if (selectedProductValue !== null && selectedProductValue!== "null") {
                    setSelectedProduct(selectedProductValue);
                    await getDropDownValues(categoryValue,activeCompanyName)
                } else {
                    let value = null;
                    // if (DropDownData[activeIndexValue].models.length > 0) {
                    //     value = DropDownData[activeIndexValue].models[0].value;
                    // }
                    value = await getDropDownValues(categoryValue,activeCompanyName);
                    setSelectedProduct(value);
                    selectedProductValue = value;
                    localStorage.setItem('selectedProduct',value)
                }
    
                // console.log(DropDownData[activeIndexValue].models)
                // if (activeIndexValue === 0 || activeIndexValue === 2) {
                //     const filteredModels = DropDownData[activeIndexValue].models.filter(
                //         model => model.company === activeCompanyName
                //     );
                //     setDropDownValues(filteredModels);
                //     selectedProductValue = filteredModels[0]?.value;
                //     setSelectedProduct(selectedProductValue);
                // } else {
                //     console.log(DropDownData[0].models)
                //     setDropDownValues(DropDownData[activeIndexValue].models);
                // }
                setQueryParams(categoryValue,selectedProductValue,activeCompanyName);
            }
    
                // if (localProductValue !== null && localProductValue!== "null") {
                //     selectedProductValue =localProductValue;
                // };
                // loadImages(categoryValue,selectedProductValue,activeCompanyName,activeIndexValue);
            }
        };
        handleUseEffect();
    }, [selectedBrand,activeIndex]);

    // useEffect(()=>{
    //     const isQueryParamsAvailable =  new URLSearchParams(searchParams).size > 0;
    //     if(isQueryParamsAvailable){
    //         setIsLoading(true);
    //         handleQueryParams();
    //         setIsLoading(false)
    //     }
    // },[]);
    
    
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
                                {isPopped !== null &&(
                                    <Popover url={isPopped} handlePopped={handlePopped} />
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
