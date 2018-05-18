import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Tag} from 'antd';

class SitePopupItem extends Component {
    static  propTypes = {
        site: PropTypes.object.isRequired,
    }

    render() {
        const {site} = this.props
        let status = {};
        if (site.origin_device && site.origin_device.active === 'N') {
            status = (
                <Tag color="#f64744">未激活</Tag>
            )
        } else {
            status = (
                <Tag color="#37db67">已激活</Tag>
            )
        }
        return <Row className={'site_pop_item'}>
            <Col className={'address'} span={24}><span className="bold">地址:</span>{site.name}</Col>
            <Col className={'collection_date'} span={24}><span className="bold">收集时间:</span>{site.newest_collection_data.collectionDateTime}</Col>
            <Col className={'water'} span={24}><span className="bold">水位:</span>{site.newest_collection_data.water}</Col>
            <Col className={'turbidity'} span={24}><span className="bold">浊度:</span>{site.newest_collection_data.turbidity}</Col>
            <Col className={'temperature'} span={24}><span className="bold">温度:</span>{site.newest_collection_data.temperature}</Col>
            <Col className={'conductivity'} span={24}><span className="bold">盐度:</span>{site.newest_collection_data.salinity}</Col>
            <Col className={'salinity'} span={24}><span className="bold">电导率:</span>{site.newest_collection_data.conductivity}</Col>
            <Col className={'electricity'} span={24}><span className="bold">电量:</span>{site.newest_collection_data.electricity}</Col>
            <Col className={'status'} span={24}><span className="bold">状态:</span>{status}</Col>
        </Row>
    }
}

export default SitePopupItem
