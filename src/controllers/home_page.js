const pageTpl = require('../views/home_page.html')
const headerTpl = require('../views/home_page_header.html')
const mainTpl = require('../views/home_page_main.html')
const footerTpl = require('../views/home_footer.html')

const BScroll = require('better-scroll').default

export default {
	render() {
		$('.container').html(pageTpl)
		$('.header').html(headerTpl)
		$('.main').html(mainTpl)
		$('.footer').html(footerTpl)
		var banner = new Swiper('.swiper-container', {
			autoplay: {
				stopOnLastSlide: false,
				disableOnInteraction: false,
				delay: 1000,
			},
			loop: true,
		})
	}
}