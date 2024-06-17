/* eslint-disable no-unused-vars */
import React, { cloneElement, useEffect, useState, useRef } from 'react'
import styles from './Dropdown.module.css'
import { ReactComponent as IcArrowUp } from '../assets/icons/ic_arrow_up.svg'
import { ReactComponent as IcMore } from '../assets/icons/ic_more.svg'

// util function get index round
const getIndex = (index, length) => ((index % length) + length) % length

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
      setIsExpand(false)
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

export function SortDropdownItem({
  setSelected,
  setIsExpand,
  children,
  itemRef,
}) {
  const handleOnMouseDown = (e) => {
    e.stopPropagation()
    console.log('item mouse down')
    setIsExpand(false)
    setSelected(children)
  }

  const handleKeydown = (e) => {
    e.stopPropagation()
    e.preventDefault()

    const { activeElement } = document
    const currentIndex = Array.from(itemRef.current.children).findIndex(
      (element) => element === activeElement
    )
    const currentLength = itemRef.current.children.length

    if (e.keyCode === 13) {
      // 엔터 키 눌렀을 때 ul리스트 닫기
      setSelected(children)
      setIsExpand(false)
    }
    if (e.keyCode === 38) {
      const nextIndex =
        (((currentIndex - 1) % currentLength) + currentLength) % currentLength
      itemRef.current.children[nextIndex].focus()
    }
    if (e.keyCode === 40) {
      // ArrowDown key
      const nextIndex =
        (((currentIndex + 1) % currentLength) + currentLength) % currentLength
      itemRef.current.children[nextIndex].focus()
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

export function MenuDropdownItem(props) {
  const { onClick, children, setIsExpand, itemRef } = props
  console.log('props', props)
  const handleOnMouseDown = (e) => {
    console.log('onclick')
    e.stopPropagation()
    e.preventDefault()
    onClick()
    setIsExpand(false)
  }

  const handleKeyDown = (e) => {
    e.stopPropagation()
    // e.preventDefault()
    console.log(itemRef)

    const { activeElement } = document
    console.log(activeElement)
    const currentIndex = Array.from(itemRef.current.children).findIndex(
      (element) => element === activeElement
    )
    const currentLength = itemRef.current.children.length

    if (e.keyCode === 13) {
      // 엔터 키 눌렀을 때 ul리스트 닫기
      // setIsExpand(false)
    }
    if (e.keyCode === 38) {
      const nextIndex =
        (((currentIndex - 1) % currentLength) + currentLength) % currentLength
      itemRef.current.children[nextIndex].focus()
    }
    if (e.keyCode === 40) {
      // ArrowDown key
      const nextIndex =
        (((currentIndex + 1) % currentLength) + currentLength) % currentLength
      itemRef.current.children[nextIndex].focus()
    }
  }
  return (
    <button type="button" onClick={handleOnMouseDown} onKeyDown={handleKeyDown}>
      {children}
    </button>
  )
}

const renderMenuDropdownWithProps = (children, setIsExpand, itemRef) => {
  console.log(itemRef)
  return React.Children.map(children, (child) =>
    cloneElement(child, {
      setIsExpand,
      itemRef,
    })
  )
}

const renderChildrenWithProps = (
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
  // state
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
        aria-expanded="false"
        onClick={handleClick}
        onKeyDown={handleKeydown}
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
          ref={itemRef}
        >
          {renderChildrenWithProps(
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
  const [isExpand, setIsExpand] = useState(false)
  const itemRef = useRef(null)
  const handleMouseDown = (e) => {
    e.stopPropagation()
    setIsExpand((prev) => !prev)
    return false
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

  return (
    <div
      className={`caption-1 ${styles.wrapper} ${isExpand ? styles.expand : ''}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          console.log('blur')
          setIsExpand(false)
        }
      }}
    >
      <button
        type="button"
        aria-expanded="false"
        onClick={handleMouseDown}
        className={`caption-1 ${styles['btn-more']}`}
        title="관리 메뉴 열기 버튼"
        aria-label="관리 메뉴 열기 버튼"
        onKeyDown={handleKeydown}
      >
        <IcMore className={styles['ico-more']} />
      </button>
      {isExpand && (
        <ul
          className={styles.dropdown}
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
