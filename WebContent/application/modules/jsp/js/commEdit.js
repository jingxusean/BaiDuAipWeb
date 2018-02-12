function gofirst(){
	loading();
	$("#page_control").val(1);
	$("#queryListForm").submit();
}
function goprevious(){
	loading();
	var x=parseInt($("#page_control").val());
	$("#page_control").val(x-1);
	$("#queryListForm").submit();
}
function gonext(){
	loading();
	var x=parseInt($("#page_control").val());
	$("#page_control").val(x+1);
	$("#queryListForm").submit();
}
function golast(total){
	loading();
	$("#page_control").val(total);
	$("#queryListForm").submit();
}
function doQuery(callback){
	if(typeof callback =='function'){
		callback();
	}
	if($("#queryListForm").validationEngine){
		if($("#queryListForm").validationEngine("validate")){
			loading();
			$("#page_control").val(1);// 点击查询按钮后，当前页面置为第一页
			$("#queryListForm").submit();
		}
	}else{
		loading();
		$("#page_control").val(1);// 点击查询按钮后，当前页面置为第一页
		$("#queryListForm").submit();
	}
}

function doSave(formId,callback){
		// 验证
		$(".message_head").next(".message_body").slideDown(500,function(){
			if($("#"+formId).validationEngine("validate")){
				templateDialogConfirm(function(){
					templateDealWith();
					$("#"+formId).submit();
				},"确认保存吗？");
			}
		});
}
function doExport(exportAction){
	var initAction=$("#queryListForm").attr("action");
	$("#queryListForm").attr("action",exportAction);
	if($("#queryListForm").validationEngine){
		if($("#queryListForm").validationEngine("validate")){
			//$("#queryListForm").submit();
		}
	}else{
		//$("#queryListForm").submit();
	}
	 $.ajax({
         type: "post",
         //async: false,
         url: exportAction + ".action",   
         data: $("#queryListForm").serialize(), 
         dataType : "text",
         //timeout: 1000,  
         beforeSend: function() {  
        	 loading();
         },
         success: function(data) {  
        	 art.dialog({id:'dialogLoading'}).close();
        	 //alert(data);
        	 window.open("../DownLoadExcelAction.action?storagePath=" + data);
         },  
         error: function() {  
        	 art.dialog({id:'dialogLoading'}).close();
        	 art.dialog('导出失败，请联系管理员！', function(){});
         }  
     })  
     $("#queryListForm").attr("action",initAction);
	
}

function goNumPage(maxnum){
	if(typeof maxnum==="string"){
		maxnum=parseInt(maxnum);
	}
	var gopagenumber=$("#gopagenumber").val();
	var reg = new RegExp("^[0-9]*$");
	if(!reg.test(gopagenumber)){
		art.dialog('请输入整数页码!', function(){});
		$("#gopagenumber").val('');
		return false; 
	};
	if(gopagenumber>maxnum){
		art.dialog('输入的页码不能大于最大页码!', function(){});
		return false; 
	}else if(gopagenumber<1){
		art.dialog('输入的页码不能小于1!', function(){});
		return false; 
	}
	
	loading();
	$("#page_control").val($("#gopagenumber").val());
	$("#queryListForm").submit();
}
// 加上enter事件
/**
 * TODO 空格事件之后弹出框有问题
 */
$(function() {
	$("#gopagenumber").keypress(function(event){      
        if (event.keyCode == 13) {
        	var maxnum=$(this).attr("maxnum");
        	goNumPage(maxnum);
        }
    });
});
// var $ = jQuery.noConflict();
// $(document).ready(function()
// {
// $("#outtable").tablesorter();
// }
// );

function openwindow(title,url,width,height){
	if (width==null || width==''){
		width="100%";
	}
	if (height==null || height==''){
		height="100%";
	}
	// alert(width + '----' + height);
	art.dialog.open(url, {title: title,width: width,height: height});
}

// 弹出提示框，参数分别为回调函数，弹出框内容,ok件值
function templateDialogAlert(callback,content,okVal){
	if($.dialog){
		$.dialog({
		    content: content,
		    okVal:okVal||'确定',
		    ok: function () {
				if(callback&&typeof callback=='function'){
					callback();
				}
		        return true;
		    }
		});
	}else{
		alert(content);
		if(callback&&typeof callback=='function'){
			callback();
		}
	}
}

// 弹出确认框，参数分别为回调函数，弹出框内容，ok键值，取消键值
function templateDialogConfirm(callback,content,okVal,cancelVal){
	if($.dialog){
		$.dialog({
		    content: content||'确认该操作吗？',
		    okVal:okVal||'确定',
		    ok: function () {
				if(callback&&typeof callback=='function'){
					callback();
				}
		        return true;
		    },
		    cancelVal: cancelVal||'取消',
		    cancel: true // 为true等价于function(){}
		});
	}else{
		if(confirm(content||"确认该操作吗？")){
			if(callback&&typeof callback=='function'){
				callback();
			}
		}
	}
}

//弹出警告确认框，参数分别为回调函数，弹出框内容，ok键值，取消键值
//一般用于保存的内容可能存在问题，但又允许用户保存
function templateAlertDialogConfirm(callback,content,okVal,cancelVal){
	if($.dialog){
		$.dialog({
			title: '重要提示',
		    content: content||'确认该操作吗？',
		    okVal:okVal||'确定',
		    icon: 'warning',
		    ok: function () {
				if(callback&&typeof callback=='function'){
					callback();
				}
		        return true;
		    },
		    cancelVal: cancelVal||'取消',
		    cancel: true // 为true等价于function(){}
		});
	}else{
		if(confirm(content||"确认该操作吗？")){
			if(callback&&typeof callback=='function'){
				callback();
			}
		}
	}
}

function getSsXzqh(xzqh,qcode){
	if(xzqh&&qcode){
		for(x=0;x<xzqh.length;x++){
			var s=xzqh[x];
			for(var i=0;i<s.next.length;i++){
				var ss=s.next[i];
				if(ss){
					for(var j=0;j<ss.next.length;j++){
						q=ss.next[j];
						if(q.xzbm==qcode){
							return q;
						}
					}
				}
			}
		}
	}
	return {};
}

/**
 * 
 * @param sId省ID
 * @param ssId市ID
 * @param qId区ID
 * @param jdId街道ID
 * @param cunId村ID
 * @param sCode省代码
 * @param ssCode市代码
 * @param qCode区代码
 * @param jdCode街道代码
 * @param cunCode村代码
 * @return
 */
