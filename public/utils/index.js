'use strict'
document.write(
  '<script async src="http://pv.sohu.com/cityjson?ie=utf-8"></script>' +
    '<script type="text/javascript" src="./utils/indexDb.js"></script>'
)

setTimeout(function() {
  var Ip = returnCitySN['cip']
  var cityname = returnCitySN['cname']
  localStorage.setItem('citySN', Ip)
  localStorage.setItem('cityname', cityname)
}, 1000)
