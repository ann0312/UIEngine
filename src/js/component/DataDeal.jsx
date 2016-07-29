// 含有可操作 table 栏的数据展示
import React from 'react';

import FeatureSetConfig from './FeatureSetConfig';

import Immutable from 'immutable';
//https://github.com/ded/reqwest
import Reqwest from 'reqwest';

import testData from '../common/test-data';


const conf = {

    type: 'tableList', // tableList graphList simpleObject complexObject 
    // 初始化页面的数据 回调函数传入 items 列表
    initData: function(callback){

        let data = {
            type: 'entry_list',
            num: 20,
            ua: 'bd_1_1_1_5-5-0-0_1',
            cuid: '00000000000000000000000000000000%7C0000000000000000',
            channel: 'AA_0',
            dir: 'up'
        }

        Reqwest({
            url: 'http://uil.cbs.baidu.com/rssfeed/fetch?fn=?',
            data: data,
            type: 'jsonp',
            jsonpCallback: 'fn',
            success: function (data) {
                //let lists = data.data.stream_data;

                  //模拟数据
                  let lists = testData.dataShow;
 
                // 必须要向数据中 添加唯一的 key
                lists.forEach(function(ele) {
                    ele.key = ele.id;
                });

                callback(lists);
            }
        });

    },

    //增删改查
    Create: function(){},
    Delete: function(data, callback){

        let dataI = Immutable.fromJS({
            type: 'entry_list'
        }).merge({id: data.key});
 
        // ... 操作删除请求
        console.log(dataI.toJS());
 
        // 模拟请求删除成功的回调
        setTimeout(function(){
            callback();
        }, 1000)
 
    },
    Update:function(){},


    Retrieve: function(data, callback){

        let dataI = Immutable.fromJS({
            type: 'entry_list',
            num: 20,
            ua: 'bd_1_1_1_5-5-0-0_1',
            cuid: '00000000000000000000000000000000%7C0000000000000000',
            channel: 'AA_0',
            dir: 'up'
        }).merge(data);

        Reqwest({
            url: 'http://uil.cbs.baidu.com/rssfeed/fetch?fn=?',
            data: dataI.toJS(),
            type: 'jsonp',
            jsonpCallback: 'fn',
            success: function (data) {
                let lists = data.data.stream_data;
                // 必须要向数据中 添加唯一的 key
                lists.forEach(function(ele) {
                    ele.key = ele.id;
                });

                //正式使用数据需打开
                //callback(lists);
            }
        });
            //模拟按照状态查询
            var lists;
            if(data.stype == 'buySale') {lists = testData.dataShow;}
            else {lists = testData.dataShowRelySale;}
            lists.forEach(function(ele) {
                ele.key = ele.id;
            });
            callback(lists);

    },
};


//整合方法与数据,再转换为react组件。
const Feature2 = React.createClass({

render: function() {
    const { item }  = this.props;
    return <div>{FeatureSetConfig(conf,item)}</div>;

}
});

export default Feature2;
