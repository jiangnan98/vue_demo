// const viewGenerator = require('./plop-templates/view/prompt.js')
const componentGenerator = require('./plop-templates/component/prompt.js')

module.exports = function(plop) {
  // plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentGenerator)
}