function xzqhLd(xzqh,sId,ssId,qId,jdId,cunId,sCode,ssCode,qCode,jdCode,cunCode,filter){
	
	// 解决，select样式改为select2之后生成的div包含最初select class的问题
	var sIdClass=sId?$("#"+sId).attr("class"):"";
	var ssIdClass=ssId?$("#"+ssId).attr("class"):"";
	var qIdClass=qId?$("#"+qId).attr("class"):"";
	var jdIdClass=jdId?$("#"+jdId).attr("class"):"";
	var cunIdClass=cunId?$("#"+cunId).attr("class"):"";
	if(!xzqh){
		return;
	}
	
	var checkOption="<option value=''>--请选择--</option>";
	
	var sXzqh={};
	var ssXzqh={};
	var qXzqh={};
	var jdQxqh={};
	
	function getOption(xzqhObj,value){
		if(xzqhObj){
			var options=checkOption;
			for(var i=0;i<xzqhObj.length;i++){
				if(value==xzqhObj[i].xzbm){
					options+="<option value='"+xzqhObj[i].xzbm+"' selected>"+xzqhObj[i].xzqhmc+"</option>";
				}else{
					options+="<option value='"+xzqhObj[i].xzbm+"'>"+xzqhObj[i].xzqhmc+"</option>";
				}
			}
			return options;
		}
		return checkOption;
	}
	function setOption(id,options){
		if(id!=null&&options){
			$("#"+id).html(options);
			if(id==sId){
				$("#"+sId).addClass(sIdClass);
			}else if(id==ssId){
				$("#"+ssId).addClass(ssIdClass);
			}else if(id==qId){
				$("#"+qId).addClass(qIdClass);
			}else if(id==jdId){
				$("#"+jdId).addClass(jdIdClass);
			}else if(id==cunId){
				$("#"+cunId).addClass(cunIdClass);
			}
			$("#"+id).select2();// 不知道为什么会导致下一级的class消失，所以需要主动加上
			// 暂时只处理本级下一级下拉框
			if(id==sId){
				$("#"+ssId).addClass(ssIdClass);
			}else if(id==ssId){
				$("#"+qId).addClass(qIdClass);
			}else if(id==qId){
				$("#"+jdId).addClass(jdIdClass);
			}else if(id==jdId){
				$("#"+cunId).addClass(cunIdClass);
			}
		}
	}
	function getXzqhByCode(xzqhObj,code){
		if(xzqhObj&&code){
			for(var i=0;i<xzqhObj.length;i++){
				if(code==xzqhObj[i].xzbm){
					return xzqhObj[i];
				}
			}
		}
		return {};
	}
	
	function sChange(code,value){
		sXzqh=getXzqhByCode(xzqh,code);
		setOption(ssId,getOption(sXzqh.next,value));
		setOption(qId,checkOption,qIdClass);
		setOption(jdId,checkOption,jdIdClass);
		setOption(cunId,checkOption,cunIdClass);
	}
	
	function ssIdChange(code,value){
		ssXzqh=getXzqhByCode(sXzqh.next,code);
		setOption(qId,getOption(ssXzqh.next,value));
		setOption(jdId,checkOption,jdIdClass);
		setOption(cunId,checkOption,cunIdClass);
	}
	function qIdChange(code,value){
		qXzqh=getXzqhByCode(ssXzqh.next,code);
		setOption(jdId,getOption(qXzqh.next,value));
		setOption(cunId,checkOption,cunIdClass);
	}
	
	function jdIdChange(code,value){
		jdQxqh=getXzqhByCode(qXzqh.next,code);
		
		if(filter){
			var xzqhObj=$.extend([],jdQxqh.next);
			jdQxqh.next=[];
			for(var i=0;i<xzqhObj.length;i++){
				if(!xzqhObj[i]){
					continue;
				}
				var filters=filter.split(",");
				var flag=false;
				for(var j=0;j<filters.length;j++){
					if(!filters[j]){
						continue;
					}
					
					// filterJds[j]进行处理，去除最后的零
					while(filters[j].substring(filters[j].length-1,filters[j].length)=="0"){
						filters[j]=filters[j].substring(0,filters[j].length-1);
					}
					
					// 如果是12位说明此时是村级用户,判断是否有该权限
					if(xzqhObj[i].xzbm.indexOf(filters[j])>-1){
						flag=true;
						break;
					}
					
				}
				if(flag){
					jdQxqh.next.push(xzqhObj[i]);
				}
			}
		}
		
		setOption(cunId,getOption(jdQxqh.next,value));
	}
	
	// 省变动的话，市，区，街道，村，要全部更新
	$("#"+sId).change(function(){
		var code=$(this).val();
		sChange(code);
	});
	
	$("#"+ssId).change(function(){
		var code=$(this).val();
		ssIdChange(code);
	});
	
	$("#"+qId).change(function(){
		var code=$(this).val();
		qIdChange(code);
	});
	
	$("#"+jdId).change(function(){
		var code=$(this).val();
		jdIdChange(code);
	});
	
	
	sXzqh=getXzqhByCode(xzqh,sCode);
	ssXzqh=getXzqhByCode(sXzqh.next,ssCode);
	qXzqh=getXzqhByCode(ssXzqh.next,qCode);
	jdQxqh=getXzqhByCode(qXzqh.next,cunCode);
	
	if(sId){
		setOption(sId,getOption(xzqh,sCode));// 设置第一个选择项的值
		sChange(sCode,ssCode);
		ssIdChange(ssCode,qCode);
		qIdChange(qCode,jdCode);
		jdIdChange(jdCode,cunCode);
	}else if(ssId){
		setOption(ssId,getOption(sXzqh.next,ssCode));// 设置第一个选择项的值
		ssIdChange(ssCode,qCode);
		qIdChange(qCode,jdCode);
		jdIdChange(jdCode,cunCode);
	}else if(qId){
		setOption(qId,getOption(ssXzqh.next,qCode));
		qIdChange(qCode,jdCode);
		jdIdChange(jdCode,cunCode);
	}else if(jdId){
		
		if(filter){
			var xzqhObj=$.extend([],qXzqh.next);
			qXzqh.next=[];
			for(var i=0;i<xzqhObj.length;i++){
				if(!xzqhObj[i]){
					continue;
				}
				var filters=filter.split(",");
				var flag=false;
				for(var j=0;j<filters.length;j++){
					if(!filters[j]){
						continue;
					}
					// filterJds[j]进行处理，去除最后的零
					//while(filters[j].substring(filters[j].length-1,filters[j].length)=="0"){
					//	filters[j]=filters[j].substring(0,filters[j].length-1);
					//}
					// 如果不是那说明是镇级以上行政单位，不用再做处理
					if(filters[j].length==12){
						// 如果是12位说明此时是村级用户，要找到镇级代码
						filters[j]=filters[j].substring(0,9);
					}
					if(xzqhObj[i].xzbm.indexOf(filters[j])>-1){
						flag=true;
						break;
					}
					
				}
				if(flag){
					qXzqh.next.push(xzqhObj[i]);
				}
			}
		}
		
		setOption(jdId,getOption(qXzqh.next,jdCode));
		jdIdChange(jdCode,cunCode);
	}
	
	// 初始化之后要绑定验证事件
// $("#jkdaJtJbxxEditForm").validationEngine('attach', {
// relative: true,
// overflownDIV:"#divOverflown"
// });
	
}

