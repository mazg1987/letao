/*购物车的登陆过滤*/
function getCartData(callback){
	lt.ajaxFilter({
		type:'get',
	    url:'/cart/queryCartPaging',
	    /*这边需要传入分页的数据(接口的需要)*/
	    data:{
	        page:1,
	        pageSize:100
	    },
	    dataType:'json',
	    success:function(data){
			callback&&callback(data);
	    }
	})
}

/*下拉刷新*/
mui.init({
	pullRefresh:{
        /*目标容器*/
        container:".mui-scroll-wrapper",
        /*下拉*/
        down:{
            /*默认下拉一次*/
            auto:true,
            /*下拉操作后的回调函数*/
            callback:function(){
                /*指向当前下拉组件*/
                var that = this;
                /*1.2 完成数据获取*/
                getCartData(function(data){
                    /*1.3 展示商品*/
                    $('.mui-table-view').html(template('cart',data));
                    /*1.4 清除加载效果*/
                    that.endPulldownToRefresh();
                });
            }
        }
    }
})


/*购物车编辑*/
$('.mui-table-view').on('tap','.mui-btn-blue',function(){
    /*获取数据 {id: "1", size: "50", productsize: "42-50", num: "50", productnum: "5"}*/
    //1.准备模板引擎数据
    var data = this.dataset;
    var productSize = data.productsize;
    var productSizeArr = productSize.split("-");
    var newSizeArr = [];
    for(var i=productSizeArr[0];i<=productSizeArr[1];i++){
    	newSizeArr.push(i);
    }
    
    //2.新建一个obj对象作为模板引擎的数据源(dataset不可以直接作为数据源，因为是string类型)
    var obj = {};
    obj.id = data.id;
    obj.size = data.size;
    obj.productsize = newSizeArr;
    obj.num = data.num;
    obj.productnum = data.productnum;

    //3.渲染模板引擎 这边要去除换行，否则拼接完的页面中会有很多br
    var html = template('edit',obj).replace(/\n/g,'');
    
    //4.弹出提示框
 	mui.confirm(html, '编辑商品', ['确定','取消'], function(e) {
 		//6.如果点击了确认按钮，发送请求
        if (e.index == 0) {
            lt.ajaxFilter({
                type:'post',
                url:'/cart/updateCart',
                data:{
                    id:obj.id,
                    size:$('.lt_cart_edit span.now').html(),
                    num:$('.mui-numbox input').val()
                },
                dataType:'json',
                success:function(data){
                    if(data.success){
                        mui.toast('操作成功');
                        /*2.3 重新渲染*/
                        getCartData(function(data){
                            $('.mui-table-view').html(template('cart',data));
                        });
                    }
                }
            });
        }
    });
    
    //5.初始化numbox、实现点击尺码按钮切换样式
    mui('.mui-numbox').numbox();
    
    $('.lt_cart_edit').on('tap','span',function(){
        $('.lt_cart_edit span').removeClass('now');
        $(this).addClass('now');
    }); 
});


/*购物车删除操作*/
$('.mui-table-view').on('tap','.mui-btn-red',function(){
    var id = $(this).attr('data-id');
    /*2.1 弹出提示框*/
    mui.confirm('您是否确定删除？', '温馨提示', ['确定','取消'], function(e) {
        if (e.index == 0) {
            /*2.2 确定之后 发送请求*/
            lt.ajaxFilter({
                type:'get',
                url:'/cart/deleteCart',
                data:{id:id},
                dataType:'json',
                success:function(data){
                    if(data.success){
                        mui.toast('操作成功');
                        /*2.3 重新渲染*/
                        getCartData(function(data){
                            $('.mui-table-view').html(template('cart',data));
                        });
                    }
                }
            });
        }
    });
});


/* 计算总金额
 * 当input的change状态发生改变时触发操作*/
$('.mui-table-view').on('change','input',function(){
    var amount = 0;
    $('input:checked').each(function(){
        var num = $(this).attr('data-num');
        var price = $(this).attr('data-price');
        amount += num*price;
    })
    $('.lt_cart span').html(Math.ceil(amount*100)/100);
});