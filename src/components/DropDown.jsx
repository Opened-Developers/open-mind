import React, { useState } from 'react'
import styles from './DropDown.module.css'
import icArrowDown from '../assets/icons/ic_arrow_down.svg'

function DropDown({ items, onItemChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(items[1])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setIsOpen(false)
    onItemChange(item)
  }

  return (
    <div
      role="presentation"
      className={styles.DropDown}
      onClick={toggleDropdown}
    >
      <div className={styles.dropdownContainer}>
        <button type="button" className={`caption-1 ${styles.dropdownButton}`}>
          {selectedItem}
        </button>
        <img src={icArrowDown} alt="" />
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {items.map((item) => (
            <li
              role="presentation"
              key={item}
              className={styles.dropdownItem}
              onClick={() => handleItemClick(item)}
              onKeyDown={() => true}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropDown
