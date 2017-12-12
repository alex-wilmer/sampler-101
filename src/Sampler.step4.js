import React from 'react'

class Sampler extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.play}>play</button>
        <button onClick={this.props.stop}>stop</button>
      </div>
    )
  }
}

export default Sampler
