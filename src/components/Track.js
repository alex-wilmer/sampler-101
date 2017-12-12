import React from 'react'

export default p => (
  <div
    style={{
      width: 100,
      margin: 10,
      padding: 10,
      textAlign: 'center',
      display: 'inline-block',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      letterSpacing: 2,
    }}
  >
    {p.children}
  </div>
)
