/**
 * [Config description]
 * @type {Object}
 *
 * header 管理后台头部配置
 *     title    String  标题
 *     icon     String   标题图标
 *     style    Object  自定义样式
 *
 * sider  管理后台侧栏配置
 *     menu     Array   sider列表
 *     openKeys Array   默认展开的sider区
 *     selectedKey  String  默认打开的功能区
 *     style    Object  自定义样式
 *
 * main  功能区域配置
 *     components   Object  配置sider对应功能区域组件
 *         Feature1     Object  对应sider menu 中的功能key对 应功能组件
 *     style        Object  配置样式
 */

const Config =
    [
      {
        type: 'side',
        col: 3,
        style: {
          width: '15%',
          backgroundColor: "#D1EEEE",
          position: "absolute",
          height: '100%'
        },
        sub: [
          {
            key: 1,
            type:'logo',
            url: 'src/data/images/logo.png',
            style: {
              textAlign: "center",
            }
          },
          {
            type: "menu",
            openKeys:['dataShow2','dataOperate'],
            selectedKey: "dataShow",
            style: {
              background: "none",
            },
            child: [
              {
                title: "我的业务",
                key: "dataShow",
                icon: "bars",
                count: "10",
              },
              {
                title: "我的客户",
                key: "clientShow",
                icon: "bars",
                count: "10",
              },
              {
                title: "我的业绩",
                key: "scoreShow",
                icon: "bars",
                count: "￥1000",
              },
              {
                title: "数据展示项",
                key: "dataShow2",
                icon: "bars",
                items: [
                  {title: "table数据展示项", key: "Feature1-1"},
                  {title: "simple对象数据展示项", key: "Feature1-2"},
                  {title: "数据可视化展示项", key: "Feature1-3"},
                  {title: "综合数据展示", key: "Feature1-4"}
                ]
              },
              {
                title: "数据操作项目",
                key: "dataOperate",
                icon: "bars",
                items: [
                  {title: "table数据搜索操作", key: "Feature2-1"},
                  {title: "table数据增删改操作", key: "Feature2-2"},
                  {title: "simple对象数据修改操作", key: "Feature2-3"}
                ]
              },
              {
                title: "自定义操作项目",
                key: "customOperate",
                icon: "bars",
                items: [
                  {title: "富文本编辑功能", key: "Feature3-1"}
                ]
              },
              {
                title: "导航1",
                key: "subTitle1",
                icon: "setting",
                items: [
                  {title: "选项1", key: "Feature1"},
                  {title: "选项2", key: "Feature2"},
                  {title: "选项3", key: "Feature3"},
                  {   
                    title: "导航3",
                    key: "subTitle3",
                    icon: "",
                    items: [
                      {title: "选项6", key: "Feature6"},
                      {title: "选项7", key: "Feature7"},
                      {title: "选项8", key: "Feature8"}
                    ]
                  }
                ]
              },{
                title: "导航2",
                key: "subTitle2",
                icon: "delete",
                items: [
                  {title: "选项4", key: "Feature4"}
                ]
              },{
                title: "选项5",
                key: "Feature5"
              }
            ]
          }
        ]
      },

      {
        type: 'section',
        className: 'main-container',
        style: {
          height: '100%',
          width: '85%',
        },
        sub: [
          {
            type: "div",
            style: {
              padding: "15px 15px 15px 25px",
              borderBottom: "1px solid #E9E9E9",
              backgroundColor: "#F5F5F5"
            },
            sub: [
                {
                  type: 'h2',
                  title: '粮达网管理后台',
                }
            ]
          },

          {
            type: 'div',
            style: {
              background: "#fff",
              padding: 20
            },
            sub: [
                {
                  type: 'h3',
                  title: '业务列表',
                  className: 'f-title',
                  style: {
                  }
                },
                {
                  type: 'table',
                  size: {
                    x: 800,
                    y: 400,
                  },
                  retrieve: {
                    submitType: 'retrieve',
                    direction: "inline",
                    style: {
                      padding: "15px 0px",
                    },
                    child:[
                      {
                        name: 'keyWord',
                        label: '搜索',
                        type: 'string',
                        placeholder: '按关键字搜索'
                      },{
                        name: 'startDate',
                        label: '开始时间',
                        type: 'date'
                      },{
                        name: 'endDate',
                        label: '结束时间',
                        type: 'date'
                      },{
                        name: 'stype',
                        label: '类型',
                        type: 'select',
                        defaultValue: 'all',
                        options:[{
                          text: '选择类型',
                          value: 'all'
                        },{
                          text: '购销',
                          value: 'buySale'
                        },{
                          text: '寄售',
                          value: 'relySale'
                        }]
                      },{
                        name: 'state',
                        label: '状态',
                        type: 'select',
                        defaultValue: 'all',
                        options:[{
                          text: '选择状态',
                          value: 'all'
                        },{
                          text: '业务发起',
                          value: '发起'
                        },{
                          text: '方案审批',
                          value: '方案审批'
                        },{
                          text: '合同审批',
                          value: '合同审批'
                        },{
                          text: '放款审批',
                          value: '放款审批'
                        }]
                      },
                      {
                        type: "submit",
                        labelType: 'primary',
                        label: '查询',
                      }
                    ],
                  },
                  columns: [
                    {
                      title: 'ID',     // table header 文案
                      dataIndex: 'id', // 数据对象内的属性，也做react vdom 的key
                      type: 'string',     // table 内显示的类型
                      sort: true,         // 是否需要排序
                    }, {
                      title: '客户',
                      dataIndex: 'customer',
                      type: 'string'
                    }, {
                      title: '编号',
                      sort: true,
                      dataIndex: 'number',
                      type: 'string'
                    }, {
                      title: '联系电话',
                      dataIndex: 'phone',
                      type: 'string'
                    }, {
                      title: '业务类型',
                      dataIndex: 'dataType',
                      sort: true,
                      type: 'string'
                    }, {
                      title: '生产时间',
                      dataIndex: 'createdDate',
                      type: 'string'
                    }, {
                      title: '业务状态',
                      dataIndex: 'state',
                      sort: true,
                      type: 'string'
                    }, {
                      title: '操作',
                      type: 'operate',    // 操作的类型必须为 operate
                      width: 100,
                      fixed: 'right', 
                      btns: [{
                        text: '详情',
                        link: 'http://127.0.0.1:8989/#/dataView/',
                        type: 'view'
                      }, {
                        text: '删除',
                        type: 'delete'
                      }],
                    }
                  ],
                },
             ],
      }
    ]
    },

   // permission: BaiduInfo.permission,
   // loginUrl: BaiduInfo.loginUrl
]

export default Config;
