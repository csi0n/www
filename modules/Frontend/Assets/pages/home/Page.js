import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {siteListRequest} from '../../service'
import {Spin} from 'antd';
import {HomeMenuControl} from '../../controls'
import RealTimeDataCurve from './components/RealTimeDataCurve'
import OverlayRealTimeDataCurve from './components/OverlayRealTimeDataCurve'
import HistoryDataCurve from './components/HistoryDataCurve'
import SitePopupItem from './components/SitePopupItem'
import HistoryRealTimeDataCurve from "./components/HistoryRealTimeDataCurve";


import 'moment/locale/zh-cn';
moment.locale('zh-cn');

let ReactDom = require('react-dom')

let _ = require('lodash')
let mapboxGl = require('mapbox-gl')
let isAddPornt = false;

class Page extends Component {
    static displayName = 'HomePage'
    static  propTypes = {
        sites: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,
    }
    constructor(props){
        super(props)

        this.state = {
            timeFlag: null,
        }
    }
    getSiteData(){
        let self = this;
        clearTimeout(this.state.timeFlag);
        this.props.dispatch(siteListRequest({}));

        this.setState({
            timeFlag: setTimeout(() => {
                self.getSiteData();
            }, this.props.cycleTime * 1000 * 60)
        })
    }

    addPoint(sites){
        if(isAddPornt) return;
        let {map} = this.mapbox;
        let features = [];


        _.map(sites, (site) =>{
            if (_.indexOf(this.props.disableIds, site.id) <= -1) {
                let obj = {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [site.latitude, site.longitude]
                    },
                    "properties": {
                        "title": site.name,
                        "icon": "monument"
                    }
                };
                features.push(obj);
            }
        });

        map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": features
                }
            },
            "paint": {
                "text-color": "#FFF"
            },
            "layout": {
                "icon-image": "{icon}-15",
                "text-field": "{title}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top"
            }
        });
        isAddPornt = true;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.sites) {

            // if (!this.props.sites.equals(nextProps.sites)) {
            const {sites} = nextProps
            let {map} = this.mapbox;

            if (this.popupList.length > 0) {
                this.popupList.forEach((popop) => {
                    popop.remove();
                })
                this.popupList = [];
            }
            this.addPoint(sites);

            _.map(sites, (site) => {
                if (_.indexOf(this.props.disableIds, site.id) <= -1) {
                    let id = `site-${site.id}`,
                        popup = new mapboxGl.Popup({closeOnClick: false, closeButton: false})
                            .setLngLat([site.latitude, site.longitude])
                            .setHTML(`<div style="width:150px" class="site-popup" id="${id}"></div>`)
                            .addTo(map)
                    this.popupList.push(popup);
                    ReactDom.render(
                        <SitePopupItem site={site}/>,
                        document.getElementById(id)
                    )
                }
            })
            // }
        }
    }

    componentDidMount() {
        mapboxGl.accessToken = 'pk.eyJ1IjoiY3NpMG4iLCJhIjoiY2piMWkyeHJmMjN0NzJxcWtnaXkwenI5dyJ9.BzW8wKThr51MpmiKHi4j_w'
        let map = new mapboxGl.Map(this.props.mapboxOptions)

        let homeMenuControl = new HomeMenuControl({
            callback: {
                menuClick: (e) => {
                    switch (Number(e.key)) {
                        case 1:
                            this.refs['realTimeDataCurve'].getWrappedInstance().toggleVisible()
                            break;
                        case 2:
                            this.refs['overlayRealTimeDateCurve'].getWrappedInstance().toggleVisible()
                            break;
                        case 3:
                            this.refs['historyDataCurve'].getWrappedInstance().toggleVisible()
                            break;
                        case 4:
                            this.refs['historyRealTimeDataCurve'].getWrappedInstance().toggleVisible()
                            break;
                        default:
                    }
                }
            }
        })
        map.addControl(homeMenuControl)
        homeMenuControl.init()
        map.addControl(new mapboxGl.NavigationControl(), 'top-left')
        map.addControl(new mapboxGl.FullscreenControl(), 'top-left')
        const {dispatch} = this.props;
        this.mapbox = {
            map: map
        }

        map.on('load', () => {
            this.popupList = [];
            this.getSiteData();
            // setInterval(() => {
            //     dispatch(siteListRequest({}))
            // }, this.props.cycleTime * 1000)

            // setTimeout(() => {
            //     window.href.reload()
            // }, this.props.reloadTime * 1000 * 60 * 60)
        })
    }

    render() {
        return (
            <div style={{height: '100%', width: '100%'}}>
                <div id="map"></div>
                <RealTimeDataCurve ref="realTimeDataCurve"></RealTimeDataCurve>
                <OverlayRealTimeDataCurve ref="overlayRealTimeDateCurve"></OverlayRealTimeDataCurve>
                <HistoryDataCurve ref="historyDataCurve"></HistoryDataCurve>
                <HistoryRealTimeDataCurve ref="historyRealTimeDataCurve"></HistoryRealTimeDataCurve>
            </div>
        )
    }
}

export default Page