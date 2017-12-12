import React from 'react'
import Row from './components/Row'
import Track from './components/Track'
import Pad from './components/Pad'

class Sampler extends React.Component {
  state = {
    tracks: {
      cowbell: [0, 0, 0, 0, 0, 0, 0, 0],
      hat: [0, 0, 0, 0, 0, 0, 0, 0],
      snare: [0, 0, 0, 0, 0, 0, 0, 0],
      kick: [0, 0, 0, 0, 0, 0, 0, 0],
    },
  }
  toggle = (name, active, index) => {
    const track = this.state.tracks[name]
    const newTrack = Object.assign([], track, { [index]: !active })

    this.setState({
      tracks: {
        ...this.state.tracks,
        [name]: newTrack,
      },
    })
  }
  play = event => {
    const bpm = 200
    const spb = 60 / bpm
    const t0 = event.playbackTime

    const tracks = Object.entries(this.state.tracks)

    tracks.forEach(([track, pads]) => {
      pads.forEach((pad, index) => {
        if (pad) {
          this.props.scheduler.insert(t0 + spb * index, this.props.trigger, {
            buffer: this.props.bufferMap[track],
          })
        }
      })
    })

    this.props.scheduler.insert(t0 + spb * 8, this.play)
  }
  render() {
    return (
      <div>
        <button onClick={() => this.props.scheduler.start(this.play)}>
          play
        </button>
        <button onClick={() => this.props.scheduler.stop()}>stop</button>
        <hr />
        {Object.entries(this.state.tracks).map(([track, pads]) => (
          <Row key={track}>
            <Track>{track}</Track>
            {pads.map((active, index) => (
              <Pad
                key={index}
                active={active}
                onClick={() => this.toggle(track, active, index)}
              />
            ))}
          </Row>
        ))}
      </div>
    )
  }
}

export default Sampler
