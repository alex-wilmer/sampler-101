import React from 'react'

export default p => (
  <span
    onClick={p.onClick}
    className={`pad ${p.active && 'active'}`}
    style={{
      display: 'inline-block',
      border: '1px solid #876a8e',
      margin: 10,
      width: 50,
      borderRadius: 8,
      height: 50,
    }}
  />
)
