import React, {Component} from 'react'
import {siteListRequest} from './../../../../service'
import PropTypes from 'prop-types'
import {Radio} from 'antd'
const {Group}=Radio
class CollectionType extends Component {
  static displayName = 'CollectionType'
  static  propTypes = {
    dispatch:PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state={
      collectionTypes:[{
        id:'water',
        name:'水位'
      },{
        id:'turbidity',
        name:'浊度'
      },{
        id:'temperature',
        name:'温度'
      },{
          id:'salinity',
          name:'盐度'
      },{
        id:'conductivity',
        name:'电导率'
      },{
        id:'electricity',
        name:'电量'
      }]
    }
  }
  handleChange(e){
    this.props.handleCollectionTypeChange(e);
  }
  renderCollectionTypeCheckBox(){
    return this.state.collectionTypes.map((collectionType,index)=>{
      return <Radio value={collectionType.id} key={index}>{collectionType.name}</Radio>
    })
  }
  render(){
    return <Group style={{ width: '100%' }} onChange={(e)=>this.handleChange(e)}>
    {this.renderCollectionTypeCheckBox()}
  </Group>
  }
}

export default CollectionType
