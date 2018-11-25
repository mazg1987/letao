lt.ajaxFilter({
	type:'get',
    url:'/user/queryUserMessage',
    data:'',
    dataType:'json',
    success:function(data){
       $('.mui-media-body').html(data.username+'<p class="mui-ellipsis">绑定手机:'+data.mobile+'</p>');
    }
})


/*退出操作*/
function layout(){
    $('.mui-block').on('click',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            data:'',
            dataType:'json',
            success:function(data){
                if(data.success){
                    location.href = '/letaoM/user/login.html';
                }
            }
        });
    });
}
layout();
    