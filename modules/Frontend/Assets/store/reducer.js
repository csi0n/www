import {
    SITE_LIST,
    SITE_LOAD_TODAY_COLLECTION_DATA,
    COLLECTION_DATA_BY_DATE_AREA
} from './action-types'

const initialState = {
  sites:[],
  todayCollectionData:[],
  overlayRealTimeCollectionData:[]
}
const reducer = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case SITE_LIST:
            return siteList(state, payload)
        case SITE_LOAD_TODAY_COLLECTION_DATA:
            return loadTodayCollectionData(state,payload)
        case COLLECTION_DATA_BY_DATE_AREA:
            return collectionDateByDateArea(state,payload)
        default:
            return state
    }
}

function siteList(state, payload) {
    return Object.assign({}, state,{
      sites:[...payload]
    })
}
function loadTodayCollectionData(state,payload) {
  return Object.assign({},state,{
    todayCollectionData:[...payload]
  })
}
function collectionDateByDateArea(state,payload) {
  return Object.assign({},state,{
    overlayRealTimeCollectionData:[...payload]
  })
}

export default reducer
