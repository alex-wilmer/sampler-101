import React from 'react'
import { render } from 'react-dom'
import { zip } from 'lodash'
import Sampler from './Sampler'

async function app() {
  const audioCtx = new AudioContext()
  const samples = ['kick', 'hat', 'snare', 'cowbell']

  const responses = await Promise.all(
    samples.map(sample => fetch(`/drums/${sample}.wav`)),
  )

  const bufferMap = await zip(samples, responses).reduce(
    async (acc, [sample, response]) => {
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
      return { ...(await acc), [sample]: audioBuffer }
    },
    {},
  )

  function trigger(audioBuffer) {
    const source = audioCtx.createBufferSource()
    source.buffer = audioBuffer
    source.connect(audioCtx.destination)
    source.start()
  }

  return {
    audioCtx,
    samples,
    bufferMap,
    trigger,
  }
}

app().then(audioProps =>
  render(<Sampler {...audioProps} />, document.getElementById('root')),
)
