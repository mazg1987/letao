//1.获取二级分类分页数据
function getCategorySecondData(params, callback) {
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: params,
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
}

//2.获取数据 渲染页面 分页处理
var currPage = 1;
function renderData() {
	var params = {
		page: currPage,
        pageSize: 5
	}
    getCategorySecondData(params,function (data) {
        /*渲染列表*/
        $('tbody').html(template('template', data));
        /*设置分页  对分页按钮进行绑定*/
        setPaginator(data.page, Math.ceil(data.total / data.size), renderData);
    });
};
renderData();