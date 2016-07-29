// 纯数据展现情况列表
import React from 'react';
import ReactEcharts from 'echarts-for-react';

import { Table, Form, Select, Input, Row, Col, Button, Icon } from 'antd';
import { DatePicker, TimePicker, Radio, Switch} from 'antd';
import { Upload, Modal, message, Spin} from 'antd';

import { Link } from 'react-router';

import Immutable from 'immutable';
import Reqwest from 'reqwest';

import CFormItem from './CreateFormItem';
// 搜索查询栏form 创建新item-form 更新form 
import UForm from './UpdateForm';
import CForm from './CreateForm';
import RForm from './RetrieveForm';
import MyForm from './MyForm';
import MyTable from './MyTable';
import MyCollapse from './MyCollapse';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


// 依赖 config 主题生成react 组件函数
const FeatureSet = (config,configItem) => {

    let simpleFeature = React.createClass({
        getInitialState: function(){
            return {
                item:{},
                loading: false,
    
                updateFromShow: false,
                updateFromItem: {}
            }
        },
        
        componentWillMount: function(){
        },

        render: function() {
            const self = this;
            const itemInfo = this.state.item;
            const { item } = this.props;

            const { getFieldProps } = this.props.form;
            const formItemLayout = {
                labelCol: { span: 3 },
                wrapperCol: { span: 18 },
            };

            const operate = config.operate || [];

            return  <div className="featureItem"> 
                        <Form horizontal className='p-relative'>
                            {
                                this.state.loading?
                                    <div className="formLayout">
                                        <Spin size="large" />
                                    </div>:
                                    ''
                            }
                            { 
                                config.UType.map(function(item){
                                    item.defaultValue = itemInfo[item.name]||'';
                                    return <CFormItem key={item.name} getFieldProps={getFieldProps} formItemLayout={formItemLayout} item={item}/>
                                })
                            }
                        </Form>
                        { 
                            operate.map(function(btn){
                                return <Button key={btn.text} type="primary" size="large" onClick={self.operateCallbacks.bind(self, btn)} style={btn.style}>{btn.text}</Button>
                            })
                        }
                    </div>
        },

        componentDidMount: function(){
            const self = this;
            self.setState({
                loading: true
            });
            
            config.initData(function(item){
                self.setState({
                    item: item,
                    loading: false
                });
            });
        },

        operateCallbacks: function(btn){
            const self = this;

            let itemI = Immutable.fromJS(this.props.form.getFieldsValue());

            if(btn.type === 'update'){

                const self = this;
                

                config.Update(itemI.toJS(), function(item){

                    message.success('更新成功');
                    
                    self.setState({
                        item: item
                    });
                });

               
            }else if(btn.callback){
                btn.callback(itemI.toJS());
            }
        }
    });
    simpleFeature = Form.create()(simpleFeature);
    

    let graphFeature = React.createClass({
        getInitialState: function(){
            return {
                option: config.option
            }
        },
        
        componentWillMount: function(){
        },

        render: function() {
            const self = this;
            const itemInfo = this.state.item;

            const operate = config.operate || [];

            return  <div className="featureItem">
                        <ReactEcharts
                            option={this.state.option} 
                            style={config.EchartStyle} 
                            className='react_for_echarts' />
                    </div>
        },

        componentDidMount: function(){
            const self = this;
            let option = Immutable.fromJS(self.state.option).toJS();

            config.initData(function(series){
                option.series = series;
                self.setState({
                    option: option
                });
            });
        }
    });

    switch (configItem.type){
        case 'table':
            return <MyTable config={config} item={configItem} />;
            break;

        case 'collapse':
            return <MyCollapse config={config} item={configItem} />;
            break;

        case 'graphList':
            return graphFeature;
            break;
            
        case 'simpleObject':
            return simpleFeature;
            break;

        case 'complexObject':
            return complexFeature;
            break;

        default:
            return <MyTable config={config} item={configItem} />;
            break;
    }
}


export default FeatureSet;
