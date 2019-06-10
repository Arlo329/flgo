const classTpl = require('../views/home_class.html')
const headerTpl = require('../views/home_class_header.html')
const mainTpl = require('../views/home_class_main.html')
const footerTpl = require('../views/home_footer.html')

export default {
  render() {
    $('.container').html(classTpl)
		$('.home-class-header').html(headerTpl)
		$('.home-class-main').html(mainTpl)
		$('.footer').html(footerTpl)
  }
}