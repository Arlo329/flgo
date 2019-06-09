const headerTpl = require('../views/home_page_header.html')
const mainTpl = require('../views/home_page_main.html')
const BScroll = require('better-scroll').default

export default {
	render() {
		$('.header').html(headerTpl)
		$('.main').html(mainTpl)
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