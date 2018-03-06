import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Row, Col ,Tag} from 'antd';
class SitePopupItem extends Component{
  static  propTypes = {
    site:PropTypes.object.isRequired,
  }
  render(){
    const { site } = this.props
    let status={};
    if (site.origin_device&&site.origin_device.active==='N') {
      status = (
        <Tag color="#f50">未激活</Tag>
      )
    }else {
      status = (
        <Tag color="#87d068">已激活</Tag>
      )
    }
    return <Row>
      <Col span={24}>收集时间:{site.newest_collection_data.collectionDateTime}</Col>
      <Col span={24}>水位:{site.newest_collection_data.water}</Col>
      <Col span={24}>浊度:{site.newest_collection_data.turbidity}</Col>
      <Col span={24}>温度:{site.newest_collection_data.temperature}</Col>
      <Col span={24}>盐度:{site.newest_collection_data.salinity}</Col>
      <Col span={24}>电导率:{site.newest_collection_data.conductivity}</Col>
      <Col span={24}>电量:{site.newest_collection_data.electricity}</Col>
      <Col span={24}>状态:{status}</Col>
    </Row>
  }
}

export default SitePopupItem
