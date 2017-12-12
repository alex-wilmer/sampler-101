try {
  require(`.${window.location.pathname}`)
} catch (e) {
  document.body.innerHTML = `these are not the droids you're looking for`
}
