import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';

const Dropdown = ({ label, value, onChange, options }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Handle the search input change
    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearchTerm(event.target.value);
        console.log(searchTerm);
    };

    const filteredOptions = searchTerm.length >= 2 
        ? options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
        : options;

    return (
        <FormControl fullWidth variant="outlined" style={{ width: "100%" }}>
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-label`}
                value={value}
                onChange={onChange}
                label={label}
                IconComponent={ArrowDropDownCircleOutlinedIcon}
            >
                {/* TextField for searching */}
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ margin: '8px', color: 'black' }} 
                />
                {/* Render filtered options or a message if none found */}
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No options found</MenuItem>
                )}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
