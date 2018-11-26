//获取商品数据的方法
function getProductData(params, callback) {
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetailList',
        data: params,
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
}

 //2.获取数据 渲染页面 设置分页
var currPage = 1;
var renderData = function () {
    getProductData({
        page: currPage,
        pageSize: 5
    }, function (data) {
        /*列表渲染*/
        $('tbody').html(template('template', data));
        /*分页渲染*/
        setPaginator(data.page, Math.ceil(data.total / data.size), renderData);
    });
};
renderData();