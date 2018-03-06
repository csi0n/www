import moment from 'moment'
import Model from '@/utils/Model'

class TodayCollectionData extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }
  initialize(props){
    super.initialize(props)
    this.name=props.name||''
    this.longitude=props.longitude||0.00
    this.latitude=props.latitude||0.00
    this.device_id=props.device_id||-99
    this.today=props.today||[]
  }
}

export default TodayCollectionData