/**
 * 是否显示td
 * 
 * @param name
 * @param value，如果value等于这个值，那么就显示
 * @param hideClassName,要隐藏的的classTd
 * @param isEmptyData,是否清空数据，radio，check,设置为未选中，select设置为""选项
 * @return
 */
function sfycTd(name,value,hideClassName,isEmptyData){
	
	isEmptyData=isEmptyData||true;
	
	function initHideContent(){
		
		if($("."+hideClassName).attr("class").indexOf("hideTr")>-1){
			$("."+hideClassName).parent().hide();
		}else{
			$("."+hideClassName).each(function(){
				var html=$(this).html();
				var div="<div style='display:none;' tdBj='true'>"+html+"</div>";
				$(this).html(div);
				
				// 重新对select进行渲染
				if($(this).find(".select2-container").length>0){
					$(this).find(".select2-container").remove();
					$(this).find("select").select2();
				}
				
				if($(this).find('.checkboxs label').length>0){
					$(this).find('.checkboxs label').on("click", function () {
						 $(this).toggleClass('checked');
				    });
				}
				
				if($(this).find('.selradio').length>0){
					$(this).find('.selradio input').each(function(){
						selectedLabel($(this).attr("name"));
					});
				}
				
			});
		}
		
	}
	
	function sfyc(checked){
		if(checked){
			$("."+hideClassName).parent().show();
			$("."+hideClassName).each(function(){
				$(this).children("div[tdBj=true]").show();
			});
		}else{
			
			$("."+hideClassName).each(function(){
				
				if($(this).attr("class").indexOf("hideTr")>-1){
					$(this).parent().hide();
				}
				
				$(this).children("div[tdBj=true]").hide();
				if(isEmptyData){
					
					// 清空模版数据
					if($(this).find(".template:gt(0)").length>0){
						$(this).find(".template:gt(0)").remove();
					}
					
					// 清空单选
					if($(this).find(".selradio label").length>0){
						$(this).find(":radio").prop("checked",false);
						$(this).find(".selradio label").removeClass('checked');
					}
					
					// 清空多选
					if($(this).find(".checkboxs label").length>0){
						$(this).find(":checkbox").prop("checked",false);
						$(this).find(".checkboxs label").removeClass('checked');
					}
					
					/*// select选项清空   
					$(this).find("select").select2("val","");
					// 为防止没有清空
					$(this).find("select").val("");
					
					$(this).find("input").val("");*/
				}
			});
		}
	}
	
	function isCheckShow(){
		var checkValue="";
		var checked=false;
		
		var type=$(":input[name='"+name+"']").eq(0).attr("type");
		if(type=="radio"||type=="checkbox"){
			$(":input:checked[name='"+name+"']").each(function(){
				checkValue=$(this).val()+",";
				if(value.indexOf(checkValue)>-1){
					checked=true;
					return false;
				}
			});
		}else{
			checkValue=$(":input[name='"+name+"']").eq(0).val()+",";
			if(checkValue!=""){
				if(value.indexOf(checkValue)>-1){
					checked=true;
				}
			}
		}
		return checked;
	}
	
	// 首次执行，初始化td里面的内容
	initHideContent();
	value+=",";
	
	sfyc(isCheckShow());
	
	// 绑定事件
	$(":input[name='"+name+"']").change(function(){
		sfyc(isCheckShow());
	});
}
// 责任医师的选择使用SELECT2
function czry(jquerySelector,dataAll,maxShowCount){
	$(jquerySelector).select2({
		isShowSearch:true,
        placeholder: "请输入拼音码查询",
        allowClear: true,
        initSelection:function(element, callback){
        	var value=element.val();
        	for(var i=0;i<dataAll.length;i++){
        		if(dataAll[i]){
        			if(dataAll[i].id){
            			if(dataAll[i].id==value){
        					element.select2("data", {id:dataAll[i].id,text:dataAll[i].text}); 
        				}
            		}
        		}
            }
        },
        query: function (options) {
            var data = [];
            var term=$.trim(options.term).toLocaleUpperCase();
            var pym='';
            maxShowCount=maxShowCount||30;
           // if(dataAll.length<maxShowCount){
            	maxShowCount=dataAll.length;
         //   }
            var value=options.element.val();
            
        	 for (i=0;i<dataAll.length; i++) {
        		 if(dataAll[i]){
        			// 判断一下，如果当前已经选择了该值，就不查出来
                	 if(dataAll[i].id!=value){
                		 pym=dataAll[i].pym.toLocaleUpperCase();
                		 wbm=dataAll[i].wbm.toLocaleUpperCase();
                         if(pym.indexOf(term)==0){
                        	 if(data.length<=maxShowCount){
                        		 data.push(dataAll[i]);
                        	 }
                         }else if(wbm.indexOf(term)==0){
                        	 if(data.length<=maxShowCount){
                        		 data.push(dataAll[i]);
                        	 }
                         }
                	 }
        		 }
             }	
            var result={
           	     more: false,
           	     results:data
            };
            options.callback(result);
        }
    });
}

