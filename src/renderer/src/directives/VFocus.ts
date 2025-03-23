export default {
  mounted: function (el: any, binding: any) {
    if (binding.value === true) el.focus()
  }
}
