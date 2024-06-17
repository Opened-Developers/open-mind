import React, { cloneElement, useEffect, useState } from 'react'
import styles from './Dropdown.module.css'
import { ReactComponent as IcArrowUp } from '../assets/icons/ic_arrow_up.svg'
import { ReactComponent as IcMore } from '../assets/icons/ic_more.svg'

export function SortDropdownItem({ setSelected, setIsExpand, children }) {
  const handleOnMouseDown = (e) => {
    e.stopPropagation()
    setIsExpand(false)
    setSelected(children)
  }

  const handleKeydown = (e) => {
    e.stopPropagation()
    if (e.keyCode === 13) {
      // 엔터 키 눌렀을 때 ul리스트 닫기
      setSelected(children)
    }
  }
  return (
    <button
      type="button"
      onMouseDown={handleOnMouseDown}
      onKeyDown={handleKeydown}
    >
      {children}
    </button>
  )
}
export function MenuDropdownItem({ onClick, setIsExpand, children }) {
  return (
    <button
      type="button"
      onMouseDown={() => {
        onClick()
        setIsExpand(false)
      }}
    >
      {children}
    </button>
  )
}

const renderMenuDropdownWithProps = (children, setIsExpand) =>
  React.Children.map(children, (child) =>
    cloneElement(child, {
      setIsExpand,
    })
  )

const renderChildrenWithProps = (
  children,
  selected,
  setIsExpand,
  setSelected
) =>
  React.Children.map(children, (child) => {
    const childText = child.props.children
    const isSelected = childText === selected

    return cloneElement(child, {
      setSelected,
      setIsExpand,
      className: `${isSelected ? styles.selected : ''}`,
    })
  })

export function SortDropdown({ children, onChange }) {
  // state
  const [isExpand, setIsExpand] = useState(false)
  const [selected, setSelected] = useState(children[0].props.children)

  useEffect(() => {
    onChange(selected)
  }, [selected, onChange])

  const handleMouseDown = (e) => {
    e.stopPropagation()
    setIsExpand((prev) => !prev)
    return false
  }
  return (
    <div
      className={`caption-1 ${styles.wrapper} ${isExpand ? styles.expand : ''}`}
      onBlur={() => {
        setIsExpand(() => false)
      }}
    >
      <button
        type="button"
        id="selectButton"
        aria-expanded="false"
        onClick={handleMouseDown}
        className={`caption-1 ${styles['btn-trigger']}`}
      >
        {selected}
        <IcArrowUp className={styles['ico-arrow']} />
      </button>
      {isExpand && (
        <ul
          className={styles.dropdown}
          role="listbox"
          aria-labelledby="selectButton"
        >
          {renderChildrenWithProps(
            children,
            selected,
            setIsExpand,
            setSelected
          )}
        </ul>
      )}
    </div>
  )
}

export function MenuDropdown({ children }) {
  const [isExpand, setIsExpand] = useState(false)

  const handleMouseDown = (e) => {
    e.stopPropagation()
    setIsExpand((prev) => !prev)
    return false
  }

  return (
    <div
      className={`caption-1 ${styles.wrapper} ${isExpand ? styles.expand : ''}`}
      onBlur={() => {
        setIsExpand(() => false)
      }}
    >
      <button
        type="button"
        aria-expanded="false"
        onClick={handleMouseDown}
        className={`caption-1 ${styles['btn-more']}`}
        title="관리 메뉴 열기 버튼"
        aria-label="관리 메뉴 열기 버튼"
      >
        <IcMore className={styles['ico-more']} />
      </button>
      {isExpand && (
        <ul
          className={styles.dropdown}
          role="listbox"
          aria-labelledby="selectButton"
        >
          {renderMenuDropdownWithProps(children, setIsExpand)}
        </ul>
      )}
    </div>
  )
}
