import React from 'react'

export default p => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    {p.children}
  </div>
)
