import React, { useState, useRef } from 'react';
import "./Chips.css"

const ChipInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [availableItems, setAvailableItems] = useState(['👤 Item1', '👤 Item2', '👤 Item3', '👤 Item4']); // Add your list of items here

  const inputRef = useRef(null); 
  const [inputWidth, setInputWidth] = useState(300);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleItemClick = (item) => {
    setChips([...chips, item]);
    setAvailableItems(availableItems.filter((availableItem) => availableItem !== item));
    setInputValue('');

    
    setInputWidth((prevWidth) => prevWidth + 80); 
    if (inputRef.current) {
      inputRef.current.style.width = `${inputWidth}px`;
      inputRef.current.placeholder='';
    }
  };

  const handleChipRemove = (chip) => {
    setChips(chips.filter((c) => c !== chip));
    setAvailableItems([...availableItems, chip]);
    setInputWidth((prevWidth) => prevWidth - 80); 
    if (inputRef.current) {
      inputRef.current.style.width = `${inputWidth}px`; 
    }

  };

  const [popup, setPopup] = useState(false);

  const showAnswer = () => {
    setPopup(!popup);
  };

  return (
    <div style={{ position: 'relative', width: '300px' }}>
        
      <div className='chipstyle'>
        {chips.map((chip, index) => (
          <div key={index} className="chip">
            {chip}
            <button style={{ marginLeft: "10px", borderStyle: "none" }} onClick={() => handleChipRemove(chip)}>X</button>
          </div>
        ))}
      </div>
      <input
        ref={inputRef} 
        className='inputbox'
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Select a Value'
        onClick={showAnswer}
        style={{ width: `${inputWidth}px` }}
      />

      {popup && (
        <ul className='available'>
          {availableItems
            .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
            .map((item, index) => (
              <li className='listul' key={index} onClick={() => handleItemClick(item)}>
                {item}
              </li>
            ))}
        </ul>
      )}
      <div className='naming'>
        Zepto Assignment: 
        <br />
        Milind Gupta
        <br />
        milindgupta578@gmail.com
      </div>
    </div>
  );
};

export default ChipInput;
