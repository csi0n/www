import Http from '@/utils/Http'
import Transformer from '@/utils/Transformer'
import * as Actions from './store/actions'
import moment from 'moment'

function transformRequest(params) {
    return Transformer.send(params)
}

function transformResponse(params) {
    return Transformer.fetch(params)
}

export function siteListRequest({url = '/frontend/sites'}) {
    return dispatch => {
        Http.get(url)
            .then((res) => {
                dispatch(Actions.siteList(transformResponse(res.data.data)))
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
}
export function collectionDataByDateAreaRequest({ids=[],start='',end='',url='/frontend/sites/load-collection-by-date-area'}) {
  let d = moment();
  let s = start || d.format('YYYY-MM-DD hh:mm:ss');
  let e = end || d.add(36,'h').format('YYYY-MM-DD hh:mm:ss');
  //请求默认拉取36小时内数据
  return dispatch=>{
    new Promise((resolve,reject)=>{
      Http.post(url,transformRequest({ids:ids,start:s,end:e}))
      .then((res)=>{
        dispatch(Actions.collectionDataByDateArea(transformResponse(res.data.data)))
        return resolve()
      })
      .catch((err)=>{
        console.log('response error')
        return reject(err)
      })
    })
  }
}
export function loadTodayCollectionDataRequest({ids=[],url='/frontend/sites/load-today-collection-data'}) {
  return dispatch=>{
    new Promise((resolve, reject) => {
      Http.post(url,transformRequest({ids:ids}))
      .then((res)=>{
        dispatch(Actions.loadTodayCollectionData(transformResponse(res.data.data)))
        return resolve()
      })
      .catch((err)=>{
        const statusCode = err.response.statusCode
        const data = {
          error:null,
          statusCode,
        }

        if (statusCode===422) {
          const resetErrors = {
            errors: err.response.data,
            replace:false,
            searchStr:'',
            replaceStr:''
          }
          data.error = Transformer.resetValidationFields(resetErrors)
        }else if (statusCode === 401) {
          data.error = err.response.data.message
        }
        return reject(data)
      })
    });
  }
}
