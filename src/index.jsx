// 样式
import './css/style';

// js
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';

import Header from './js/component/Header';
import MyMenu from './js/component/MyMenu';
import IdeComponent from './js/component/IdeComponent';

import config from './js/common/config';

const components = config.main.components;
const App = React.createClass({
	getDefaultProps: function(){
  },
    getInitialState: function(){
        return {}
    },
    componentWillMount: function(){},

  dealLayoutList:function(lists) {
    const self = this;
    return lists.map(function(item) {
        if(item.sub && item.sub.length){
            return <IdeComponent location={self.props.location} key={item.key} type={item.type} item={item} callbackComponent={callbackComponent}>
            { self.dealLayoutList(item.sub) }
            </IdeComponent>
        }else{
            let icon = item.icon ? (<Icon type={item.icon} />): '';
            return <IdeComponent FeatureID={self.props.params.FeatureId||item.selectedKey} location={self.props.location} key={item.key} item={item} callbackComponent={callbackComponent}>{icon}{item.text}</IdeComponent>
        }
    });
},
    render: function(){
		return          <div style={{background:'#D1EEEE'}}>
                        <aside style={config.sider.style}>
                            {this.dealLayoutList(config.sider.sub)}
                        </aside>

                        <section className="main-container">
                    <Header />
                            {
                                config.permission?
                                    (<Main FeatureId ={this.props.params.FeatureId||config.sider.sub[1].selectedKey}/>):
                                    (<div className="unpermission">
                                        您暂无权限处理该系统工作，请先
                                        <a href={config.loginUrl}>登录</a>
                                        或者找相关人员申请权限。
                                    </div>)
                            }
                        </section>
                </div>
	},

    componentDidMount: function(){
    },
    componentWillReceiveProps: function(newProps){},
    shouldComponentUpdate: function(){
        return true;
    },
    componentWillUpdate: function(){},
    componentDidUpdate: function(){},
    componentWillUnmount: function(){}
});
const Main = React.createClass({
    render: function(){
        const id = this.props.FeatureId;
        const Data = config.main.components[id] || config.main.components[config.sider.sub[1].selectedKey];
        const Feature = Data.component;
        const title = Data.title;

        return  <div key={id}>
                    <h3 className="f-title">{title}</h3>
                    <Feature />
                </div>
    }
});

  function callbackComponent(item) {
    return dealLayoutList(item);
  }

  function dealLayoutList(lists) {
    return lists.map(function(item) {
        if(item.sub && item.sub.length){
          let icon = item.icon ? (<Icon type={item.icon} />): '';
          return <IdeComponent key={item.key} type={item.type} item={item} callbackComponent={callbackComponent}>
            { dealLayoutList(item.sub) }
          </IdeComponent>
        }else{
          let icon = item.icon ? (<Icon type={item.icon} />): '';
          return <IdeComponent key={item.key} item={item} callbackComponent={callbackComponent}>{icon}{item.text}</IdeComponent>
        }
    });
}

ReactDom.render((
    <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="/:FeatureId" component={App} />
    </Router>
), document.getElementById('react-content'));
