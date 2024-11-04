import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';

const Dropdown = ({ label, value, onChange, options }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(()=>{
      setFilteredOptions(options);
      setSearchTerm('');
  },[options])

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredOptions(
      options.filter(option =>
        option.label.toLowerCase().includes(term)
      )
    );
    setIsOpen(true); // Open dropdown when typing
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option.label); // Display selected option's label
    onChange({ target: { value: option.value } }); // Update selected value
    setIsOpen(false); // Close dropdown after selecting
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={`${styles.inputContainer} ${searchTerm ? styles.filled : ''}`}>
        <label className={styles.floatingLabel}>{label}</label>
        <input
          type="text"
          className={styles.dropdownSearch}
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={() => setIsOpen(!isOpen)}
          placeholder=" "
        />
      </div>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className={styles.dropdownItem}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className={styles.dropdownNoOptions}>No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
