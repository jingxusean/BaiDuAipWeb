<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="common/init.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<base href="<%=basePath%>" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>文字转音频</title>
<link rel="stylesheet" href="css/validate/validationEngine.jquery.css"
	type="text/css" />
<link href="css/reset.css" rel="stylesheet" type="text/css" />
<link href="css/styles${sessionScope.AuthUser.su.ext3}.css" rel="stylesheet" type="text/css" />
<link href="css/select2.css" rel="stylesheet" />
<link rel="stylesheet" href="css/validate/validationEngine.jquery.css"
	type="text/css" />
<script src="jquery/jquery-1.10.2.min.js" type="text/javascript"></script>
<script src="jquery/validate/languages/jquery.validationEngine-zh_CN.js"
	type="text/javascript" charset="utf-8"></script>
<script src="jquery/validate/jquery.validationEngine.js"
	type="text/javascript" charset="utf-8"></script>
<script src="jquery/jquery.welautoHi.js" type="text/javascript"></script>
<script src="js/js.js" type="text/javascript"></script>
<script src="js/select2.js"></script>
<script src="js/commEdit.js" type="text/javascript"></script>
<script
	src="jquery/artDialog/jquery.artDialog.js?skin=idialog"
	type="text/javascript"></script>
<script language="javascript" type="text/javascript"
	src="js/My97DatePicker/WdatePicker.js"></script>
<script src="jquery/artDialog/plugins/iframeTools.js"></script>
<script src="jquery/jquery.welautoHi.js" type="text/javascript"></script>
<style>
html,body {
	overflow: scroll;
	overflow: hidden;
}
</style>
<!--[if IE 6]>
<style type="text/css">
html{overflow:hidden}
body{height:100%;overflow:auto}
.bc{position:absolute}
</style>
<![endif]-->
<script>
		$(document).ready(function(){
			var len=$(window).height();
			$("#mbGxbZxdaEditForm").validationEngine('attach', {
				relative: true,
				overflownDIV:"#divOverflown"
			});
			$(document).ready(function() { $(".asddd").select2(); });
			czry("#jdys,#lrr,#bkys",dataAll);
		});
		function saveForm()
		{
		$(".message_head").next(".message_body").slideDown(500);
			if($("#AipActionExe").validationEngine("validate")){
				templateDialogConfirm(function(){
					templateDealWith();
					$("#AipActionExe").submit();
				},"确认保存吗？");
			}
		}
		function pauseForm()
		{
		templateDealWith();
		$('#oper').val('pause');
        document.getElementById('skipbutton').click();
		}
		
</script>
</head>
<body style="background: #246cb9;">
	<div class="right">
		<div class="title">
			<h3>
				<p>
					<span>文字转音频</span></p>
			</h3>
		</div>
		<div class="main mainheight">
			<ol class="message_list  m_b_40" style="position: relative;">
				<s:form action="AipActionExe" id="AipActionExe" method="post">

					<li>
						<p class="message_head six">
							<span class="cur"><i></i>
							</span>
						</p>
						<div class="message_body">
							<table border="0" cellspacing="0" cellpadding="0"
								class="query_form">
								<tr>
									<td class="tdbg" width="150">appId</td>
									<td width="31%"><s:textfield name="appId" />
									</td><td class="tdbg" width="150">apiKey</td>
									<td><s:textfield name="apiKey" />
									</td>
								</tr>
								<tr>
									<td class="tdbg" width="150">secretKey</td>
									<td width="31%"><s:textfield name="secretKey" />
									</td><td class="tdbg" width="150">lang</td>
									<td><s:textfield name="lang" />
									</td>
								</tr>
								<tr>
									<td class="tdbg" width="150">tex</td>
									<td colSpan="3"><s:textfield name="tex" />
									</td>
								</tr>
								<tr>
									<td class="tdbg" width="150">spd</td>
									<td width="31%"><s:textfield name="spd" />
									</td>
									<td class="tdbg" width="150">pit</td>
									<td><s:textfield name="pit" />
									</td>
								</tr>
								<tr>
									<td class="tdbg" width="150">vol</td>
									<td width="31%"><s:textfield name="vol" />
									</td>
									<td class="tdbg" width="150">per</td>
									<td><s:textfield name="per" />
									</td>
								</tr>
								
							</table>
						</div></li>
					<li>
						<p class="bc">
							<input name="" value="保 存" type="button" onclick="saveForm();" />
						</p> <input id="skipbutton" class="submit validate-skip" type="submit"
						style="display: none;" />
					</li>
				</s:form>
			</ol>
		</div>
	</div>
</body>
</html>