// 药品的选择使用SELECT2
function ypxz(jquerySelector,ypAll,maxShowCount){
	if (maxShowCount==null){
		maxShowCount=100;
	}
	$(jquerySelector).select2({
		isShowSearch:true,
        placeholder: "请输入拼音码查询",
        allowClear: true,
        initSelection:function(element, callback){
        	var value=element.val();
        	for(var i=0;i<ypAll.length;i++){
        		if(ypAll[i]){
        			if(ypAll[i].id){
            			if(ypAll[i].id==value){
        					element.select2("data", {id:ypAll[i].id,text:ypAll[i].text}); 
        				}
            		}
        		}
            }
        },
        query: function (options) {
            var data = [];
            var term=$.trim(options.term).toLocaleUpperCase();
            var pym='';
            var wbm='';
            var zwhz='';//中文汉字
            maxShowCount=maxShowCount||30;
            if(ypAll.length<maxShowCount){
            	maxShowCount=ypAll.length;
            }
            var value=options.element.val();
            
        	 for (i=0;i<ypAll.length; i++) {
        		 if(ypAll[i]){
        			// 判断一下，如果当前已经选择了该值，就不查出来
                	 if(ypAll[i].id!=value){
                		 pym=ypAll[i].pym.toLocaleUpperCase();
                		 wbm=ypAll[i].text1.toLocaleUpperCase();
                		 zwhz=ypAll[i].text;
                         if(pym.indexOf(term)==0){
                        	 if(data.length<=maxShowCount){
                        		 data.push(ypAll[i]);
                        	 }
                         }else if(wbm.indexOf(term)==0){
                        	 if(data.length<=maxShowCount){
                        		 data.push(ypAll[i]);
                        	 }
                         }else if(zwhz.indexOf(term)==0){
                        	 if(data.length<=maxShowCount){
                        		 data.push(ypAll[i]);
                        	 }
                         }
                	 }
        		 }
             }	
            var result={
           	     more: false,
           	     results:data
            };
            options.callback(result);
        }
    });
}
//不带默认的机构选择
function wsfyzxLd(sessionWsfyzx, bzId, bz2Id, bz, bz2, wgdmId) {
	function setWsfyzxOption(bz, bz2) {
		var options = "";
		if (bz == "" || bz == null) {
			$("#" + bz2Id).html("<option value=''>--请选择--</option>");
			$("#" + bz2Id).select2();
		} else {
			for (var i = 0; i < sessionWsfyzx.length; i++) {
				if (sessionWsfyzx[i]) {
					if (sessionWsfyzx[i].value == bz) {
						var children = sessionWsfyzx[i].children;
						console.info("----------")
						console.info(children);
						children.sort(function (a, b) {
							return a.text.localeCompare(b.text);
						});
						console.info('*****')
						console.info(children);
						console.info("----------")
						for (var j = 0; j < children.length; j++) {
							if (children[j]) {
								if (children[j].value == bz2) {
									options += "<option value='" + children[j].value + "' selected>" + children[j].text + "</option>";
								} else {
									options += "<option value='" + children[j].value + "'>" + children[j].text + "</option>";
								}
							}
						}
						$("#" + bz2Id).html(options);
						$("#" + bz2Id).select2();
						break;
					}
				}
			}
		}
	}
	var html = "";
	for (var i = 0; i < sessionWsfyzx.length; i++) {
		if (sessionWsfyzx[i]) {
			if (sessionWsfyzx[i].value == bz) {
				html += "<option value='" + sessionWsfyzx[i].value + "' selected>" + sessionWsfyzx[i].text + "</option>";
			} else {
				html += "<option value='" + sessionWsfyzx[i].value + "'>" + sessionWsfyzx[i].text + "</option>";
			}
		}
	}
	$("#" + bzId).html(html);
	$("#" + bzId + ",#" + bz2Id).select2();
	setWsfyzxOption(bz, bz2);
	$("#" + bzId).change(function () {
		var value = $(this).val();
		setWsfyzxOption(value);
		$("#" + wgdmId).val(value);
	});
	$("#" + bz2Id).change(function () {
		var value = $(this).val();
		$("#" + wgdmId).val(value);
	});
}
//带默认的机构选择 
function selectedWsfyzxLd(selectedOrg,sessionWsfyzx,bzId,bz2Id,bz,bz2,wgdmId){
	//todo:判断机构默认值目前通过机构代码长度判断，如给机构配置等级，需按等级修改
	var length = selectedOrg.length;
	if(length==9){
		bz = selectedOrg;
	}else if(length==12){
		bz = selectedOrg.substring(0,9);
		bz2 = selectedOrg;
	}
	
	function setWsfyzxOption(bz,bz2){
		var options="";
		if(bz==""||bz==null){
			$("#"+bz2Id).html("<option value=''>--请选择--</option>");
			$("#"+bz2Id).select2();
		}else{
			for(var i=0;i<sessionWsfyzx.length;i++){
				if(sessionWsfyzx[i]){
					if(sessionWsfyzx[i].value==bz){
						var children=sessionWsfyzx[i].children;
						for(var j=0;j<children.length;j++){
							if(children[j]){
								if(children[j].value==bz2){
									options+="<option value='"+children[j].value+"' selected>"+children[j].text+"</option>";
								}else{
									options+="<option value='"+children[j].value+"'>"+children[j].text+"</option>";
								}
							}
						}
						$("#"+bz2Id).html(options);
						$("#"+bz2Id).select2();
						break;
					}
				}
			}
		}
	}
	
	var html="";
	
	for(var i=0;i<sessionWsfyzx.length;i++){
		if(sessionWsfyzx[i]){
			if(sessionWsfyzx[i].value==bz){
				html+="<option value='"+sessionWsfyzx[i].value+"' selected>"+sessionWsfyzx[i].text+"</option>";
			}else{
				html+="<option value='"+sessionWsfyzx[i].value+"'>"+sessionWsfyzx[i].text+"</option>";
			}
		}
	}
	$("#"+bzId).html(html);
	$("#"+bzId+",#"+bz2Id).select2();
	setWsfyzxOption(bz,bz2);
	$("#"+bzId).change(function(){
		var value=$(this).val();
		setWsfyzxOption(value);
		$("#"+wgdmId).val(value);
	});
	$("#"+bz2Id).change(function(){
		var value=$(this).val();
		$("#"+wgdmId).val(value);
	});
	
	
};
// 计算年龄 --1950-03-06 cs sw 2011-02-26
function daysBetween(DateOne,DateTwo){   
var OneMonth = parseInt(DateOne.substring(5,DateOne.lastIndexOf ('-')));  
var OneDay = parseInt(DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1));  
var OneYear = parseInt(DateOne.substring(0,DateOne.indexOf ('-')));  

var TwoMonth = parseInt(DateTwo.substring(5,DateTwo.lastIndexOf ('-')));  
var TwoDay =parseInt(DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1));  
var TwoYear = parseInt(DateTwo.substring(0,DateTwo.indexOf ('-')));  
// var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)-
// Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000/365);
if(OneDay>TwoDay){
	TwoMonth=TwoMonth-1;
}
if(OneMonth>TwoMonth){
	TwoYear=TwoYear-1;
}
var age = Math.abs(TwoYear-OneYear); 
return age; 
} 

