/* eslint-disable no-const-assign */
import React, { useState } from 'react';

export function Button() {

  const [caunter, setCaunter] = useState(0)

  function increment() {
    setCaunter(caunter + 1)
  }

  return (
    <div>
      <button onClick={increment}>{caunter}</button>
    </div>
  )
} 