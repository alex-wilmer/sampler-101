import React from 'react'
import { render } from 'react-dom'
import { zip } from 'lodash'
import WebAudioScheduler from 'web-audio-scheduler'
import Sampler from './Sampler.step4'

async function app() {
  const audioCtx = new AudioContext()
  const scheduler = new WebAudioScheduler({ context: audioCtx })

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

  function start(event) {
    const bpm = 140
    const spb = 60 / bpm
    const t0 = event.playbackTime
    scheduler.insert(t0, trigger, { buffer: bufferMap.kick })
    scheduler.insert(t0 + spb * 1, trigger, { buffer: bufferMap.hat })
    scheduler.insert(t0 + spb * 2, trigger, { buffer: bufferMap.snare })
    scheduler.insert(t0 + spb * 3, trigger, { buffer: bufferMap.hat })
    scheduler.insert(t0 + spb * 4, start)
  }

  function trigger(event) {
    const source = audioCtx.createBufferSource()
    source.buffer = event.args.buffer
    source.connect(audioCtx.destination)
    source.start(event.playbackTime)
  }

  return {
    play: () => scheduler.start(start),
    stop: () => scheduler.stop(),
    audioCtx,
    samples,
    bufferMap,
    trigger,
  }
}

app().then(audioProps =>
  render(<Sampler {...audioProps} />, document.getElementById('root')),
)