function loading(){
	if($.dialog){
		$.dialog({
			id:"dialogLoading",
			title: false,
		    cancel: false,
		    fixed: true,
			background: 'black', // 背景色
		    opacity: 0.5,	// 透明度
			init: function () {
				//获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	            var curWwwPath = window.document.location.href;
	            //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	            var pathName = window.document.location.pathname;
	            //获取带"/"的项目名，如：/uimcardprj
	            var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
				this.content("<image src='"+projectName+"/application/modules/jsp/jquery/artDialog/skins/icons/loading.gif'>请稍后...").lock();
	    	}
		});
	}
}


/**
 * 初始化一些東西
 */
if($){
	$(function(){
		// 清空输入框的左右两边的空格
		$("input").blur(function(){
			var value=$(this).val();
			if(value){
				value=$.trim(value);
			}
			$(this).val(value);
		});
		
		$(".reset").click(function(){
			// var form=$(this).parents("form[id=queryListForm]").eq(0);
			var form=$("#queryListForm");
			
			// 可见的输入框要清空
			form.find("input:visible").val("");
			
			// select选项清空
			form.find("select").select2("val","");
			// 为防止没有清空
			form.find("select").val("");
			
			// 解决select2卫生机构不重置的问题
			form.find("#wgdm").val("");
		});
		
		// 设置国标选项
		$("#nationalStandardSpan").html("&nbsp;&nbsp;&nbsp;<input type='checkbox' class='radNo' id='nationalStandardSpanId' " +
				"name='nationalStandardSpanId'><label for='nationalStandardSpanId'>显示国标 </label>");
		$("#nationalStandardSpanId").click(function(){
			if($(this).prop("checked")){
				$(".nationalStandard").each(function(i){
					var backgroundColor=$(this).css("background-color");
					$(this).attr("backgroundColorTemp",backgroundColor);
					$(this).css("background-color","#FCD209");
				});
			}else{
				$(".nationalStandard").each(function(i){
					var backgroundColor=$(this).attr("backgroundColorTemp");
					$(this).css("background-color",backgroundColor);
				});
			}
		});
		
		if($("#copyAndAdd").attr("jlbh")==""){
			$("#copyAndAdd").html("&nbsp;&nbsp;&nbsp;<input type='checkbox' class='radNo' id='copyAndAddId' " +
			"name='copyAndAddId'><label for='copyAndAddId'>引入上一次数据</label>");
			if($("#copyAndAdd").attr("operBz")=="copyAndAdd"){
				$("#copyAndAddId").prop("checked",true);
			}
			$("#copyAndAddId").click(function(){
				var formName=$("#copyAndAdd").attr("formName");
				if(!formName){
					formName="form";
				}
				var operBz=$("#"+formName).find(":input:hidden[name='model.operBz']");
				var operAdd=$("#"+formName).find(":input:hidden[name=operAdd]").val();
				var operCopyAndAdd=$("#"+formName).find(":input:hidden[name=operCopyAndAdd]").val();
				if($(this).prop("checked")){
					$("#"+formName).find(":input:hidden[name=oper]").val(operCopyAndAdd);
					operBz.val('copyAndAdd');
				}else{
					$("#"+formName).find(":input:hidden[name=oper]").val(operAdd);
					operBz.val('');
				}
				// 取消验证事件
				var copyurl =$(":input:hidden[name=copyAddUrl]").val();
				$("#"+formName).attr("action",copyurl);
				$("#"+formName).validationEngine("detach");
				$("#"+formName).submit();
			});
		}
		
		if($("#yltnbsfyy").attr("jlbh")==""){
			$("#yltnbsfyy").html("&nbsp;&nbsp;&nbsp;<input type='checkbox' class='radNo' id='yltnbsfyyId' " +
			"name='yltnbsfyyId'><label for='yltnbsfyyId'>引入最后一次糖尿病随访用药</label>");
			if($("#yltnbsfyy").attr("operBz").indexOf("yltnbsfyy") != -1){
				$("#yltnbsfyyId").prop("checked",true);
			}
			$("#yltnbsfyyId").click(function(){
				var formName=$("#yltnbsfyy").attr("formName");
				if(!formName){
					formName="form";
				}
				var operBz=$("#"+formName).find(":input:hidden[name='model.operBz']");
				var operAdd=$("#"+formName).find(":input:hidden[name=operAdd]").val();
				var operYltnbsfyy=$("#"+formName).find(":input:hidden[name=operYltnbsfyy]").val();
				if($(this).prop("checked")){
					//$("#"+formName).find(":input:hidden[name=oper]").val(operYltnbsfyy);
					$("#"+formName).find(":input:hidden[name=oper]").val("import");
					if(operBz.val().indexOf('yltnbsfyy') == -1){
						operBz.val(operBz.val()+',yltnbsfyy');
					}
					
				}else{
					$("#"+formName).find(":input:hidden[name=oper]").val(operAdd);
					//operBz.val('');
					if(operBz.val().indexOf('yltnbsfyy') != -1){
						operBz.val(operBz.val().replace(',yltnbsfyy',''));
					}
				}
				// 取消验证事件
				var copyurl =$(":input:hidden[name=copyAddUrl]").val();
				$("#"+formName).attr("action",copyurl);
				$("#"+formName).validationEngine("detach");
				$("#"+formName).submit();
			});
		}
		//新版糖尿病随访用药引入----add wq
		if($("#yltnbsfyyNew").attr("jlbh")==""){
			$("#yltnbsfyyNew").html("&nbsp;&nbsp;&nbsp;<input type='checkbox' class='radNo' id='yltnbsfyyIdNew' " +
			"name='yltnbsfyyIdNew'><label for='yltnbsfyyIdNew'>引入最后一次糖尿病随访用药</label>");
			if($("#yltnbsfyyNew").attr("operBz").indexOf("yltnbsfyyNew") != -1){
				$("#yltnbsfyyIdNew").prop("checked",true);
			}
			$("#yltnbsfyyIdNew").click(function(){
				var formName=$("#yltnbsfyyNew").attr("formName");
				if(!formName){
					formName="form";
				}
				var operBz=$("#"+formName).find(":input:hidden[name='modelNew.operBz']");
				var operAdd=$("#"+formName).find(":input:hidden[name=operAdd]").val();
				var operYltnbsfyy=$("#"+formName).find(":input:hidden[name=operYltnbsfyy]").val();
				if($(this).prop("checked")){
					//$("#"+formName).find(":input:hidden[name=oper]").val(operYltnbsfyy);
					$("#"+formName).find(":input:hidden[name=oper]").val("importNew");
					if(operBz.val().indexOf('yltnbsfyyNew') == -1){
						operBz.val(operBz.val()+',yltnbsfyyNew');
					}
					
				}else{
					$("#"+formName).find(":input:hidden[name=oper]").val(operAdd);
					//operBz.val('');
					if(operBz.val().indexOf('yltnbsfyyNew') != -1){
						operBz.val(operBz.val().replace(',yltnbsfyyNew',''));
					}
				}
				// 取消验证事件
				var copyurl =$(":input:hidden[name=copyAddUrl]").val();
				$("#"+formName).attr("action",copyurl);
				$("#"+formName).validationEngine("detach");
				$("#"+formName).submit();
			});
		}
		
		if($("#ylgxysfyy").attr("jlbh")==""){
			$("#ylgxysfyy").html("&nbsp;&nbsp;&nbsp;<input type='checkbox' class='radNo' id='ylgxysfyyId' " +
			"name='ylgxysfyy'><label for='ylgxysfyyId'>引入最后一次高血压随访用药</label>");
			if($("#ylgxysfyy").attr("operBz").indexOf("ylgxysfyy")!= -1){
				$("#ylgxysfyyId").prop("checked",true);
			}
			$("#ylgxysfyyId").click(function(){
				var formName=$("#ylgxysfyy").attr("formName");
				if(!formName){
					formName="form";
				}
				var operBz=$("#"+formName).find(":input:hidden[name='model.operBz']");
				var operAdd=$("#"+formName).find(":input:hidden[name=operAdd]").val();
				var operYlgxysfyy=$("#"+formName).find(":input:hidden[name=operYlgxysfyy]").val();
				if($(this).prop("checked")){
					//$("#"+formName).find(":input:hidden[name=oper]").val(operYlgxysfyy);
					$("#"+formName).find(":input:hidden[name=oper]").val("import");
					if(operBz.val().indexOf('ylgxysfyy') == -1){
						operBz.val(operBz.val()+',ylgxysfyy');
					}
				}else{
					$("#"+formName).find(":input:hidden[name=oper]").val(operAdd);
					if(operBz.val().indexOf('ylgxysfyy') != -1){
						operBz.val(operBz.val().replace(',ylgxysfyy',''));
					}
				}
				// 取消验证事件
				var copyurl =$(":input:hidden[name=copyAddUrl]").val();
				$("#"+formName).attr("action",copyurl);
				$("#"+formName).validationEngine("detach");
				$("#"+formName).submit();
			});
		}
		//新版高血压随访用药引入----add wq
		if($("#ylgxysfyyNew").attr("jlbh")==""){
			$("#ylgxysfyyNew").html("&nbsp;&nbsp;&nbsp;<input type='checkbox' class='radNo' id='ylgxysfyyIdNew' " +
			"name='ylgxysfyyNew'><label for='ylgxysfyyIdNew'>引入最后一次高血压随访用药</label>");
			if($("#ylgxysfyyNew").attr("operBz").indexOf("ylgxysfyyNew")!= -1){
				$("#ylgxysfyyIdNew").prop("checked",true);
			}
			$("#ylgxysfyyIdNew").click(function(){
				var formName=$("#ylgxysfyyNew").attr("formName");
				if(!formName){
					formName="form";
				}
				var operBz=$("#"+formName).find(":input:hidden[name='modelNew.operBz']");
				var operAdd=$("#"+formName).find(":input:hidden[name=operAdd]").val();
				var operYlgxysfyy=$("#"+formName).find(":input:hidden[name=operYlgxysfyy]").val();
				if($(this).prop("checked")){
					//$("#"+formName).find(":input:hidden[name=oper]").val(operYlgxysfyy);
					$("#"+formName).find(":input:hidden[name=oper]").val("importNew");
					if(operBz.val().indexOf('ylgxysfyyNew') == -1){
						operBz.val(operBz.val()+',ylgxysfyyNew');
					}
				}else{
					$("#"+formName).find(":input:hidden[name=oper]").val(operAdd);
					if(operBz.val().indexOf('ylgxysfyyNew') != -1){
						operBz.val(operBz.val().replace(',ylgxysfyyNew',''));
					}
				}
				// 取消验证事件
				var copyurl =$(":input:hidden[name=copyAddUrl]").val();
				$("#"+formName).attr("action",copyurl);
				$("#"+formName).validationEngine("detach");
				$("#"+formName).submit();
			});
		}
		
		if($("#ylsctjsj").attr("jlbh")==""){
			$("#ylsctjsj").html("&nbsp;&nbsp;&nbsp;<input type='checkbox' class='radNo' id='ylsctjsjId' " +
			"name='ylsctjsj'><label for='ylsctjsjId'>引入上次老年人随访数据</label>");
			if($("#ylsctjsj").attr("operBz").indexOf("ylsctjsj") != -1){
				$("#ylsctjsjId").prop("checked",true);
			}
			$("#ylsctjsjId").click(function(){
				debugger;
				var formName=$("#ylsctjsj").attr("formName");
				if(!formName){
					formName="form";
				}
				var operBz=$("#"+formName).find(":input:hidden[name='model.operBz']");
				var operAdd=$("#"+formName).find(":input:hidden[name=operAdd]").val();
				//var operYlsctjsj=$("#"+formName).find(":input:hidden[name=operYlsctjsj]").val();
				if($(this).prop("checked")){
					//$("#"+formName).find(":input:hidden[name=oper]").val(operYlsctjsj);
					$("#"+formName).find(":input:hidden[name=oper]").val("import");
					if(operBz.val().indexOf('ylsctjsj') == -1){
						operBz.val(operBz.val()+',ylsctjsj');
					}
				}else{
					$("#"+formName).find(":input:hidden[name=oper]").val(operAdd);
					if(operBz.val().indexOf('ylsctjsj') != -1){
						operBz.val(operBz.val().replace(',ylsctjsj',''));
					}
				}
				// 取消验证事件
				var copyurl =$(":input:hidden[name=ylsctjsjUrl]").val();
				$("#"+formName).attr("action",copyurl);
				$("#"+formName).validationEngine("detach");
				$("#"+formName).submit();
			});
		}
		//新版上次老年人随访数据引入----add wq
		if($("#ylsctjsjNew").attr("jlbh")==""){
			$("#ylsctjsjNew").html("&nbsp;&nbsp;&nbsp;<input type='checkbox' class='radNo' id='ylsctjsjIdNew' " +
			"name='ylsctjsjNew'><label for='ylsctjsjIdNew'>引入上次体检数据</label>");
			if($("#ylsctjsjNew").attr("operBz").indexOf("ylsctjsjNew") != -1){
				$("#ylsctjsjIdNew").prop("checked",true);
			}
			$("#ylsctjsjIdNew").click(function(){
				var formName=$("#ylsctjsjNew").attr("formName");
				if(!formName){
					formName="form";
				}
				var operBz=$("#"+formName).find(":input:hidden[name='modelNew.operBz']");
				var operAdd=$("#"+formName).find(":input:hidden[name=operAdd]").val();
				//var operYlsctjsj=$("#"+formName).find(":input:hidden[name=operYlsctjsj]").val();
				if($(this).prop("checked")){
					//$("#"+formName).find(":input:hidden[name=oper]").val(operYlsctjsj);
					$("#"+formName).find(":input:hidden[name=oper]").val("importNew");
					if(operBz.val().indexOf('ylsctjsjNew') == -1){
						operBz.val(operBz.val()+',ylsctjsjNew');
					}
				}else{
					$("#"+formName).find(":input:hidden[name=oper]").val(operAdd);
					if(operBz.val().indexOf('ylsctjsjNew') != -1){
						operBz.val(operBz.val().replace(',ylsctjsjNew',''));
					}
				}
				// 取消验证事件
				var copyurl =$(":input:hidden[name=ylsctjsjUrl]").val();
				$("#"+formName).attr("action",copyurl);
				$("#"+formName).validationEngine("detach");
				$("#"+formName).submit();
			});
		}
		
		$("#ylptyysj").html("&nbsp;&nbsp;&nbsp;<input type='checkbox' class='radNo' id='ylptyysjId' " +
		"name='ylptyysjId'><label for='ylptyysjId'>引入平台用药数据</label>");
		if($("#ylptyysj").attr("operBz")=="ylptyysj"){
			$("#ylptyysjId").prop("checked",true);
		}
	
		$("#ylptyysjId").click(function(){
			if($(this).prop("checked")){
			
			}else{
				
			}
		});
	});
	
	// 身份证处理
	function getIdCardInfo(cardNo) {
	    var info = {
	        isTrue : false,
	        year : null,
	        month : null,
	        day : null,
	        isMale : false,
	        isFemale : false
	    };
	    if (!cardNo && 15 != cardNo.length && 18 != cardNo.length) {
	        info.isTrue = false;
	        return info;
	    }
	    if (15 == cardNo.length) {
	        var year = cardNo.substring(6, 8);
	        var month = cardNo.substring(8, 10);
	        var day = cardNo.substring(10, 12);
	        var p = cardNo.substring(14, 15); // 性别位
	        var birthday = new Date(year, parseFloat(month) - 1,
	                parseFloat(day));
	        // 对于老身份证中的年龄则不需考虑千年虫问题而使用getYear()方法
	        if (birthday.getYear() != parseFloat(year)
	                || birthday.getMonth() != parseFloat(month) - 1
	                || birthday.getDate() != parseFloat(day)) {
	            info.isTrue = false;
	        } else {
	            info.isTrue = true;
	            info.year = birthday.getFullYear();
	            info.month = birthday.getMonth() + 1;
	            info.day = birthday.getDate();
	            if (p % 2 == 0) {
	                info.isFemale = true;
	                info.isMale = false;
	            } else {
	                info.isFemale = false;
	                info.isMale = true
	            }
	        }
	        return info;
	    }
	    if (18 == cardNo.length) {
	        var year = cardNo.substring(6, 10);
	        var month = cardNo.substring(10, 12);
	        var day = cardNo.substring(12, 14);
	        var p = cardNo.substring(14, 17)
	        var birthday = new Date(year, parseFloat(month) - 1,
	                parseFloat(day));
	        // 这里用getFullYear()获取年份，避免千年虫问题
	        if (birthday.getFullYear() != parseFloat(year)
	                || birthday.getMonth() != parseFloat(month) - 1
	                || birthday.getDate() != parseFloat(day)) {
	            info.isTrue = false;
	            return info;
	        }
	        var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子
	        var Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X
	        // 验证校验位
	        var sum = 0; // 声明加权求和变量
	        var _cardNo = cardNo.split("");

	        if (_cardNo[17].toLowerCase() == 'x') {
	            _cardNo[17] = 10;// 将最后位为x的验证码替换为10方便后续操作
	        }
	        for ( var i = 0; i < 17; i++) {
	            sum += Wi[i] * _cardNo[i];// 加权求和
	        }
	        var i = sum % 11;// 得到验证码所位置

	        if (_cardNo[17] != Y[i]) {
	            return info.isTrue = false;
	        }
	        info.isTrue = true;
	        info.year = birthday.getFullYear();
	        info.month = birthday.getMonth() + 1;
	        info.day = birthday.getDate();
	        if (p % 2 == 0) {
	            info.isFemale = true;
	            info.isMale = false;
	        } else {
	            info.isFemale = false;
	            info.isMale = true
	        }
	        return info;
	    }
	    return info;
	}
}

