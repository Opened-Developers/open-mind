import React, { cloneElement, useEffect, useState, useRef } from 'react'
import styles from './Dropdown.module.css'
import { ReactComponent as IcArrowUp } from '../assets/icons/ic_arrow_up.svg'
import { ReactComponent as IcMore } from '../assets/icons/ic_more.svg'

// util functions
const getIndex = (index, length) => ((index % length) + length) % length
const getCurrentIndex = (itemRef) => {
  const { activeElement } = document
  return Array.from(itemRef.current.children).indexOf(activeElement)
}
const getCurrentLength = (itemRef) => itemRef.current.children.length

const handleArrowNavigation = (e, itemRef) => {
  const currentIndex = getCurrentIndex(itemRef)
  const currentLength = getCurrentLength(itemRef)

  let nextIndex
  switch (e.keyCode) {
    case 38: // ArrowUp key
      nextIndex = getIndex(currentIndex - 1, currentLength)
      break
    case 40: // ArrowDown key
      nextIndex = getIndex(currentIndex + 1, currentLength)
      break
    default:
      return
  }

  itemRef.current.children[nextIndex]?.focus() // Optional chaining for safety
}

// custom hook
export function useDropdown() {
  // state
  const [isExpand, setIsExpand] = useState(false)
  const itemRef = useRef(null)

  // handlers
  const handleClick = () => {
    // 메뉴 열기 버튼 선택했을 때 일어나는 일 작성
    setIsExpand((prev) => !prev)
  }

  const handleKeydown = (e) => {
    if (e.keyCode === 40) {
      // arrow down
      if (!isExpand) {
        setIsExpand(true)
      } else {
        itemRef.current.children[0].focus()
      }
    }
  }

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      // setIsExpand(false)
    }
  }
  return {
    isExpand,
    setIsExpand,
    itemRef,
    handleClick,
    handleKeydown,
    handleBlur,
  }
}

export function SortDropdownItem(props) {
  const { setSelected, setIsExpand, children, itemRef, className } = props

  const handleClick = (e) => {
    e.stopPropagation()
    setIsExpand(false)
    setSelected(children)
  }

  const handleKeydown = (e) => {
    handleArrowNavigation(e, itemRef)
  }

  return (
    <li>
      <button
        className={`caption-1 ${className}`}
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeydown}
      >
        {children}
      </button>
    </li>
  )
}

export function MenuDropdownItem({ onClick, children, setIsExpand, itemRef }) {
  const handleOnMouseDown = (e) => {
    e.stopPropagation()
    e.preventDefault()
    onClick()
    setIsExpand(false)
  }

  const handleKeyDown = (e) => {
    handleArrowNavigation(e, itemRef)
  }
  return (
    <li>
      <button
        type="button"
        className="caption-1"
        onClick={handleOnMouseDown}
        onKeyDown={handleKeyDown}
      >
        {children}
      </button>
    </li>
  )
}

const renderMenuDropdownWithProps = (children, setIsExpand, itemRef) =>
  React.Children.map(children, (child) =>
    cloneElement(child, {
      setIsExpand,
      itemRef,
    })
  )

const renderSortDropdownWithProps = (
  children,
  selected,
  setIsExpand,
  setSelected,
  itemRef
) =>
  React.Children.map(children, (child) => {
    const childText = child.props.children
    const isSelected = childText === selected

    return cloneElement(child, {
      setSelected,
      setIsExpand,
      className: `${isSelected ? styles.selected : ''}`,
      itemRef,
    })
  })

export function SortDropdown({ children, onChange }) {
  // custon hook
  const {
    isExpand,
    setIsExpand,
    itemRef,
    handleClick,
    handleKeydown,
    handleBlur,
  } = useDropdown()

  const [selected, setSelected] = useState(children[0].props.children)

  useEffect(() => {
    onChange(selected)
  }, [selected, onChange])

  return (
    <div
      className={`caption-1 ${styles.wrapper} ${isExpand ? styles.expand : ''}`}
      onBlur={handleBlur}
    >
      <button
        type="button"
        id="selectButton"
        aria-expanded={isExpand}
        onClick={handleClick}
        onKeyDown={handleKeydown}
        className={`caption-1 ${styles['btn-trigger']}`}
      >
        {selected}
        <IcArrowUp className={styles['ico-arrow']} />
      </button>
      {isExpand && (
        <ul
          className={`shadow-1pt ${styles.dropdown}`}
          role="listbox"
          aria-labelledby="selectButton"
          ref={itemRef}
        >
          {renderSortDropdownWithProps(
            children,
            selected,
            setIsExpand,
            setSelected,
            itemRef
          )}
        </ul>
      )}
    </div>
  )
}

export function MenuDropdown({ children }) {
  // custon hook
  const {
    isExpand,
    setIsExpand,
    itemRef,
    handleClick,
    handleKeydown,
    handleBlur,
  } = useDropdown()

  return (
    <div
      className={`caption-1 ${styles.wrapper} ${isExpand ? styles.expand : ''}`}
      onBlur={handleBlur}
    >
      <button
        type="button"
        aria-expanded={false}
        onClick={handleClick}
        className={`caption-1 ${styles['btn-more']}`}
        title="관리 메뉴 열기 버튼"
        aria-label="관리 메뉴 열기 버튼"
        onKeyDown={handleKeydown}
      >
        <IcMore className={styles['ico-more']} />
      </button>
      {isExpand && (
        <ul
          className={`shadow-1pt ${styles.dropdown}`}
          role="listbox"
          aria-labelledby="selectButton"
          ref={itemRef}
        >
          {renderMenuDropdownWithProps(children, setIsExpand, itemRef)}
        </ul>
      )}
    </div>
  )
}
