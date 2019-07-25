/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 纯中文汉字
 */
export function validChineseName(str) {
  const reg = /^([\u4e00-\u9fa5·]{2,10})$/
  return reg.test(str)
}
/**
 * @param {string} str
 * @returns {Boolean}
 * 用户名正则，4到16位（字母，数字，下划线，减号）
 */
export function validUsername(str) {
  const reg = /^[a-zA-Z0-9_-]{4,16}$/
  return reg.test(str)
}

/**
 * @param {string} url
 * @returns {Boolean}
 * 网址 URL
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}
/**
 * @param {string} str
 * @returns {Boolean}
 * 座机号码
 */
export function validLandline(str) {
  const reg = /^0\d{2,3}-\d{7,8}$/
  return reg.test(str)
}
/**
 * @param {string} str
 * @returns {Boolean}
 * 纯数字
 */
export function validNum(str) {
  const reg = /^\d{1,}$/
  return reg.test(str)
}
/**
 * @param {string} str
 * @returns {Boolean}
 * 英文 数字混合
 */
export function validEngnum(str) {
  const reg = /^[A-Za-z0-9]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 纯英文
 */
export function validEnglish(str) {
  const reg = /^[a-zA-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 中国邮编
 */
export function validZipcode(str) {
  const reg = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 * 邮箱
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}
/**
 * @param {string} str
 * @returns {Boolean}
 * 1 2代身份证
 */
export function validIdcard(str) {
  const reg = /(^\d{8}(0\d|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
  return reg.test(str)
}
/**
 * @param {string} str
 * @returns {Boolean}
 * 手机号
 */
export function validPhone(str) {
  const reg = /^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/
  return reg.test(str)
}
/**
 * @param {string} str
 * @returns {Boolean}
 * 银行卡号
 */
export function validBankNo(str) {
  const reg = /^([1-9]{1})(\d{15}|\d{18})$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(http:\/\/|^https:\/\/|^\/\/)((\w|=|\?|\.|\/|&|-)+)/g
  return urlregex.test(textval)
}

/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (
      val === 'null' ||
      val == null ||
      val === 'undefined' ||
      val === undefined ||
      val === ''
    ) {
      return true
    }
    return false
  }
  return false
}
