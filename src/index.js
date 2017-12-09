try {
  require(`.${window.location.pathname}`)
} catch (e) {
  document.body.innerHTML = 'oops no such path'
}
