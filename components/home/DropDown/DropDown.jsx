import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';

const Dropdown = ({ label, value, onChange, options }) => {
    return (
        <FormControl fullWidth variant="outlined" style={{width:"100%"}}>
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-label`}
                value={value}
                onChange={onChange}
                label={label}
                IconComponent={ArrowDropDownCircleOutlinedIcon}
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
