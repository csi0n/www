import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Row, Col} from 'antd';

class SitePopupItemType2 extends Component {
    static  propTypes = {
        site: PropTypes.object.isRequired,
    }

    render() {
        const {site} = this.props
        return <Row className={'site_pop_item'}>
            <Col className={'address'} span={24}><span className="bold">地址:</span>{site.name}</Col>
            <Col className={'collection_date'} span={24}><span className="bold">收集时间:</span>{site.newest_collection_data.dataTime}</Col>
            <Col className={'ctd_temperature'} span={24}><span className="bold">温度:</span>{site.newest_collection_data.ctdTemperature}</Col>
            <Col className={'ctd_conductivity'} span={24}><span className="bold">电导率:</span>{site.newest_collection_data.ctdConductivity}</Col>
            <Col className={'ctd_salinity'} span={24}><span className="bold">盐度:</span>{site.newest_collection_data.ctdSalinity}</Col>
        </Row>
    }
}

export default SitePopupItemType2
