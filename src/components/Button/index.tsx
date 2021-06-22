import React, { ButtonHTMLAttributes } from 'react';

// Style
import './style.scss'

// Type
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>


export function Button(props: ButtonProps) {

   // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <div>
      <button className="button" {...props} >
      </button>
    </div>
  )
}