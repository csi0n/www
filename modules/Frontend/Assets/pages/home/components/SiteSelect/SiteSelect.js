import React, {Component} from 'react'
import {siteListRequest} from './../../../../service'
import PropTypes from 'prop-types'
import {Select} from 'antd'
const {Option} = Select
class SiteSelect extends Component {
  static displayName = 'SiteSelect'
  static  propTypes = {
    sites:PropTypes.array.isRequired,
    dispatch:PropTypes.func.isRequired
  }
  handleChange(e){
    this.props.handleSiteSelectChange(e);
  }
  renderSiteOption(){
    return this.props.sites.map((site,index)=>{
      return <Option key={site.id}>{site.name}</Option>
    })
  }
  render(){
    return <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="请选择站点"
    onChange={(e)=>this.handleChange(e)}
  >
    {this.renderSiteOption()}
  </Select>
  }
}

export default SiteSelect
