import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Upload,Collapse, Tabs, Form,Select, Checkbox, Radio, 
        Table, Switch, Button, Icon, Menu, Spin, Input, Col } from 'antd';
import classNames from 'classnames';
import MyMenu from './MyMenu';
import Header from './Header';

const InputGroup = Input.Group;

class IdeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
         focus: false,
       current: '',
         theme: 'light',
          menu: [],
          list: [],
         value: ''
    };
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

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
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

  dealMenuList(list) {
    const self = this;
    return list.map (function(item) {
            let icon = item.icon ? (<Icon type={item.icon} />): '';
            if(item.child && item.child.length){
                return <Menu.SubMenu key={item.key} title={<span>{icon}<span>{item.text}</span></span>}>
                    {
                        self.dealMenuList(item.child)
                    }
                </Menu.SubMenu>
            } else {
                return <Menu.Item key={item.key}>
                            <Link to={item.url}>{icon}{item.text}<span style={{float:'right'}}>{item.count}</span></Link>
                       </Menu.Item>
            }
        });
  }

  render() {
    var item = this.props.item;
    if(item.layout){
      return <Col span={item.col} className={item.title} style={item.styles}>
      {this.props.children}
      </Col>
    } else {
      switch(item.type){
          case 'side': {
                       return  <aside style={item.style}>{this.props.children}</aside>
                       };
          case 'content': {
                       return  <section>{this.props.children}</section>
                       };
          case 'header': {
                       return  <Header>{this.props.children}</Header>
                       };
          case 'menu': {
                       return  <MyMenu item={item} selectedKey={item.selectedKey} />
                       };
        case  'form': {
                    return <MyForm />;
                      };
        case 'table': {
            const data = [];
            for (let i = 1; i < 80; i++) {
              data.push({
                key: i,
                customer: `王大锤${i}`,
                number: 32,
                contact: `呵呵${i}`,
                phone: `1383843822${i}`,
                type: '购销',
                createdDate: '2016-07-20',
                state: '进行中',
              });
            }
            item.columns[item.lastkey] = { title: '操作', dataIndex: 'operation', key: 'operation',fixed: 'right', width:100, render: (text, record) => <span><Link to={`/view?id=${record.key}`}>详情</Link><span className='ant-divider'></span><Link to={`/progress?id=${record.key}`}>查看轨迹</Link></span> };
            return <Table dataSource={data} columns={item.columns} scroll={item.size}/>
                      };
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
                  let icon = item.icon ? (<Icon type={item.icon} />): '';
                  return <div style={item.styles}>
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
          case 'search': {
                  let icon = item.icon ? (<Icon type={item.icon} />): '';
                  const btnCls = classNames({
                    'ant-search-btn': true,
                    'ant-search-btn-noempty': !!this.state.value.trim(),
                  });
                  const searchCls = classNames({
                    'ant-search-input': true,
                    'ant-search-input-focus': this.state.focus,
                  });
                  return ( 
                          <div className="ant-search-input-wrapper" style={item.styles}>
                          <InputGroup className={searchCls}>
                          { item.child.map( function(item){
                            if(item.type == 'input'){
                              return <Input placeholder={item.placeholder} />
                             }
                             if(item.type == 'button'){
                               return <div className="ant-input-group-wrap">
                               <Button icon={item.icon} className={btnCls} size={item.size} />
                               </div>
                             }
                            })
                          }
                          </InputGroup>
                          </div>
                         )
            };
            case 'logo': return <div className="ant-layout-logo" style={item.style}><img src={item.url} /></div>;
          case 'button': return <Button type={item.buttonType} size={item.size} icon={item.icon}></Button>;
          case 'goBack': return <a onClick={this.goBack}>{item.text}</a>;
          default:
                  let icon = item.icon ? `<i class='anticon anticon-${item.icon}'></i>`: '';
                  var tag  =  `<${item.type}>${icon}${item.text}</${item.type}>`;
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
