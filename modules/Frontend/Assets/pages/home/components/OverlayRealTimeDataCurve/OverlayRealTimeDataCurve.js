import React, {Component} from 'react'
import moment from 'moment'
import {Modal, Row, Col, Button, DatePicker, Select, Form, Spin, notification} from 'antd'

const FormItem = Form.Item
import SiteSelect from './../SiteSelect'
import CollectionType from './../CollectionType'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react';
import {collectionDataByDateAreaRequest} from './../../../../service'

let _ = require('lodash')

class OverlayRealTimeDataCurve extends Component {
    static displayName = 'OverlayRealTimeDataCurve'
    static  propTypes = {
        overlayRealTimeCollectionData: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            sites: [],
            type: null,
            loading: false
        }

    }

    toggleVisible() {
        this.setState({
            visible: !this.state.visible
        })
    }

    submit() {
        if(this.state.sites.length <=0){
          notification.open({
            message: "提示",
            description: "请先选择站点后再继续操作！"
          })
          return false;
        }
        this.setState({
            loading: true
        })
        this.props.dispatch(collectionDataByDateAreaRequest({
            ids: this.state.sites,
            start: this.state.start,
            end: this.state.end
        }))
    }

    handleSiteSelectChange(sites) {
        this.setState({
            sites: sites
        })
    }

    handleCollectionTypeChange(type) {
        this.setState({
            type: type
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.overlayRealTimeCollectionData) {
            this.setState({
                loading: false
            })
        }
    }

    handleBaseType(type) {
        this.setState({
            baseType: type
        })
    }

    handleTime(value) {
        this.setState({
            start: value[0].format('YYYY-MM-DD'),
            end: value[1].format('YYYY-MM-DD')
        })
    }

    disabledDateHandler(current){
        return current && current > moment();
    }

    renderEchart() {
        return this.props.overlayRealTimeCollectionData.map((site, index) => {
            let xAxisData = [], typeSeries = [], baseTypeSeries = []
            _.map(site.collectionData, (collectionData) => {
                xAxisData.push(collectionData.collectionDateTime)
                typeSeries.push(collectionData[this.state.type])
                baseTypeSeries.push(collectionData[this.state.baseType])
            })
            let options = {
                title: {
                    text: `${site.name}叠加实时数据曲线图`
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [this.state.type, this.state.baseType]
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
                    data: xAxisData
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
                series: [{
                    name: this.state.type,
                    type: 'line',
                    stack: '总量',
                    data: typeSeries
                }, {
                    name: this.state.baseType,
                    type: 'line',
                    stack: '总量',
                    data: baseTypeSeries
                }]
            }
            return <ReactEcharts key={index} style={{marginTop: '20px'}} option={options}/>
        })
    }

    render() {
        return (
            <Modal
                title="叠加实时数据曲线"
                style={{top: 20}}
                width={'80%'}
                visible={this.state.visible}
                onOk={() => this.toggleVisible()}
                onCancel={() => this.toggleVisible()}
                maskClosable={false}
                footer={null}
            >
                <Spin spinning={this.state.loading}>
                    <div className="search-form">
                        <Row gutter={24}>
                            <Col span={18}>
                                <SiteSelect handleSiteSelectChange={(e) => this.handleSiteSelectChange(e)}></SiteSelect>
                            </Col>
                            <Col span={2}>
                                <Button onClick={() => this.submit()} shape="circle" icon="search"/>
                            </Col>
                            <Col span={18}>
                                <CollectionType handleCollectionTypeChange={(e) => this.handleCollectionTypeChange(e.target.value)}></CollectionType>
                            </Col>
                            <Col span={18}>
                                <div className="search-form-inner__item">
                                    <Select defaultValue="water" onChange={(e) => this.handleBaseType(e)}>
                                        <Select.Option value="water">水位</Select.Option>
                                        <Select.Option value="turbidity">浊度</Select.Option>
                                        <Select.Option value="temperature">温度</Select.Option>
                                        <Select.Option value="salinity">盐度</Select.Option>
                                        <Select.Option value="conductivity">电导率</Select.Option>
                                        <Select.Option value="electricity">电量</Select.Option>
                                    </Select>
                                    <DatePicker.RangePicker
                                        showTime={{format: 'HH:mm'}}
                                        format="YYYY-MM-DD HH:mm"
                                        disabledDate={this.disabledDateHandler}
                                        placeholder={['开始时间', '结束时间']}
                                        onOk={(value) => this.handleTime(value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {this.renderEchart()}
                </Spin>
            </Modal>
        )
    }
}

export default OverlayRealTimeDataCurve
