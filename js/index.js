/**
 * Created by Administrator on 2016/11/2.
 */
$(function () {
  $("#header-box").load("header.html");
  (function () {

  })();
});
$(function () {
  /*引入表单*/
  require.config({
    paths: {
      echarts: "../lib/dist"
    }
  });
  /*加载网页所需图表*/
  require([
      'echarts',
      'echarts/chart/bar', /*柱状图*/
      'echarts/chart/pie', /*饼状图*/
      'echarts/chart/gauge', /*仪表图*/
      'echarts/theme/macarons',
    ],
    function (ec) {
      /*init 初始化数据*/
      var echart1 = ec.init(document.getElementById("form1"), "macarons");
      var echart2 = ec.init(document.getElementById("form2"), "macarons");
      var echart3 = ec.init(document.getElementById("form3"), "macarons");


      var option1 = {
        /*tooltip 工具提示框*/
        tooltip: {
          /*formattar 数据占有比例*/
          formattar: "{a}<br /> {b}:{c}%", /*显示表盘中整体数据比例*/
        },
        /*title　标题*/
        title: {
          text: "学习比例人数", /*文本标题*/
          subtext: "", /*　标题下面的小标题*/
          x: "center"  /*标题所在位置*/
        },
        /*series 表盘所显示数据*/
        series: [{
          name: "学习人数比例", /*提示框显示内容*/
          type: "gauge", /*表盘内容*/
          detail: {formatter: "{value}%"}, /*数据显示*/
          data: [{value: 80, name: "学习人数比例"}]  /*提示框内所显示的数据*/

        }]

      };
      echart1.setOption(option1);
      /*饼状图*/
      var option2 = {
        title: {
          text: "考试通过率",
          subtext: "",
          x: "center",
        },
        tooltip: {

          formatter: "{a}<br />{b}:{c}%",
        },
        series: [{
          type: "pie",
          data: [
            {value: 60, name: "已通过"},
            {value: 40, name: "未通过"}
          ]
        }]

      };
      echart2.setOption(option2);

      /*柱状图*/
      //var option3 = {
      //  title: {
      //    text: "时间、课程、新增课程数",
      //    subtext: "Fay",
      //    x: "center",
      //  },
      //  tooltip: {
      //    formatter: "{a}<br/>{b}:{c}%"
      //  },
      //  itemStyle: {
      //    normal: {
      //      color: function(params) {
      //        // build a color map as your need.
      //        var colorList = [
      //          '#C1232B','#B5C334','#FCCE10',
      //
      //        ];
      //        return colorList[params.dataIndex]
      //      },
      //      label: {
      //        show: true,
      //        position: 'top',
      //        formatter: '{b}\n{c}'
      //      }
      //    }
      //  },data: [12,21,10],
      //  series:[{
      //    type:"bar",
      //    data:[{xAxis:0, y: 350, name:'Line', symbolSize:20},
      //      {xAxis:1, y: 350, name:'Bar', symbolSize:20},
      //      {xAxis:2, y: 350, name:'Bar', symbolSize:20}
      //    ]
      //  }]
      //};
      var option3 = {
        title: {
          text: "时间、课程、新增课程数",
              subtext: "Fay",
              x: "center",
        },
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        grid: {
          borderWidth: 0,
          y: 80,
          y2: 60
        },
        xAxis: [
          {
            type: 'category',
            show: false,
            data: ['时间', '课程', '新增课程数']
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        series: [
          {
            name: '时间、课程、新增课程数222',
            type: 'bar',
            itemStyle: {
              normal: {
                color: function (params) {
                  // build a color map as your need.
                  var colorList = [
                    '#C1232B', '#B5C334', '#FCCE10'
                  ];
                  return colorList[params.dataIndex]
                },
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{b}\n{c}'
                }
              }
            },
            data: [12, 21, 10],
            markPoint: {
              tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(0,0,0,0)',
                formatter: function (params) {
                  return '<img src="'
                    + params.data.symbol.replace('image://', '')
                    + '"/>';
                }
              },
              data: [
                {xAxis: 0, y: 350, name: 'Line', symbolSize: 20, symbol: 'image://../asset/ico/折线图.png'},
                {xAxis: 1, y: 350, name: 'Bar', symbolSize: 20, symbol: 'image://../asset/ico/柱状图.png'},
                {xAxis: 2, y: 350, name: 'Scatter', symbolSize: 20, symbol: 'image://../asset/ico/散点图.png'},
               ]
            }
          }
        ]
      };
      echart3.setOption(option3);
    }
  )
});
