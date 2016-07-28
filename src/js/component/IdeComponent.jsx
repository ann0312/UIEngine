import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Upload,Collapse, Tabs, Form,Select, Checkbox, Radio, 
        Table, Switch, Button, Icon, Menu, Spin, Input, Col } from 'antd';
import classNames from 'classnames';
import MyMenu from './MyMenu';
import MyForm from './MyForm';
import MyTable from './MyTable';
import Header from './Header';

import DataDeal from './DataDeal';

//模拟数据
import testData from '../common/test-data';

const InputGroup = Input.Group;

class IdeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      focus: false,
      current: '',
      loading: false,
      theme: 'light',
      menu: [],
      list: [],
      value: ''
    };
  }

  initData() {
  const self = this;
      //模拟数据
    if(this.props.item.type == 'table'){
       setTimeout(function(){
            var newList = testData.dataShow;
            newList.forEach(function(ele) {
                ele.key = ele.id;
            });
            self.setState({
              loading: false,
              data: newList,
            });
       }, 500);
     }
  }

  loadMenu() {
    const { item,location } = this.props;
    if(item.type == 'Menu')
    {
    this.setState({
      current:location.pathname,
    });
    getAll(item.api).then( ({jsonResult}) => {
      const child = this.dealMenuList(jsonResult.data);
      this.setState({
        menu:child,
      });
    });
    } 
  }

  componentWillMount(){
      this.initData();
/*
      const { item } = this.props;
      if(item.api){
          if(item.type == 'collapse'){
              getAll(item.api).then( ({jsonResult}) => {
                  const list = this.dealCollapseList(jsonResult.data);
                  this.setState({
                  list: list,
                  });
              });
          }
      }
*/
  }

  dealCollapseList(list){
      const Panel = Collapse.Panel;
      return list.map( function(item){
          return <Panel header={item.title} key={item.key}>
              {item.content.map( function(item){return <p>{item.text}</p>})}
          </Panel>
      });
  }

  componentWillReceiveProps(newProps) {
    if(newProps.item.api){
        const { item } = newProps;
        if(item.type == 'Menu')
        {
          getAll(item.api).then( ({jsonResult}) => {
            const child = this.dealMenuList(jsonResult.data);
            this.setState({
              menu:child,
            });
          });
        } else {
        }
    }
  }

  goBack() {
    /**
     * 返回上级页面
     * 
     * 优化：
     * 使用 `router` 功能返回上级页面
     */
    window.history.go(-1);
  }

  callback(key) {
    console.log(key);
  }

  render() {
    var item = this.props.item;
    if(item.layout){
      return <Col span={item.col} className={item.title} style={item.styles}>
      {this.props.children}
      </Col>
    } else {
      switch(item.type){
          case 'side':    return  <aside style={item.style}>{this.props.children}</aside>;
          case 'section': return  <section className={item.className}>{this.props.children}</section>;
          case 'menu':    return  <MyMenu item={item} selectedKey={item.selectedKey} />;
          case  'form':   return <MyForm item={item}/>;break;
          case 'table':   return <DataDeal newItem={item} />;break;
          case 'tab': {
                      const TabPane = Tabs.TabPane;
                      const { callbackComponent } = this.props;
                      return <Tabs defaultActiveKey={item.selectKey} >
                      {item.child.map(function (item) {
                      return <TabPane tab={item.text} key={item.key}>
                             {callbackComponent(item.child)}
                             </TabPane>
                      })
                    }
                      </Tabs>
                    };
     case 'collapse': {
                          const Panel = Collapse.Panel;
                          const { callbackComponent } = this.props;
                          const { list } = this.state;

                          return <Collapse defaultActiveKey={item.selectKey}>
                                      {itemContent(item,this.state.list)}
                                 </Collapse> 
                      };
          case 'div': {
                  return <div style={item.style}>
                  {this.props.children}
                  </div>
            };
          case 'h1': {
                  let icon = item.icon ? (<Icon type={item.icon} />): '';
                  return <h1 style={item.styles}>
                  {this.props.children}
                  </h1>
            };
          case 'switch': return <Switch onChange={this.changeTheme} checkedChildren="暗" unCheckedChildren="亮" />
            case 'logo': return <div className="ant-layout-logo" style={item.style}><img src={item.url} /></div>;
          case 'button': return <Button type={item.buttonType} size={item.size} icon={item.icon}></Button>;
          case 'goBack': return <a onClick={this.goBack}>{item.text}</a>;
          default:
                  let icon = item.icon ? `<i class='anticon anticon-${item.icon}'></i>`: '';
                  var tag  =  `<${item.type} class='${item.className}'>${icon}${item.title}</${item.type}>`;
                  function createMarkup() { return {__html:tag}; };
                  return <div style={item.styles} dangerouslySetInnerHTML={createMarkup()} />;
                  
      }
    }
  }
}

IdeComponent.propTypes = {
  children: React.PropTypes.node,
};



/*
   一些大组件的内容，可以LOIS定义，也可以全部都是业务数据。
*/
function itemContent(item,list){

  if(item.sub && item.sub.length){
  } else if(item.api) {
      return list;
  } else {
      return <div>{item.content}</div>
  }

};


export default IdeComponent;
