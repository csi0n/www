import {connect} from 'react-redux'
import OverlayRealTimeDataCurve from './OverlayRealTimeDataCurve'
import CollectionByDateArea from './../../../../models/collectionByDateArea';
let _=require('lodash')
const mapStateToProps = state => {
  const data=state.frontend.todayCollectionData
    return {
      overlayRealTimeCollectionData:!_.isEqual(data,{})?
      _.map(data,(collectionData)=>new CollectionByDateArea(collectionData)):
      []
    }
}
export default connect(mapStateToProps,null,null,{withRef:true})(OverlayRealTimeDataCurve)
