import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
import colornames from 'colornames';
import Fuse from 'fuse.js';
import colorNames from './Colornames';

const fuse = new Fuse(colorNames, {
  includeScore: true,
  threshold: 0.4,
});

const getSuggestions = (input) => {
  if (!input) return [];
  return fuse.search(input).map(result => result.item);
};

const Input = ({ colorValue, setColorValue, setHexValue, setIsDarkText }) => {
  const [suggestions, setSuggestions] = useState([]);

  // Initialize colorValue from local storage on component mount
  useEffect(() => {
    const savedColor = localStorage.getItem('colorValue');
    if (savedColor) {
      setColorValue(savedColor);
      setHexValue(colornames(savedColor) || '');
    }
  }, [setColorValue, setHexValue]);

  // Save colorValue to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('colorValue', colorValue);
    setHexValue(colornames(colorValue) || '');
  }, [colorValue, setHexValue]);

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setColorValue(value);
    setSuggestions(getSuggestions(value));
  }, [setColorValue]);

  const handleSuggestionClick = useCallback((name) => {
    setColorValue(name);
    setSuggestions([]);
  }, [setColorValue]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="colorInput">Add Color Name:</label>
      <input
        id="colorInput"
        autoFocus
        type="text"
        placeholder="Add color name"
        required
        value={colorValue}
        onChange={handleChange}
      />
      <button
        className='toggle-button'
        type='button'
        onClick={() => setIsDarkText(prev => !prev)}
      >
        Toggle Text Color
      </button>
      <li className='suggestion-li'>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((name, index) => (
              <li key={index} onClick={() => handleSuggestionClick(name)}>
                {name}
              </li>
            ))}
          </ul>
        )}
      </li>
    </form>
  );
};

Input.propTypes = {
  colorValue: PropTypes.string.isRequired,
  setColorValue: PropTypes.func.isRequired,
  isDarkText: PropTypes.bool.isRequired,
  setHexValue: PropTypes.func.isRequired,
  setIsDarkText: PropTypes.func.isRequired,
};

export default Input;