// Checkbox 互斥选项。 checboxName 名字 mutexValue：与其它互斥的值
function checkCheckox(checboxName,mutexValue){
	$("input[name='"+checboxName+"']").click(function(){
		if($(this).val()===mutexValue){
			$("input[name='"+checboxName+"']:checked").each(function(index,domEle){
				if($(this).val()!==mutexValue){
					$(this).prop("checked",false);
					$(this).next().removeClass('checked');
	 			}
			});
		}else{
			$("input[name='"+checboxName+"']:checked").each(function(index,domEle){
				if($(this).val()===mutexValue){
					$(this).prop("checked",false);
					$(this).next().removeClass('checked');
	 			}
			});
		}
	});
}


// Checkbox 选中或放弃选中整列 obj:操作整列的对象 name:被操作列的name属性
function selectAllCheckboxList(obj,name){
	if (obj.checked==true){
		// $("input[name='"+name+"']").click();
		$("input[name='"+name+"']").prop("checked", true);
	}else{
		$("input[name='"+name+"']").prop("checked", false);
	}
	
}

/**
 * 通过身份证获得出生日期
 */
function getBirth(value) {
if (!value) {
	return "";
}
var year = "1900";
var month = "1";
var day = "1";
if (value.length == 15) {
	year = "19" + value.substr(6, 2);
	month = value.substr(8, 2);
	day = value.substr(10, 2);
} else if (value.length == 18) {
	year = value.substr(6, 4);
	month = value.substr(10, 2);
	day = value.substr(12, 2);
} else {
	return "";
}
newDate = new Date(year, month - 1, day);
	if (newDate.toString() == "NaN") {
		return "";
	}
else {
	return year + "-" + month + "-" + day;
}
	}
	
	/**
	 * \ 通过身份证获取性别
	 */
