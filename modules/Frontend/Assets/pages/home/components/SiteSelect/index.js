import {connect} from 'react-redux'
import SiteSelect from './SiteSelect'
import Site from './../../../../models/site';
let _=require('lodash')
const mapStateToProps = state => {
  const data=state.frontend.sites
    return {
      sites:!_.isEqual(data,{})?
      _.map(data,(site)=>new Site(site)):
      []
    }
}
export default connect(mapStateToProps)(SiteSelect)
