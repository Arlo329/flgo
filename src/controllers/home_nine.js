const nineTpl = require('../views/home_nine.html')
const headerTpl = require('../views/home_nine_header.html')
const mainTpl = require('../views/home_nine_main.html')
const footerTpl = require('../views/home_footer.html')

export default {
  render() {
    $('.container').html(nineTpl)
		$('.home-nine-header').html(headerTpl)
		$('.home-nine-main').html(mainTpl)
		$('.footer').html(footerTpl)
  }
}