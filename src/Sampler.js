import React from 'react'

class Sampler extends React.Component {
  state = {
    pads: [
      {
        sample: null,
      },
      {
        sample: null,
      },
      {
        sample: null,
      },
      {
        sample: null,
      },
    ],
  }

  render() {
    let { samples, bufferMap, trigger } = this.props

    return (
      <div>
        {samples.map(sample => (
          <button key={sample} onClick={() => trigger(bufferMap[sample])}>
            {sample}
          </button>
        ))}
      </div>
    )
  }
}

export default Sampler
