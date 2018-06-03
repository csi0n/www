import {connect} from 'react-redux'
import RealTimeDataCurve from './RealTimeDataCurve'
import TodayCollectionData from './../../../../models/todayCollectionData';
let _=require('lodash')
const mapStateToProps = state => {
  const data=state.frontend.todayCollectionData
    return {
      todayCollectionDataSites:!_.isEqual(data,{})?
      _.map(data,(todayCollectionData)=>new TodayCollectionData(todayCollectionData)):
      [],
        loopTime: 10
    }
}
export default connect(mapStateToProps,null,null,{withRef:true})(RealTimeDataCurve)
