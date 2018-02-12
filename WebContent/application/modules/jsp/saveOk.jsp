<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="common/init.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="jquery/jquery-1.10.2.min.js" type="text/javascript"></script>
<script src="jquery/artDialog/jquery.artDialog.js?skin=${applicationScope.config.style}" type="text/javascript"></script>
<script src="js/comm.js" type="text/javascript"></script>
<script>
	$(function(){
		templateDialogAlert(function(){
			var redirectUrl="${redirectUrl}";
			if(redirectUrl==""||redirectUrl==null){
				window.location.href = document.referrer;
			}else{
				window.location.href = redirectUrl;
			}
		},"操作成功！");
	});
//window.history.back(-1);
</script> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

</body>
</html>