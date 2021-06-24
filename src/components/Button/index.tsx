import React, { ButtonHTMLAttributes } from 'react';

// Style
import './style.scss'

// Type
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}


export function Button({
  isOutlined = false, ...props
}: ButtonProps) {

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <div>
      <button
        className={`button ${isOutlined ? 'outlined' : '' }`}
        {...props}
      >
      </button>
    </div>
  )
}