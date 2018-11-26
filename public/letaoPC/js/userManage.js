//获取用户数据的请求方法
function getUserData(params,callback){
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:params,
        datType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};

//发送请求、渲染页面
var currPage = 1;
function renderData(){
	var params = {
		page:currPage,
        pageSize:5
	}
	
	getUserData(params,function(data){
		$('tbody').html(template('list',data));
		//设置分页显示
		setPaginator(data.page,Math.ceil(data.total/data.size),renderData);
	})
}
renderData();


//3.禁用用户
//4.启用用户
$('tbody').on('click','.btn',function(){
    //获取数据
    var id = $(this).data('id');
    var name = $(this).data('name');
    var isDelete = $(this).hasClass('btn-danger')?0:1;
    //显示模态框
    //根据当前用户是否有btn-danger样式来确定页面是显示禁用还是启用
    $('#optionModal').find('strong').html(($(this).hasClass('btn-danger')?'禁用 ':'启用 ')+name);
    $('#optionModal').modal('show');
    //先解绑事件、再绑定事件(避免事件绑定多次)
    $('#optionModal').off('click','.btn-primary').on('click','.btn-primary',function(){
        /*发送请求*/
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            dataType:'json',
            success:function(data){
                if(data.success){
                    renderData();
                    $('#optionModal').modal('hide');
                }
            }
        })
    });
});


