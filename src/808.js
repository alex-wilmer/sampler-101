const audioCtx = new AudioContext()

function trigger(event, audioBuffer) {
  const source = audioCtx.createBufferSource()
  source.buffer = audioBuffer
  source.connect(audioCtx.destination)
  source.start()
}

async function app() {
  const response = await fetch('/hi_everybody.wav')
  const arrayBuffer = await response.arrayBuffer()
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)

  window.onkeydown = e => {
    console.log(123, e)
  }
}

app()
