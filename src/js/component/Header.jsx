import React from 'react';
import { Affix, Icon } from 'antd';

import config from '../common/layout';

const Header = React.createClass({
    getDefaultProps: function(){
        return {
            title: config[1].sub[0].title,
            icon: config[1].sub[0].icon,
            style: config[1].sub[0].style,
        }
    },
    render: function() {
        return  <div style={this.props.style}>
                    <h2>
                        <Icon className="header-icon" type={this.props.icon} />
                        {this.props.title}
                    </h2>
                </div>;
    }
});

export default Header;
