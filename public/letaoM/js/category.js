/*获取第一个分类数据*/
function getFirstCategoryData(){
	$.ajax({
	    url:'/category/queryTopCategory',
	    type:'get',
	    data:'',
	    dataType:'json',
	    success:function (data) {
	         $('.cate_left ul').html(template('firstTemplate',data));
	        /*第一个一级分类对应的二级分类*/
	        var categoryId = $('.cate_left ul li:first-child').find('a').attr('data-id');
	        getSecondCategoryData({id:categoryId});        
	    }
	});
}
getFirstCategoryData();

/*获取第二个分类数据*/
function getSecondCategoryData(params){
	$.ajax({
        url:'/category/querySecondCategory',
        type:'get',
        data:params,
        dataType:'json',
        success:function (data) {
            $('.cate_right ul').html(template('secondTemplate',data));
        }
    });
}


/*点击一级分类，请求二级分类数据*/
$('.cate_left').on('tap','a',function (e) {
    /*当前选中的时候不去加载*/
    if($(this).parent().hasClass('active')) return false;
    /*样式的选中功能*/
    $('.cate_left li').removeClass('active');
    $(this).parent().addClass('active');
    /*数据的渲染*/
    getSecondCategoryData({id:$(this).attr('data-id')});
});

