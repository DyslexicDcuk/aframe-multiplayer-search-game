window.AFRAME.registerComponent('change-color-on-hover', {
  schema: {
    color: {default: 'magenta'}
  },
  init: function () {
    const data = this.data
    const el = this.el
    const defaultColor = el.getAttribute('material').color

    el.addEventListener('mouseenter', function () {
      el.setAttribute('material', 'color', data.color)
    })
    el.addEventListener('mouseleave', function () {
      el.setAttribute('material', 'color', defaultColor)
    })
  }
})
