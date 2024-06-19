import React from 'react'
import styles from './Reaction.module.css'
import { ReactComponent as IcThumbsUp } from '../assets/icons/ic_thumbs_up.svg'
import { ReactComponent as IcThumbsDown } from '../assets/icons/ic_thumbs_down.svg'

function ReactionButton({ children, className, onClick, isSelected }) {
  return (
    <button
      type="button"
      className={`caption-1 ${styles.reaction} ${styles[className]} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function Like({ counter, onClick, isSelected = false }) {
  return (
    <ReactionButton onClick={onClick} className="like" isSelected={isSelected}>
      <IcThumbsUp /> 좋아요 {counter > 0 && counter}
    </ReactionButton>
  )
}

export function Dislike({ counter, onClick, isSelected = false }) {
  return (
    <ReactionButton
      onClick={onClick}
      className="dislike"
      isSelected={isSelected}
    >
      <IcThumbsDown /> 싫어요 {counter > 0 && counter}
    </ReactionButton>
  )
}
