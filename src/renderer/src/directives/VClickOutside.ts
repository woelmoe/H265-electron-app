export default {
  mounted: function (el: any, binding: any) {
    el.clickOutsideEvent = function (event: any) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: function (el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
