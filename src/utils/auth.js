/** 
 * Setting up global cookie operations
 * WEBRS
*/
import Cookies from 'js-cookie'

const TicketKey = 'WEBRS-Ticket-'  + new Date().getFullYear() + '-EntryName'

export function getToken() {
  return Cookies.get(TicketKey)
}

export function setToken(token) {
  return Cookies.set(TicketKey, token, { expires: 7 })
}

export function removeToken() {
  return Cookies.remove(TicketKey)
}
