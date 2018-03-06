import moment from 'moment'
import Model from '@/utils/Model'

class Site extends Model {
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
    this.newest_collection_data=props.newestCollectionData||null
    this.today=props.today||[]
  }
}

export default Site
