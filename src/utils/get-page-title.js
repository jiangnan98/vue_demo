/**
 * Page Header Design
 * 2019/7/13
 * WEBRS
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
