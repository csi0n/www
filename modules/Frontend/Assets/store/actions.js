import {
    SITE_LIST,
    SITE_LOAD_TODAY_COLLECTION_DATA,
    COLLECTION_DATA_BY_DATE_AREA
} from './action-types'

export function siteList(payload) {
    return {
        type: SITE_LIST,
        payload
    }
}
export function loadTodayCollectionData(payload) {
  return {
    type:SITE_LOAD_TODAY_COLLECTION_DATA,
    payload
  }
}
export function collectionDataByDateArea(payload) {
  return {
    type:COLLECTION_DATA_BY_DATE_AREA,
    payload
  }
}
