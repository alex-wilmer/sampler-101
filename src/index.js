try {
  require(`.${window.location.pathname}`)
} catch (e) {
  document.body.innerHTML = 'no module found!'
}
