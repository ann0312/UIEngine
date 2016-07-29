
import React from 'react';
import { Collapse, Table, Form, Select, Input, Row, Col, Button, Icon } from 'antd';
import { DatePicker, TimePicker, Radio, Switch} from 'antd';
import { Link } from 'react-router';
import Immutable from 'immutable';

import MyForm from './MyForm';
import UForm from './UpdateForm';
import CForm from './CreateForm';
import RForm from './RetrieveForm';

const Panel = Collapse.Panel;
const ComponentFeature = React.createClass({
  getInitialState: function(){
    return {
      resultList: [],
      loading: false,

      updateFromShow: false,
      updateFromItem: {}
    }
  },

  getDefaultProps: function(){
  },

  componentWillMount: function(){

  },

  render: function() {
    const self = this;
    const { item } = this.props;

    return  <div>
        {item.retrieve ? (<MyForm item={item.retrieve} submit={self.handleRetrieve}/>):''}
        {item.create ? (<CForm item={item.create} submit={self.handleCreate}/>):''}
        {item.update ? (<UForm item={item.update} submit={self.handleUpdate} isShow={this.state.updateFromShow} updateItem={this.state.updateFromItem} hideForm={this.hideUpdateForm}/>):''}
        <Collapse defaultActiveKey={item.activeKey}>
          {
            this.state.resultLists.map( function(list){
              return <Panel header={list.title} key={list.key}>
                    {list.title}
              </Panel>
            })
          }
        </Collapse> 
    </div>
  },

  handleCreate: function(info){
    const self = this;
    self.setState({
      loading: true
    });

    this.props.config.Create(info, function(item){
      // 初级接口的坑
      if(!item){
        this.props.config.initData(function(list){
          self.setState({
            loading: false,
            resultList: list
          });
        });
        return;
      }

      let lists = self.state.resultList;
      lists.unshift(item);

      self.setState({
        loading: false,
        resultList: lists
      });
    });
  },

  handleUpdate: function(info){
    const self = this;
    let result = Immutable.fromJS(self.state.resultList);

    let infoN = Immutable.fromJS(self.state.updateFromItem).merge(info).toJS();
    this.props.config.Update(infoN, function(item){
      let resultList = result.map(function(v, i){
        if(v.get('key') === item.key){
          return Immutable.fromJS(item);
        }else{
          return v;
        }
      });
      message.success('更新成功');

      self.setState({
        loading: false,
        updateFromShow: false,
        resultList: resultList.toJS()
      });
    });
  },
  hideUpdateForm: function(){
    this.setState({
      updateFromShow: false,
      updateFromItem: {}
    });
  },

  // 按照搜索更新数据
  handleRetrieve: function(info){
    const self = this;
    self.setState({
      loading: true
    });

    this.props.config.Retrieve(info, function(list){
      self.setState({
        loading: false,
        resultList: list
      });
    });
  },

  // table 操作列回调处理
  operateCallbacks: function(item, btn){
    const self = this;

    if(btn.type){

      let resultList;
      let type = btn.type;
      let itemI = Immutable.fromJS(item);
      let result = Immutable.fromJS(self.state.resultList);

      // table 操作栏目通用设定为 更新与删除 两项
      if(type === 'update'){
        this.setState({
          updateFromShow: true,
          updateFromItem: itemI.toJS()
        });
      }else if(type === 'delete'){
        this.setState({
          loading: true
        });

        this.props.config.Delete(itemI.toJS(), function(){
          resultList = result.filter(function(v, i){
            if(v.get('key') !== itemI.get('key')){
              return true;
            }
          });
          message.success('删除成功');

          self.setState({
            loading: false,
            resultList: resultList.toJS()
          });
        });
      }


    }else if(btn.callback){
      btn.callback(item);
    }
  },

  componentDidMount: function(){
    const self = this;
    this.setState({
      loading: true,
    });
    this.initData();
  },

  initData: function(){
    let list = this.props.item.child;
    let resultLists = [];
    list.forEach((item) => {
      let resultList ={
          title: item.title,
      };

      resultLists.push(resultList);
    });
 
    this.setState({
      resultLists: resultLists,
      loading: false
    }); 
  }
});

export default ComponentFeature;
