/*1.进度显示功能*/
/*不显示转圈效果*/
NProgress.configure({
    showSpinner: false
});
/*在ajax开始请求的时候  把进度条显示出来*/
$(window).ajaxStart(function(){
    NProgress.start();
});
/*在ajax结束请求的时候  把进度条完成*/
$(window).ajaxStart(function(){
    NProgress.done();
});


/*2.左菜单的显示和隐藏*/
$('[data-menu]').on('click',function(){
    $('.ad_aside').toggle();
    $('.ad_section').toggleClass('menu');
});


/*3.二级菜单的显示和隐藏*/
$('.menu [href="javascript:;"]').on('click',function(){
    var $this = $(this);
    var $child = $this.siblings('.child');
    $child.slideToggle();
});



$('[data-logout]').on('click',function(){
    /*1.准备模态框 ： 这里面需要将模态框的代码写在common.js中，而不是放在某个页面。因为退出操作是所有页面公共的*/
    var logoutModal =
        '<div class="modal fade" id="logoutModal">'+
        '<div class="modal-dialog modal-sm">'+
        '<div class="modal-content">'+
        '<div class="modal-header">'+
        '<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>'+
        '<h4 class="modal-title">温馨提示</h4>'+
        '</div>'+
        '<div class="modal-body">'+
        '<p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span> 您确定要退出后台管理系统吗？</p>'+
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
        '<button type="button" class="btn btn-primary">确定</button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>';
    /*2.把模态框追加到页面当中*/
    $('body').append(logoutModal);
    /*3.显示模态框*/
    $('#logoutModal').modal('show');
    /*4.当点击确定按钮的时候进行退出登录操作*/
    /*5.防止多次绑定  在绑定之前先注销上一次的绑定*/
    $('#logoutModal').off('click','.btn-primary').on('click','.btn-primary',function(){
        /*6.发送退出请求*/
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            data:{},
            dataType:'json',
            success:function(data){
                setTimeout(function(){
                    if(data.success){
                        /*7.退出成功*/
                        location.href = 'login.html';
                    }
                },500);
            }
        });
    });
});

//5.分页显示
//参数：当前页码、总页数、点击每页的事件回调
function setPaginator(pageCurr,pageSum,callback){
    //获取需要初始的元素 使用bootstrapPaginator方法
    $('.pagination').bootstrapPaginator({
        //当前使用的是3版本的bootstrap
        bootstrapMajorVersion:3,
        //配置的字体大小是小号
        size:'small',
        //当前页
        currentPage:pageCurr,
        //一共多少页
        totalPages:pageSum,
        //点击页面事件 page表示当前点击的是第几页
        onPageClicked:function(event, originalEvent, type, page){
            //改变当前页再渲染 page当前点击的按钮的页面
            currPage = page;
            callback && callback();
        }
    });
}