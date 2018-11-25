mui('.mui-bar-tab').on('tap','a',function(){
	document.location.href=this.href;
});


/*登陆拦截封装*/
window.lt = {};
lt.ajaxFilter = function(params){
    $.ajax({
        type:params.type||'get',
        url:params.url||location.pathname,
        data:params.data||{},
        dataType:params.dataType||'json',
        success:function(data){
            /* error 如果  400  代表未登录 去登录页  携带url*/
            if(data.error == 400){
                //returnUrl:登录之后从哪里来到哪里去
                location.href = '/letaoM/user/login.html?returnUrl='+location.href
            }else{
                params.success && params.success(data);
            }
        },
        error:function(res,code){
            console.log(code);
        }
    });
}

/*获取地址栏参数*/
lt.getUrlParams = function(){
    /*拿到以get形式传递的地址栏的数据 ?key=1&name=10*/
    var search = location.search;
    /*需要把字符串转换成对象  便于开发使用*/
    var params = {};
    /*如果有？代表有参数*/
    /*没有问号就没有参数*/
    if(search.indexOf('?') == 0){
        search = search.substr(1);
        var arr = search.split('&');
        for(var i = 0 ; i < arr.length ; i++){
            /*itemArr name=10  ----> [name,10]*/
            var itemArr = arr[i].split('=');
            params[itemArr[0]] = itemArr[1];
        }
    }
    return params;
}