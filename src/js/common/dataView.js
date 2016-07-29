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
      style: {
        width: '15%',
        backgroundColor: "#D1EEEE",
        position: "absolute",
        height: '100%'
      },
      sub: [
        {
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
          ],
        },
      ],
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
              title: '粮达网管理后台详情页',
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
              type: 'goBack',
              title: '返回',
              style: {
              }
            },
            {
              type: 'tab',
              selectKey: "1",
              child: [
                {
                  type: "tabPane",
                  title: "业务可行性报告",
                  key: "1",
                  child: [
                        {
                          type: "collapse",
                          api: '/api/view/info',
                          activeKey: ['1','2','3'],
                          child: [
                            /*type有*种类型
                              free为普通标签布局必须有sub;
                              string为字符串,可配置也可从后台获取,后台获取的格式为：
                              [
                              { content: "string1"},
                              { content: "string2"},
                              ]
                              前台将用p标签定义每一个string。
                              */
                          { title: '一、卖方信息', type: 'string', str:'22342342', api: ''},
                          { title: '二、交易信息', type: 'string', str:'23123123', api: ''},
                          ]
                        },
                  ],
                },
                {
                  type: "tabPane",
                  title: "框架合同",
                  key: "2",
                  child: [
                    { type: "div"},
                  ],
                },
              ],
            },
          ],
        },
      ]
    }
  ]

   // permission: BaiduInfo.permission,
   // loginUrl: BaiduInfo.loginUrl

export default Config;
