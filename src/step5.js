import React from 'react'
import { render } from 'react-dom'
import { zip } from 'lodash'
import WebAudioScheduler from 'web-audio-scheduler'
import Sampler from './Sampler.step5'

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

  const scheduler = new WebAudioScheduler({ context: audioCtx })

  function trigger(event) {
    const source = audioCtx.createBufferSource()
    source.buffer = event.args.buffer
    source.connect(audioCtx.destination)
    source.start(event.playbackTime)
  }

  return {
    scheduler,
    audioCtx,
    samples,
    bufferMap,
    trigger,
  }
}

app().then(audioProps =>
  render(<Sampler {...audioProps} />, document.getElementById('root')),
)
