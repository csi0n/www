import React, {Component} from 'react'
import {Modal,Row,Col,Button,DatePicker} from 'antd'
import SiteSelect from './../SiteSelect'
import CollectionType from './../CollectionType'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react';
import {collectionDataByDateAreaRequest} from './../../../../service'
let _ = require('lodash')
class HistoryDataCurve extends Component{
  static displayName = 'HistoryDataCurve'
  static  propTypes = {
    overlayRealTimeCollectionData:PropTypes.array.isRequired,
    dispatch:PropTypes.func.isRequired,
  }
  constructor(props){
    super(props)

    this.state={
      visible:false,
      sites:[],
      type:null
    }

  }
  toggleVisible(){
    this.setState({
      visible:!this.state.visible
    })
  }
  getOption(){
      return {
          title: {
              text: '历史数据曲线图'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:this.state.legendData
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.state.xAxisData
          },
          yAxis: {
              type: 'value'
          },
          dataZoom: [{
              type: 'inside',
              start: 0,
              end: 100
          }, {
              start: 0,
              end: 10,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%',
              handleStyle: {
                  color: '#fff',
                  shadowBlur: 3,
                  shadowColor: 'rgba(0, 0, 0, 0.6)',
                  shadowOffsetX: 2,
                  shadowOffsetY: 2
              }
          }],
          series: this.state.series
      }
  }
  submit(){
    this.props.dispatch(collectionDataByDateAreaRequest({
      ids:this.state.sites,
      start:this.state.start,
      end:this.state.end
    }))
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.overlayRealTimeCollectionData) {
      let legendData=[],series=[],xAxisData=[],firstMark=true
      _.map(nextProps.overlayRealTimeCollectionData,(site)=>{
        legendData.push(site.name)
        let seryData=[]
        _.map(site.collectionData,(siteDay)=>{
          if (firstMark) {
            xAxisData.push(siteDay.collectionDateTime)
          }
          seryData.push(siteDay[this.state.type])
        })
        firstMark=false
        let sery={
          name:site.name,
          type:'line',
          stack:'总量',
          data:seryData
        }
        series.push(sery)
      })

      this.setState({
        legendData:legendData,
        series:series,
        xAxisData:xAxisData
      })
    }
  }
  handleSiteSelectChange(sites){
    this.setState({
      sites:sites
    })
  }

  handleCollectionTypeChange(type){
    this.setState({
      type:type
    })
  }
  handleTime(value){
    this.setState({
      start:value[0].format('YYYY-MM-DD'),
      end:value[1].format('YYYY-MM-DD')
    })
  }
  render(){
    return (
      <Modal
        title="历史数据曲线"
        style={{top:20}}
        width={'80%'}
        visible={this.state.visible}
        onOk={()=>this.toggleVisible()}
        onCancel={()=>this.toggleVisible()}
        okText="确认"
        cancelText="取消"
      >
      <Row>
        <Col span={4}>
          <SiteSelect handleSiteSelectChange={(e)=>this.handleSiteSelectChange(e)}></SiteSelect>
        </Col>
        <Col span={8} offset={1}>
          <CollectionType handleCollectionTypeChange={(e)=>this.handleCollectionTypeChange(e.target.value)}></CollectionType>
        </Col>
        <Col span={9} offset={1}>
        <DatePicker.RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder={['开始时间', '结束时间']}
          onOk={(value)=>this.handleTime(value)}
        />
        </Col>
        <Col span={1}>
         <Button onClick={()=>this.submit()} shape="circle" icon="search" />
        </Col>
      </Row>
      <ReactEcharts style={{marginTop:'20px'}} option={this.getOption()} />
      </Modal>
    )
  }
}
export default HistoryDataCurve
