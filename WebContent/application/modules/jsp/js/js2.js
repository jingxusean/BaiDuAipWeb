
$(document).ready(function(){
	//菜单切换
	$(".nav li").click(function() {
		$(this).addClass('cur').siblings().removeClass('cur');
		
		//2014年6月3日16:08:46 这两句代码初始化的时候就报错，现在注释掉
		//$this.children("li").find('.nav_ej').hide();
		//$this.children("li").eq(inde).show();
	});
	//左侧切换
	$('.left .left_tl li').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		var index = $(this).index();
		$('.leftBox > div').eq(index).addClass('hide').siblings().removeClass('hide');
	})
	//左侧二级菜单
	$(".left_nav a").click(function(){
		
		if( $(this).parent().children().hasClass("middle_list"))
		{
		$(this).toggleClass("open");
		$(this).next('ol').toggle();
		}

	});
 });

$(document).ready(function(){
	$(".one").click(function(){
		$(".one span").toggleClass('cur');
		})
	$(".two").click(function(){
		$(".two span").toggleClass('cur');
		})
	
	//hide message_body after the first one(不需要这种隐藏方式)
	//$(".message_list .message_body:gt(1)").hide();
	 
	//toggle message_body
	//给不含有noClose的标签绑定事件，
	$(".message_head").each(function(){
		if($(this).attr("class").indexOf("notClose")==-1){
			$(this).click(function(){
				$(this).next(".message_body").slideToggle(500);
				return false;
			});
		}
	});
});

function selectedLabel(_name) {
    $('.selradio label[name="' + _name + '"]').on("click", function () {
        $(".selradio").find("label[name='" + _name + "']").removeClass('checked');
        $(this).addClass('checked');
    });
}

//radio
$(function(){
    $(".selradio .radNo").each(function (i) {
        if ($(this).attr("checked") == "checked") {
            $('.selradio label').eq(i).addClass('checked');
        }
    });
    var selLeth = $('.selradio').length;
    for (var i = 0; i < selLeth; i++) {
        var _inputName = $('.selradio').eq(i).find("input").attr('name');
        $(".selradio").eq(i).each(function () {
            $(this).find("label").attr('name', _inputName);
        });         
        selectedLabel(_inputName);
    }
    
	$(".checkboxs input").each(function (i) {
		if ($(this).attr("checked") == "checked") {
            $('.checkboxs label').eq(i).addClass('checked');
        }
        $('.checkboxs label').eq(i).on("click", function () {
            $(this).toggleClass('checked');
        });
    });

	function tabs(tabTit, on, tabCon) {
		$(tabCon).each(function() {
			$(this).children().eq(0).show();
		});
		$(tabTit).each(function() {
			$(this).children().eq(0).addClass(on);
		});
		$(tabTit).children().click(function() { 
			$(this).addClass(on).siblings().removeClass(on);
			var index = $(tabTit).children().index(this);
			$(tabCon).children().eq(index).show().siblings().hide();
		});
	}
	//tab code
	
	$(".Q_Content tr:even").addClass("even");        
    $(".Q_Content tr").hover(
    function(){
        $(this).addClass("over");
    },
    function(){
        $(this).removeClass("over");
    });	

$('.Q_Content .iCheck label').on("click",function() {
	var _this = $(this);
	_this.toggleClass('checked');
	
});
$( ".Q_Content input[name=item]" ).on( "click", function(){
	countChecked();
	var inplen = 0;
	var total = $( ".Q_Content .itemcheck label" ).length;
	if(this.checked){
		inplen = $( ".Q_Content .itemcheck label.checked" ).length;
		$( ".Q_Content input[name=item]" ).attr("checked", true);
	}else{
		inplen = $( ".Q_Content .itemcheck label.checked" ).length;
		$( ".Q_Content input[name=item]" ).attr("checked", false);
	}
	if(inplen<total){
		$('.Q_Content .checkedAll').parent().find("label").removeClass('checked');
		$('.Q_Content .checkedAll').attr("checked", false);
	}else{
		$('.Q_Content .checkedAll').parent().find("label").addClass('checked');
		$('.Q_Content .checkedAll').attr("checked", true);
	}
// console.log(inplen)
// console.log(total)
});
// 全选
$(".checkedAll").click(function(){    
	if(this.checked){     
		$('.iCheck label').addClass('checked');
		countChecked();
		$('.Q_Content .checkedAll').attr("checked", true);
		$( ".Q_Content input[name=item]" ).attr("checked", true);
	}else{           
		$('.iCheck label').removeClass('checked');
		$( ".Q_Content input[name=item]" ).attr("checked", false);
		$('.Q_Content .checkedAll').attr("checked", false);
	}
	});	
})

function countChecked(){
	var total = 0,
		qunum = 0;
	$( ".Q_Content .iCheck label.checked" ).each(function(i){
		var _obj    = $(".Q_Content .iCheck label.checked"),
		   numK     = _obj.eq(i).parent().find(".Nodis").attr('price'),
		   inputNum = _obj.eq(i).parent().find(".Nodis").attr('quantity');		   
		total = total + parseInt(numK)*inputNum;
		qunum = qunum + parseInt(inputNum);
	});			

}
//药品添加模板
function yptemplateAdd(id){
	var copy=$("#"+id).find(".template:hidden").eq(0).clone(true).css("display","");
	$("#"+id).append(copy);
	copy.find(".selectTemplate").select2();
	var ywmc =copy.find("input").eq(0);
	ypxz(ywmc,ypAll);
}
//增加模板
function templateAdd(id){
	var copy=$("#"+id).find(".template:hidden").eq(0).clone(true).css("display","");
	$("#"+id).append(copy);
	copy.find(".selectTemplate").select2();
}
//删除模板
function templateDel(obj){
	templateDialogConfirm(function(){
		$(obj).parent().parent().remove();
	},"确认删除吗？");
}
//提交的时候执行
function templateDealWith(){
	$(".template:hidden").remove();
	$("td>table:has(.template)").each(function(){
		$(this).find(".template").each(function(i){
			$(this).find(":input[name]").each(function(){
				var name=$(this).attr("name");
				name=name.replace("#index#",i);
				$(this).attr("name",name);
			});
		});
	});
}