import { zip } from 'lodash'

async function app() {
  const audioCtx = new AudioContext()
  const samples = ['kick', 'hat', 'snare']

  const responses = await Promise.all(
    samples.map(sample => fetch(`/drums/${sample}.wav`)),
  )

  const bufferMap = await zip(
    samples,
    responses,
  ).reduce(async (acc, [sample, response]) => {
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
    return { ...(await acc), [sample]: audioBuffer }
  }, {})

  function trigger(audioBuffer) {
    const source = audioCtx.createBufferSource()
    source.buffer = audioBuffer
    source.connect(audioCtx.destination)
    source.start()
  }

  window.onkeydown = event => {
    let i = event.keyCode % samples.length
    trigger(bufferMap[samples[i]])
  }
}

app()
