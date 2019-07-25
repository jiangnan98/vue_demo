import {
  validChineseName,
  validUsername,
  validLandline,
  validNum,
  validZipcode,
  validEmail,
  validIdcard,
  validPhone,
  validBankNo
} from '@/utils/validate'
const Validator = {
   // 手机
   validPhone () {
    var validPhones = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
      } else if (!validPhone(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return validPhones
  },
   // 银行卡
   validBankNo () {
    var validBankNos = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入银行卡号'))
      } else if (!validBankNo(value)) {
        callback(new Error('银行卡号格式错误 请核对'))
      } else {
        callback()
      }
    }
    return validBankNos
  },
  // 中文名
  validChineseName () {
    var validChineseNames = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入中文姓名'))
      } else if (!validChineseName(value)) {
        callback(new Error('Are you Chinese? 请输入中文姓名'))
      } else {
        callback()
      }
    }
    return validChineseNames
  },
  // 用户名
  validUsername () {
    var validUsernames = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else if (!validUsername(value)) {
        callback(new Error('4到16位（字母，数字，下划线，减号）'))
      } else {
        callback()
      }
    }
    return validUsernames
  },
  // 座机
  validLandline () { 
    var validLandlines = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入座机号码'))
      } else if (!validLandline(value)) {
        callback(new Error('座机号码格式不正确 请核对后输入'))
      } else {
        callback()
      }
    }
    return validLandlines
  },
  // 纯数字
  validNum () {
    var validNums = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请按要求输入数字'))
      } else if (!validNum(value)) {
        callback(new Error('请按要求输入数字'))
      } else {
        callback()
      }
    }
    return validNums
  },
  // 邮编
  validZipcode () {
    var validZipcodes = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮编'))
      } else if (!validZipcode(value)) {
        callback(new Error('邮编格式不正确'))
      } else {
        callback()
      }
    }
    return validZipcodes
  },
  // 邮箱
  validEmail () {
    var validEmails = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮箱'))
      } else if (!validEmail(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    return validEmails
  },
  // 身份证
  validIdcard () {
    var validIdcards = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输身份证号码'))
      } else if (!validIdcard(value)) {
        callback(new Error('身份证号码格式不正确'))
      } else {
        callback()
      }
    }
    return validIdcards
  },
}
 
// 对Validator的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "$valid", { value: Validator });
  }
};