import React from 'react';
import { Form, Select, Input, Button, Icon , DatePicker, TimePicker, Radio, Switch} from 'antd';
import { Upload, Modal, message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let RForm = React.createClass({
    render: function() {
        const self = this;
        const item = this.props.item;
        const list = item.child;
        return (
                <div style={item.style}>
               { item.direction == 'inline' ? 
                    (<Form inline>
                        {
                            list.map(function(item){
                                return self.dealConfigList(item);
                            })
                        }
                    </Form>):
                    (<Form horizontal>
                        {
                            list.map(function(item){
                                return self.dealConfigList(item);
                            })
                        }
                    </Form>)
               }
                </div>
              );
    },

    dealConfigList: function(item){
        const { getFieldProps } = this.props.form;

        switch (item.type){
            case 'string':
                return <FormItem
                            label={item.label}
                            key={item.name}>
                            <Input placeholder={item.placeholder||''}
                            {...getFieldProps(item.name)} />    
                        </FormItem>
                break;

            case 'date':
                return <FormItem
                            label={item.label}
                            key={item.name}>
                            <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" {...getFieldProps(item.name)} />  
                        </FormItem>
                break;

            case 'select':
                return <FormItem
                            label={item.label}
                            key={item.name}>
                            <Select  {...getFieldProps(item.name, { initialValue: item.defaultValue||item.options[0].value })} >
                                {
                                    item.options.map(function(item){
                                        return <Option key={item.value} value={item.value}>{item.text}</Option>
                                    })
                                }
                            </Select>
                        </FormItem>
                break;

            case 'radio':
                return <FormItem
                            label={item.label}
                            key={item.name}>
                            <RadioGroup {...getFieldProps(item.name, { initialValue: item.defaultValue||item.options[0].value })}>
                                {
                                    item.options.map(function(item){
                                        return <Radio key={item.value} value={item.value}>{item.text}</Radio>
                                    })
                                }
                            </RadioGroup>
                        </FormItem>
                break;

            case 'switch':
                return <FormItem
                            label={item.label}
                            key={item.name}>
                            <Switch {...getFieldProps(item.name, { initialValue: item.defaultValue|| false })} />
                        </FormItem>
                break;

            case 'submit':
                return <FormItem key={item.name}>
                            <Button type={item.labelType} onClick={this.handleSubmit}>{item.label}</Button>
                       </FormItem>

            default:
                return '';
                break;
        }
    },

    handleSubmit: function(){

        console.log('收到表单值：', this.props.form.getFieldsValue());
        switch(item.submitType){

        case 'retrieve':
        }
        this.props.submit(this.props.form.getFieldsValue());
    }
});
RForm = Form.create()(RForm);

export default RForm;
