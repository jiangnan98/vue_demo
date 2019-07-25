import CryptoJS from 'crypto-js'
import { JSEncrypt } from 'jsencrypt'
import { getToken } from '@/utils/auth'
import getBrowserInfo from 'get-browser-info'
console.log(getBrowserInfo())
const KP = {
  key:
    localStorage
      .getItem('citySN')
      .split('.')
      .join('') + getBrowserInfo().browser,
  iv:
    getBrowserInfo()
      .browserVersion.split('.')
      .join('') + getBrowserInfo().browser
}
function getAesString(data, key, iv) {
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(iv)
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
function getDAesString(encrypted, key, iv) {
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(iv)
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
const aes = {
  en: data => getAesString(data, KP.key, KP.iv),
  de: data => getDAesString(data, KP.key, KP.iv)
}
const base64 = {
  en: data => CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data)),
  de: data => CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8)
}
const sha256 = data => {
  return CryptoJS.SHA256(data).toString()
}
const md5 = data => {
  return CryptoJS.MD5(data).toString()
}
const randomNumber = data => {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hour = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  return (
    now.getFullYear().toString() +
    month.toString() +
    day +
    hour +
    minutes +
    seconds +
    Math.round(Math.random() * 89 + 100).toString()
  )
}
const sign = (token, timestamp, data) => {
  const ret = []
  for (const it in data) {
    let val = data[it]
    if (
      typeof val === 'object' && //
      (!(val instanceof Array) ||
        (val.length > 0 && typeof val[0] === 'object'))
    ) {
      val = JSON.stringify(val)
    }
    ret.push(it + val)
  }
  ret.sort()
  const signsrc = timestamp + token + ret.join('')
  return md5(signsrc)
}
const signs = data => {
  const token = getToken()
  const timestamp = Date.parse(new Date())
  const nonce = randomNumber()
  let params = ''
  if (data) {
    params = safety(data)
  }
  sessionStorage.setItem('move', params)
  const array = [token, timestamp, nonce, params]
  sessionStorage.setItem('do', timestamp)
  sessionStorage.setItem('not', nonce)
  const ret = []
  for (const it in array) {
    let val = array[it]
    if (
      typeof val === 'object' && //
      (!(val instanceof Array) ||
        (val.length > 0 && typeof val[0] === 'object'))
    ) {
      val = JSON.stringify(val)
    }
    ret.push(val)
  }
  ret.sort()
  let signsrc = ''
  ret.forEach(element => {
    signsrc += element
  })
  sessionStorage.setItem('in', 'webrs')
  sessionStorage.setItem('Safety', md5(signsrc))
  const ip = localStorage.getItem('citySN')
  sessionStorage.setItem('Centre', ip)
  return md5(signsrc)
}
const UnicodeToUtf8 = unicode => {
  var uchar
  var utf8str = ''
  var i

  for (i = 0; i < unicode.length; i += 2) {
    uchar = (unicode[i] << 8) | unicode[i + 1]
    utf8str = utf8str + String.fromCharCode(uchar)
  }
  return utf8str
}

const safety = data => {
  const str = JSON.stringify(data)
  let publicKey = ''
  if (sessionStorage.getItem('PUBKEY')) {
    publicKey = aes.de(sessionStorage.getItem('PUBKEY'))
  } else {
    publicKey = JSON.parse(
      decodeURIComponent(escape(window.atob(getToken().split('.')[1])))
    ).sub
    sessionStorage.setItem('PUBKEY', aes.en(publicKey))
  }
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  const newstr = str
  const result = encryptor.encrypt(newstr)
  return result
}

export { safety, aes, md5, sha256, base64, signs, sign, UnicodeToUtf8 }
