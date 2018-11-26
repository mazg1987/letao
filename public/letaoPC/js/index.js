//1.柱状图
var firstDom = document.querySelector('.picTable:first-child');
var firstCarts = echarts.init(firstDom);

option = {
	title: {
        text:'2017注册人数'
    },
    legend: {
        data:['人数']
    },
    tooltip: {},
    xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
    },
    yAxis: {
    },
    series: [{
        name: '人数',
        type: 'bar',
        data: [1000, 2000, 3600, 1400, 1200, 2220]
    }]
};

firstCarts.setOption(option);


//饼图
var secondDom = document.querySelector('.picTable:last-child');
var secondCarts = echarts.init(secondDom);
var secondOption = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','百伦','安踏','李宁']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'百伦'},
                {value:135, name:'安踏'},
                {value:1548, name:'李宁'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
secondCarts.setOption(secondOption);
