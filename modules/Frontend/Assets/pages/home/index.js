import {connect} from 'react-redux'
import Page from './Page'
import Site from './../../models/site';
let _=require('lodash')
const mapStateToProps = state => {
  const data=state.frontend.sites
    return {
      sites:!_.isEqual(data,{})?
      _.map(data,(site)=>new Site(site)):
      [],
      mapboxOptions:{
        container:'map',
        // style:'mapbox://styles/csi0n/cjbxdhf4cep352rl2lkjd026d',
        // style:'mapbox://styles/csi0n/cjc7bff9r6u8a2rpld68ddsb1',
        style:'mapbox://styles/csi0n/cjei8py8x9uu32ro6pm5n551a',
        center:[121.180740356445, 31.753118515015],
        zoom:9
      },
      cycleTime:10
    }
}
export default connect(mapStateToProps)(Page)
