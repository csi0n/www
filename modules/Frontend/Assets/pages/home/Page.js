import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {siteListRequest} from '../../service'
import {HomeMenuControl} from '../../controls'
import RealTimeDataCurve from './components/RealTimeDataCurve'
import OverlayRealTimeDataCurve from './components/OverlayRealTimeDataCurve'
import SitePopupItem from './components/SitePopupItem'

let ReactDom = require('react-dom')

let _ = require('lodash')
let mapboxGl = require('mapbox-gl')
class Page extends Component {
    static displayName = 'HomePage'
    static  propTypes = {
      sites:PropTypes.array.isRequired,
      dispatch:PropTypes.func.isRequired
    }

    componentWillReceiveProps(nextProps){
      console.log(nextProps);
      if (nextProps.sites) {
        const { sites } = nextProps
        let { map } = this.mapbox;
        _.map(sites,(site)=>{
          let id=`site-${site.id}`,
          popup = new mapboxGl.Popup({closeOnClick:false})
          .setLngLat([site.latitude,site.longitude])
          .setHTML(`<div style="width:150px" id="${id}"></div>`)
          .addTo(map)

          ReactDom.render(
            <SitePopupItem site={site} />,
            document.getElementById(id)
          )
        })
      }
    }
    componentDidMount(){
      mapboxGl.accessToken='pk.eyJ1IjoiY3NpMG4iLCJhIjoiY2piMWkyeHJmMjN0NzJxcWtnaXkwenI5dyJ9.BzW8wKThr51MpmiKHi4j_w'
      let map =new mapboxGl.Map(this.props.mapboxOptions)

      let homeMenuControl = new HomeMenuControl({
        callback:{
          menuClick:(e)=>{
            switch (Number(e.key)) {
              case 1:
                this.refs['realTimeDataCurve'].getWrappedInstance().toggleVisible()
                break;
              case 2:
                this.refs['overlayRealTimeDateCurve'].getWrappedInstance().toggleVisible()
                break;
              default:
            }
          }
        }
      })
      map.addControl(homeMenuControl)
      homeMenuControl.init()
      map.addControl(new mapboxGl.NavigationControl())
      map.addControl(new mapboxGl.FullscreenControl())
      const {dispatch}=this.props;
      this.mapbox={
        map:map
      }
      map.on('load',()=>{
        dispatch(siteListRequest({}));
      })
    }
    render() {
        return (
          <div style={{height:'100%',width:'100%'}}>
          <div id="map"></div>
          <RealTimeDataCurve ref="realTimeDataCurve"></RealTimeDataCurve>
          <OverlayRealTimeDataCurve ref="overlayRealTimeDateCurve"></OverlayRealTimeDataCurve>
          </div>
      )
    }
}
export default Page
