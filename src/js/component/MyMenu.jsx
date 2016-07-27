import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router'

import config from '../common/config';

const Sider = React.createClass({
    getDefaultProps: function(){
        return {
            menuList: config.sider.sub[1].child,
            menuStyle: config.sider.sub[1].style,
            openKeys: config.sider.sub[1].openKeys
        }
    },
    getInitialState: function(){
        return {
            selectedKeys: this.props.selectedKey
        };
    },
    handleClick: function(e) {
        this.setState({
            selectedKeys: e.key
        });
    },
    render: function() {

        return  <Menu onClick={this.handleClick}
                    style={this.props.menuStyle}
                    defaultOpenKeys={this.props.openKeys}
                    selectedKeys={[this.state.selectedKeys]}
                    mode="inline">

                    {this.dealMenuList(this.props.menuList)}

                </Menu>;
    },

    dealMenuList: function(list){
        const self = this;
        return list.map(function(item){
            let icon = item.icon ? (<Icon type={item.icon} />): '';
            if(item.items && item.items.length){
                return <Menu.SubMenu key={item.key} title={<span>{icon}<span>{item.title}</span></span>}>
                    {
                        self.dealMenuList(item.items)
                    }
                </Menu.SubMenu>
            }else{
                return <Menu.Item key={item.key}>
                            <Link to={'/'+item.key}><span>{icon}</span><span>{item.title}</span><span style={{float:'right'}}>{item.count}</span></Link>
                        </Menu.Item>
            }
        });
    }
});

export default Sider;
