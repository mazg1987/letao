/*初始化区域滚动组件*/
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});


//1获取地址栏的key显示在搜索框.
var key = lt.getUrlParams().key || '';
$('.search_input').val(key);

//2.定义当前页码数
var currPage = 1;

//3.请求方法的封装
function getProductListData(prams,callback){
    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:prams,
        dataType:'json',
        success:function(data){
            /*模拟一下加载时间*/
            setTimeout(function(){
                if(data.data.length == 0) mui.toast('没有相关商品');
                callback && callback(data);
            },1000);
        }
    });
}

//4.拼接请求参数，发送请求
function renderData(callback){
	//4.1 获取搜索框的内容
	var key = $.trim($('.search_input').val());
    if(!key){
        mui.toast('请输入关键字');
        return false;
    }
    //4.2 获取排序方式
    //排序类型
    var type = $('[data-type].now').attr('data-type');
    //升序还是降序
    var value = $('[data-type].now').find('span').hasClass('fa-angle-down')?1:2;
    //定义参数集合
    var params = {};
    params[type] = value;
    params.proName = key;
    params.page = currPage;
    params.pageSize = 10;
    //发送请求
    getProductListData(params,function(data){
    	if(currPage == 1){
			$('.lt_product').html(template('productTpl',data));
		}else{
			$('.lt_product').append(template('productTpl',data));
		}
		
		//下拉加载上拉刷新的回调
		callback&&callback(data);
    })
}

$('.lt_product').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>');
renderData();


//5.当前页的搜索按钮点击后
$('.search_btn').on('tap',function(){
	var key = $.trim($('.search_input').val());
    if(!key){
        mui.toast('请输入关键字');
        return false;
    }
	//显示加载项
	$('.lt_product').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>');
	//重置当前页码
	currPage = 1;
	//渲染数据
	renderData();
});



//6.排序按钮点击
$('[data-type]').on('tap',function(){
	var key = $.trim($('.search_input').val());
    if(!key){
        mui.toast('请输入关键字');
        return false;
    }
	//显示加载项
	$('.lt_product').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>');
	
	var $this = $(this);
	//移除其他的now的样式
	$('[data-type]').removeClass('now').find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
	//给当前元素添加now的样式
	$this.addClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
	
	/*当前页码*/
	currPage = 1;
	/*渲染*/
	renderData();
});


//7.下拉刷新和上拉加载
mui.init({
	/*4.下拉刷新*/
	pullRefresh : {
		container:".mui-scroll-wrapper",
		down : {
			callback :function(){
				var that = this;
				/*当前页码*/
				currPage = 1;
				/*开发真实的业务*/
				renderData(function(){
					/*下拉效果隐藏*/
					that.endPulldownToRefresh();
				});
			}
		},
		/*5.上拉加载*/
		up : {
			callback:function(){
				var that = this;/*这个是上拉组件对象  对象当中含有终止下拉操作的方法*/

				currPage ++;
				renderData(function(){
					that.endPullupToRefresh();
				});
			}
		}
	}
});