function getSex(value) {
if (!value) {
	return "0";
} else if (value.length == 15) {
	return parseInt(value.substr(14, 1),10)%2?"1":"2";
} else if (value.length == 18) {
	return parseInt(value.substr(16, 1),10)%2?"1":"2";
} else {
	return "0";
}
}

/**
 * BMI 值计算。
 */

function  getBMI(sgdocmentName,tzdocmentName,bmidocmentName){
var  sg_Value = parseFloat($("input[name='"+sgdocmentName+"']").val());
var  tz_Value = parseFloat($("input[name='"+tzdocmentName+"']").val());
if(typeof sg_Value =='number'||typeof tz_Value =='number'){
	if(sg_Value>0&&tz_Value>0){
		$("input[name='"+bmidocmentName+"']").val(parseFloat(tz_Value/(sg_Value*sg_Value)*10000).toFixed(2));
	}
}

}

/*
radio选中指定name和value的项
*/
function checkRadio(radioName,checkValue){
$("input[name='"+radioName+"']").each(function(index,domEle){
	$(this).next().removeClass('checked');
	$(this).prop("checked",false);
	if($(this).val()===checkValue){
		$(this).next().addClass('checked');
		$(this).prop("checked",true);
	}
});
}

/**
 * 档案评分，目前无明确规则，按输入项比列统计
 * $("td.tdbg").each(function () {
		//alert($(this).text() + '----' + i);
		if($(this).text()==''){
		  i++;
		}
    });
 */
