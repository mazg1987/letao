$("#login").bootstrapValidator({
	feedbackIcons:{
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
	fields:{
		username:{
            /*规则*/
            validators: {
                notEmpty: {
                    message: '用户名不能为空'
                },
                /*设置错误信息 和规则无关 和后台校验有关系*/
                callback: {
                    message: '用户名错误'
                }
            }
         },
         password:{
            validators:{
                notEmpty: {
                    message: '密码不能为空'
                },
                stringLength:{
                    min:6,
                    max:18,
                    message:'密码在6-18个字符内'
                },
                callback: {
                    message: '密码不正确'
                }
            }
        }
	}
}).on('success.form.bv', function(e) {
	/*禁用默认提交的事件 因为要使用ajax提交而不是默认的提交方式*/
    e.preventDefault();
    /*获取当前的表单*/
    var $form = $(e.target);
    /*发送登录请求*/
    $.ajax({
        type:'post',
        url:'/employee/employeeLogin',
        data:$form.serialize(),
        dataType:'json',
        success:function(data){
            if(data.success){
                /*后台管理员 root 123456*/
                /*登录成功*/
                location.href = 'index.html';
            }else{
                /*登录不成功*/
               //恢复可提交的按钮（这边不能恢复被禁用的按钮，原因是在于下面添加了用户名/密码的错误提示信息，
               //在有错误提示信息的情况下，提交按钮默认是禁用的）
                //$form.data('bootstrapValidator') 获取校验组件
                //$form.data('bootstrapValidator').disableSubmitButtons(false);
                
                /*指定表单字段的错误提示为callback中的信息*/
                /* NOT_VALIDATED, VALIDATING, INVALID or VALID */
                if(data.error == 1000){
                    $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }else if(data.error == 1001){
                    $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
            }
        }
    });
});


/*重置功能*/
$('[type="reset"]').on('click',function(){
    /*6.重置验证*/
    $('#login').data('bootstrapValidator').resetForm();
});