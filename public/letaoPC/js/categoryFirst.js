//1.纯粹的获取数据的请求方法
function getCategoryFirstData(params,callback) {
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: params,
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
}

//2.获取一级分类数据渲染页面、设置分页
var currPage = 1;
function renderData(){
	var params = {
		page: currPage,
        pageSize: 2
	}
	
	getCategoryFirstData(params,function(data){
		 $('tbody').html(template('template',data));
		  setPaginator(data.page,Math.ceil(data.total/data.size),renderData);
	})
}
renderData();


//3.点击添加一级分类按钮，弹出模态框
$('#addBtn').on('click',function () {
   //显示模态框
   $('#addModal').modal('show');
});

 //4.进行表单校验
$('#form').bootstrapValidator({
    //默认样式
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    //设置校验属性
    fields:{
        categoryName:{
            validators: {
                notEmpty: {
                    message: '一级分类名称不能为空'
                }
            }
        }
    }
}).on('success.form.bv', function(e) {
	//阻止表单提交的默认事件
    e.preventDefault();
    //如果点击需要校验  点击的按钮必须是提交按钮  并且和当前表单关联
    //校验成功后的点击事件  完成数据的提交
    var $form = $(e.target);
    $.ajax({
        type:'post',
        url:'/category/addTopCategory',
        data:$form.serialize(),
        dataType:'json',
        success:function (data) {
            if(data.success){
                //关闭模态框
                $('#addModal').modal('hide');
                //渲染第一页
                currPage = 1;
                renderData();
                //重置表单
                $form.data('bootstrapValidator').resetForm();
                $form.find('input').val('');
            }
        }
    });
});
