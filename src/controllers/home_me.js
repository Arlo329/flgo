const meTpl = require('../views/home_me.html')
const headerTpl = require('../views/home_me_header.html')
const mainTpl = require('../views/home_me_main.html')
const footerTpl = require('../views/home_footer.html')

export default {
  render() {
    $('.container').html(meTpl)
		$('.home-me-header').html(headerTpl)
		$('.home-me-main').html(mainTpl)
		$('.footer').html(footerTpl)
  }
}