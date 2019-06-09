const meTpl = require('../views/home_me.html')
export default {
  render() {
    $('.header').html(meTpl)
  }
}