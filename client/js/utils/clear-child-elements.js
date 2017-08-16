export const clearChildElements = (wrapperEl) => {
  while (wrapperEl.firstChild) {
    wrapperEl.removeChild(wrapperEl.firstChild)
  }
}
