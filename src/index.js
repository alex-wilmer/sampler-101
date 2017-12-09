const ctx = new AudioContext()

async function main() {
  const response = await fetch('/hi_everybody.wav')
  const arrayBuffer = await response.arrayBuffer()
  const audioBuffer = await ctx.decodeAudioData(arrayBuffer)

  const source = ctx.createBufferSource()

  source.buffer = audioBuffer
  source.connect(ctx.destination)

  // click once for great fun!
  // click twice for broken dreams :(
  document.body.onclick = () => source.start()
}

main()
