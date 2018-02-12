(function($) {
	$.fn.plusSelect = function(options) {
		//定义要用的参数
		var opts = {
			opt_1:'.selectauto',
			opt_2:'.count_Top a',
			opt_3:'.shtitle em',
			opt_4:'input[name=searchType]',
			onclick: function(){}
		};
		//合并参数供下面调用
		var opt = $.extend(opts, options);
		//fn内容开始
		return this.each(function() {
			var _obj = $(this);
			_obj.click(function(e) {
				e.stopPropagation();
				$(opt.opt_1).hide();
				_obj.find(opt.opt_1).show();
			})
			$(document).bind("click", function() {
				$(opt.opt_1).hide();
			});
			$(opt.opt_2).click(function(e) {
				e.stopPropagation();
				var thisHtml = $(this).html();		
				$(opt.opt_3).html(thisHtml);
				$(opt.opt_1).hide();
				$(this).addClass("cur").siblings().removeClass("cur");
				$(opt.opt_4).val($(this).attr('Svalue'));
				opt.onclick();
			});
		});
		return this;
	}
})(jQuery);

$(function(){
	$(".deliv").plusSelect({
		opt_2:'.deliv a',
		opt_3:'.deliv em',
		opt_4: "input[name=deliv]"
	});
	
	$(".deliv01").plusSelect({
		opt_2:'.deliv01 a',
		opt_3:'.deliv01 em',
		opt_4: "input[name=deliv]"
	});
	
	$(".deliv02").plusSelect({
		opt_2:'.deliv02 a',
		opt_3:'.deliv02 em',
		opt_4: "input[name=deliv]"
	});
	
	$(".deliv03").plusSelect({
		opt_2:'.deliv03 a',
		opt_3:'.deliv03 em',
		opt_4: "input[name=deliv]"
	});
	
	$(".deliv04").plusSelect({
		opt_2:'.deliv04 a',
		opt_3:'.deliv04 em',
		opt_4: "input[name=deliv]"
	});
	
	$(".deliv05").plusSelect({
		opt_2:'.deliv05 a',
		opt_3:'.deliv05 em',
		opt_4: "input[name=deliv]"
	});
	
	$(".deliv06").plusSelect({
		opt_2:'.deliv06 a',
		opt_3:'.deliv06 em',
		opt_4: "input[name=deliv]"
	});
	$(".deliv07").plusSelect({
		opt_2:'.deliv07 a',
		opt_3:'.deliv07 em',
		opt_4: "input[name=deliv]"
	});
	
	$(".shtitle").each(function(i) {
		$('.shtitle').eq(i).css({"z-index":100-i});
	}); 
});

