import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Dropdown = ({ label, value, onChange, options }) => {
    return (
        <FormControl fullWidth variant="outlined" style={{minWidth:'300px'}}>
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-label`}
                value={value}
                onChange={onChange}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
