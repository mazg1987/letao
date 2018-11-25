/*初始化区域滚动组件*/
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});

/*点击搜索按钮，添加搜索信息至localstorage中*/
$('.search_btn').on('tap',function(){
    /*获取关键字*/
    var key = $.trim($('.search_input').val());
    /*如果用户没有输入*/
    if(!key){
        /*提示框  文档-提示框*/
        mui.toast('请输入关键字');
        return false;
    }
    /*记录这一次的搜索*/
    var arr = getHistoryData();
    //在数组最前面插入当前搜索的key
    arr.splice(0,0,key);
    /*存起来*/
    localStorage.setItem('leTaoHistory',JSON.stringify(arr));
    
    /*跳转搜索列表*/
    location.href = 'searchList.html?key='+key;
});


/*获取存储数据*/
function getHistoryData(){
    /*1.约定一个键  leTaoHistory 值存的是json格式的字符串*/
    /*2.通过这个键获取值 如果有就使用 如果没有默认空数组的字符串*/
    var str = localStorage.getItem('leTaoHistory')||'[]';
    /*3.转成成js数据*/
    var arr = JSON.parse(str);
    /*4.返回js可操作的数组*/
    return arr;
}

/*显示历史数据*/
function showHistoryData(){
	/*获取搜索历史数据*/
    var historyList = getHistoryData();
    /*渲染*/
    $('.lt_history').html(template('historyTpl',{list:historyList}));
    $('.search_input').val('');
}
showHistoryData();



 /*3删除记录*/
function spliceHistoryData(){
	$('.lt_history').on('tap','.mui-icon',function(){
	    /*1.获取索引*/
	    var index = $(this).attr('data-index');
	    /*2.获取数据*/
	    var arr = getHistoryData();
	    /*3.删除数据*/
	    arr.splice(index,1);
	    /*4.存储数据*/
	    localStorage.setItem('leTaoHistory',JSON.stringify(arr));
	    /*5.重新渲染*/
	    $('.lt_history').html(template('historyTpl',{list:arr}));
	});
}
spliceHistoryData();


/*4清空记录*/
function emptyHistoryData(){
	$('.lt_history').on('tap','.fa',function(){
	    /*清空数据*/
	    localStorage.setItem('leTaoHistory','');
	    /*重新渲染*/
	    $('.lt_history').html(template('historyTpl',{list:[]}));
	});
}
emptyHistoryData();
