const rankTpl = require('../views/top_rank.html')
export default {
  render() {
    $('.header').html(rankTpl)
  }
}