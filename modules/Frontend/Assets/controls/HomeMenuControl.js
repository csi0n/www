import { Button, Menu, Dropdown, Icon } from 'antd';
import React, {Component} from 'react'
import {render} from 'react-dom'
 class HomeMenuControl {

    constructor(config) {
        this._config = config;
    }

    onAdd(map) {
        this._map = map;
        let tips = '<div id="home-menu"></div>';
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this._container.innerHTML = tips;
        return this._container;
    }

    getDefaultPosition() {
        return 'top-right'
    }
    init(){
      const menu=(
        <Menu onClick={this._config.callback.menuClick}>
          <Menu.Item key="1">实时数据曲线</Menu.Item>
          <Menu.Item key="2">叠加实时数据曲线</Menu.Item>
        </Menu>
      )

      render(
        <div>
          <Dropdown overlay={menu}>
            <Button type="primary">
              操作<Icon type="down" />
            </Button>
          </Dropdown>
        </div>,
        document.getElementById('home-menu')
      )
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

export default HomeMenuControl;