function score(){
	var i=0;
	var count_all = $("ol td.tdbg").length;
	var empty_count = $("ol td:empty").length;
	art.dialog({content:'共计'+count_all+'输入项,空缺'+empty_count+'项,已录'+(count_all-empty_count)+'项,综合评分'+Math.round((count_all-empty_count)/count_all*100)+'。'});
}


/**
 * 支持 enter键查询
 */

//$(window).keydown(function(event){
//	  if(event.keyCode == 13){
//		  doQuery();
//	 	  } 
 //});
$(function() {  
    $("form").keypress(function(e) {  
    if (e.which == 13) {// 判断所按是否回车键  
        //var inputs = $("form").find(":input"); // 获取表单中的所有输入框 
        var inputs = $("form").find("input:visible");
        //alert(inputs.length);
        var idx = inputs.index($("input:focus"));// 获取当前焦点输入框所处的位置  
        //alert(idx + "--" + inputs.length);
        if (idx == inputs.length - 1) {// 判断是否是最后一个输入框  
            if (confirm("最后一个输入框已经输入,是否提交?")) // 用户确认  
            alert("submit");
        } else {  
            movenext(inputs,idx);
        } 
        return false;// 取消默认的提交行为  
    }  
    });  

    function movenext(inputs,idx){
    	inputs[idx + 1].focus(); // 设置焦点  
        inputs[idx + 1].select(); // 选中文字 
    }
}); 
/*
$(function() {  
    $("form input:text").keypress(function(e) {  
    if (e.which == 13) {// 判断所按是否回车键  
        var inputs = $("form").find(":text"); // 获取表单中的所有输入框  
        var idx = inputs.index(this); // 获取当前焦点输入框所处的位置  
        if (idx == inputs.length - 1) {// 判断是否是最后一个输入框  
            if (confirm("最后一个输入框已经输入,是否提交?")) // 用户确认  
            $("form").submit(); // 提交表单  
        } else {  
            inputs[idx + 1].focus(); // 设置焦点  
            inputs[idx + 1].select(); // 选中文字  
        }  
        return false;// 取消默认的提交行为  
    }  
    });  
}); 
 */
 //变态form保存@-@___
 function btSaveForm(action,pk, url){
		$(".message_head").next(".message_body").slideDown(500);
		var vf = true;

		var fms = $("iframe[name='frame']");
		var ydesYl;
		for(var i=0;i<fms.length;i++ ){
			ydesYl = $(fms[i]).contents().find('#'+pk).val();
			if(ydesYl){
				vf = vf && (fms[i].contentWindow.saveFormValidate());
				if(!vf){
					return;
				}
			}else{
				fms[i].contentWindow.passValidate();
			}
	    }    
		
		if (vf){
			templateDialogConfirm(function() {
				templateDealWith();
				var suc = true;
				for(var i=0;i<fms.length;i++ ){
					ydesYl = $(fms[i]).contents().find('#'+pk).val();
					if(ydesYl){
						var formData = fms[i].contentWindow.saveForm();
						$.ajax({
			                cache: true,
			                async: false,
			                type: "POST",
			                url: action,
			                data:formData,
			                async: false,
			                error: function(request) {
			                    suc = false;
			                    return;
			                },
			                success: function(data) {
			                	if(data.suc != true){
			                		suc = false;
			                		templateDialogAlert(function(){},data);
			                	}else{
			                		var jlbh = $($("iframe[name='frame']")[i]).contents().find(':hidden[name="model.jlbh"]');
			                		if(!jlbh.val()){
			                			jlbh.val(data.jlbh);
			                		}
			                	}
			                }
			            });
					}
			    } 
				if(suc){
					templateDialogAlert(function(){},"保存成功！");
					if (url) {
						window.location = url;
					}
				}else{
					templateDialogAlert(function(){},"保存报错！");
				}
			}, "确认保存吗？");
		}
	}
// 烟台
 var yt = {
			iframe : {
				addNewIframe : function (target, url, width){
					var html = '<iframe name="frame" src="';
					html += url;
					html += '" height="95%" width="' + width + 'px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" >';
					html += '</iframe>';
					$(target).append(html);
					//$($(target).find("iframe[name='frame']")[0]).after(html);			
					this.resetYtFrame(target);
				},
				resetYtFrame : function (target) {
					var widthSum = 0;
					var iframeCount = 0;
					var maxHeight = 0;
					$.each($(target + " iframe"), function(i,v) {
						var wid = $(v).attr("width");
						wid = wid.replace('px','');
						widthSum += parseFloat(wid);
						iframeCount += 1;
					});
					if(iframeCount == 1){
						widthSum += 20;
					}else{
						//widthSum += (iframeCount -1) * 12;
						widthSum += iframeCount * 90;
					}
					$(target).css('width', widthSum + "px");
				}
			}
		}
 
 