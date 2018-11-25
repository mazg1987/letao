//区域滚动
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});


//1.获取商品数据的方法
function getProductDetailData(params,callback){
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:params,
        dataType:'json',
        success:function(data){
            setTimeout(function(){
                callback && callback(data);
            },500);
        }
    });
};

//2.渲染页面
function renderData(){
	//2.1 显示加载进度
	$('.mui-scroll').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>');
	//2.2 获取请求参数
	var urlParams = lt.getUrlParams();
	var params = {id:urlParams.productId};
	//2.3 发送请求
	getProductDetailData(params,function(data){
		//处理size的字段数据，为模板引擎准备数据
		var productSize = data.size;
	    var productSizeArr = productSize.split("-");
	    var newSizeArr = [];
	    for(var i=productSizeArr[0];i<=productSizeArr[1];i++){
	    	newSizeArr.push(i);
	    }
	    data.size = newSizeArr;
		//渲染数据		
		$('.mui-scroll').html(template('detail',data));
		//轮播图的初始化
        mui('.mui-slider').slider({
            interval:4000
        });
        //数量选择初始化
        mui('.mui-numbox').numbox();
	})
}

renderData();


//3.刷新按钮点击事件
 $('.mui-icon-reload').on('tap',function(){
    renderData();
});


//4.尺码选择
$('.mui-scroll').on('tap','.size',function(){
    var currSize = $(this);
    $('.size').removeClass('now');
    currSize.addClass('now');
});

//5.提交购物车
$('.mui-btn-danger').on('tap',function(){
	//防快速点击多次后的重复提交
    if(window.addCarting){
        return false;
    }
	//1.需要获取数据
    var data = {
        productId:lt.getUrlParams().productId,
        size:$('.size.now').html(),
        num:$('.mui-input-numbox').val()
    };
  	//2.数据校验
    if(!data.productId){
        mui.toast('商品异常');
        return false;
    }
    if(!data.size){
        mui.toast('请选择尺码');
        return false;
    }
    if(!data.num){
        mui.toast('请选择数量');
        return false;
    }
    //3.检验是否登录
    lt.ajaxFilter({
		type:'post',
        url:'/cart/addCart',
        data:data,
	    dataType:'json',
	    beforeSend:function(){
            window.addCarting = true;
        },
	    success:function(data){
	       if(data.success){
                mui.confirm('加入购物车成功，去购物车看看？', '温馨提示', ['去看看','继续浏览'], function(e) {
                    if (e.index == 0) {
                        location.href = 'user/cart.html';
                    } else {
                        /*按了其他按钮 暂时处理*/
                    }
                });
            }
            else{
                mui.toast('添加失败，请重试！');
            }
            window.addCarting = false;
	    },
	    error:function(){
            mui.toast('网络繁忙！');
            window.addCarting = false;
        }
	})
})