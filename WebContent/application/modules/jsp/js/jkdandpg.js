//禁止用户输入，收缩压和舒张压只能输入数字1234567890
	function IsNum(e) {
            var k = window.event ? e.keyCode : e.which;
            if (((k >= 48) && (k <= 57)) || k == 8 || k == 0) {
            } else {
                if (window.event) {
                    window.event.returnValue = false;
                }
                else {
                    e.preventDefault(); //for firefox 
                }
            }
        }
	 /* 自动评估专项血压等级结果
		规则  1级高血压 SBP140-159或DBP90-99   autoEvaluation('model_xyspSsy','model_xyspSzy','model\\.ztpgXyfjjg');   getXxgwxys('model\\.wxysBcdxgjb','0');
			 2级高血压 SBP160-179或DBP100-109
			 3级高血压 SBP≥180或DBP≥110
			 sbp:舒张压id
			 dbp：收缩压id
			 caseRadioName:血压等级级联radio的name --血压评估级联选择的值 autoEvaluation('model_xyspSsy','model_xyspSzy','model\\.ztpgXyfjjg','model\\.wxysXxgbzywxys','0','model\\.wxysBqgsh','0','model\\.wxysBcdxgjb','0','model\\.wxysTnb');
			 checkboxName1:心血管因素checkbox name
			 elideVlue1:心血管因素忽略值
			 checkboxName2:靶器官损害checkbox name
			 elideVlue2:靶器官损害忽略值
			 checkboxName3_1:并存相关疾病checkbox name
			 elideVlue3_1:并存相关疾病忽略值
			  checkboxName3_2:并存相关疾病checkbox name
			 elideVlue3_2:并存相关疾病忽略值
			  checkboxName3_3:并存相关疾病checkbox name
			 elideVlue3_3:并存相关疾病忽略值
			  checkboxName3_4:并存相关疾病checkbox name
			 elideVlue3_4:并存相关疾病忽略值
			  checkboxName3_5:并存相关疾病checkbox name
			 elideVlue3_5:并存相关疾病忽略值
			 tnbRadioName : 糖尿病选项name
			 wxfcRadioName :危险分层自动评估radio
			 fcglRadioName :分层管理结果自动评估radio
*/
function autoGxyzxEvaluation(sbp,dbp,caseRadioName,checkboxName1,elideVlue1,checkboxName2,elideVlue2,checkboxName3_1,elideVlue3_1,checkboxName3_2,elideVlue3_2,checkboxName3_3,elideVlue3_3,checkboxName3_4,elideVlue3_4,checkboxName3_5,elideVlue3_5,tnbRadioName,wxfcRadioName,fcglRadioName){
	/**
		自动评估血压等级
	*/
	var gxyfcjg = getXyfj(sbp,dbp);
	checkRadio(caseRadioName,gxyfcjg);
	/**
		自动评估危险分层结果
	*/
	var xxgwxysCount = getXxgwxys(checkboxName1,elideVlue1);//心血管病重要危险因素选中个数
	var bqgshCount = getXxgwxys(checkboxName2,elideVlue2);//靶器官损害个数
	var tnbVlue = $("input[name='"+tnbRadioName+"']:checked").val();//糖尿病选中值 
	var bcxgjbCount = getXxgwxys(checkboxName3_1,elideVlue3_1);//并存的相关疾病个数 
		bcxgjbCount = bcxgjbCount+getXxgwxys(checkboxName3_2,elideVlue3_2);//并存的相关疾病个数 
		bcxgjbCount = bcxgjbCount+getXxgwxys(checkboxName3_3,elideVlue3_3);//并存的相关疾病个数 
		bcxgjbCount = bcxgjbCount+getXxgwxys(checkboxName3_4,elideVlue3_4);//并存的相关疾病个数 
		bcxgjbCount = bcxgjbCount+getXxgwxys(checkboxName3_5,elideVlue3_5);//并存的相关疾病个数 
	if(bcxgjbCount>0||(typeof tnbVlue=='string'&&tnbVlue==='1')){
		checkRadio(wxfcRadioName,'4');
		checkRadio(fcglRadioName,'3');
	}else{
	 	if(xxgwxysCount>=3||bqgshCount>0){
			if(gxyfcjg>2){
				checkRadio(wxfcRadioName,'4');
				checkRadio(fcglRadioName,'3');
			}else{
				checkRadio(wxfcRadioName,'3');
				checkRadio(fcglRadioName,'3');
			}
		}else if (xxgwxysCount>=1){
			if(gxyfcjg>2){
				checkRadio(wxfcRadioName,'4');
				checkRadio(fcglRadioName,'3');
			}else{
				checkRadio(wxfcRadioName,'2');
				checkRadio(fcglRadioName,'2');
			}
		}else{
			if(gxyfcjg>2){
				checkRadio(wxfcRadioName,'3');
				checkRadio(fcglRadioName,'3');
			}else if(gxyfcjg>1){
				checkRadio(wxfcRadioName,'2');
				checkRadio(fcglRadioName,'2');
			}else{
				checkRadio(wxfcRadioName,'1');
				checkRadio(fcglRadioName,'1');
			}
		}
	 }
	//alert(xxgwxysCount+"--"+bqgshCount+"--"+tnbVlue +"--"+bcxgjbCount)
}
       
   /* 自动评估血压等级
   		规则  1级高血压 SBP140-159或DBP90-99   autoEvaluation('model_xyspSsy','model_xyspSzy','model\\.ztpgXyfjjg');   getXxgwxys('model\\.wxysBcdxgjb','0');
   			 2级高血压 SBP160-179或DBP100-109
   			 3级高血压 SBP≥180或DBP≥110
   			 sbp:舒张压id
   			 dbp：收缩压id
   			 caseRadioName:血压等级级联radio的name --血压评估级联选择的值 autoEvaluation('model_xyspSsy','model_xyspSzy','model\\.ztpgXyfjjg','model\\.wxysXxgbzywxys','0','model\\.wxysBqgsh','0','model\\.wxysBcdxgjb','0','model\\.wxysTnb');
   			 checkboxName1:心血管因素checkbox name
   			 elideVlue1:心血管因素忽略值
   			 checkboxName2:靶器官损害checkbox name
   			 elideVlue2:靶器官损害忽略值
   			 checkboxName3:心血管因素checkbox name
   			 elideVlue3:心血管因素忽略值
   			 tnbRadioName : 糖尿病选项name
   			 wxfcRadioName :危险分层自动评估radio
   			 fcglRadioName :分层管理结果自动评估radio
    */
    function autoEvaluation(sbp,dbp,caseRadioName,checkboxName1,elideVlue1,checkboxName2,elideVlue2,checkboxName3,elideVlue3,tnbRadioName,wxfcRadioName,fcglRadioName){
		/**
			自动评估血压等级
		*/
    	var gxyfcjg = getXyfj(sbp,dbp);
    	checkRadio(caseRadioName,gxyfcjg);
    	/**
    		自动评估危险分层结果
    	*/
    	var xxgwxysCount = getXxgwxys(checkboxName1,elideVlue1);//心血管病重要危险因素选中个数
    	var bqgshCount = getXxgwxys(checkboxName2,elideVlue2);//靶器官损害个数
    	var tnbVlue = $("input[name='"+tnbRadioName+"']:checked").val();//糖尿病选中值 
    	var bcxgjbCount = getXxgwxys(checkboxName3,elideVlue3);//并存的相关疾病个数 
    	
    	if(bcxgjbCount>0||(typeof tnbVlue=='string'&&tnbVlue==='1')){
    		checkRadio(wxfcRadioName,'4');
    		checkRadio(fcglRadioName,'3');
    	}else{
    	 	if(xxgwxysCount>=3||bqgshCount>0){
    			if(gxyfcjg>2){
    				checkRadio(wxfcRadioName,'4');
    				checkRadio(fcglRadioName,'3');
    			}else{
    				checkRadio(wxfcRadioName,'3');
    				checkRadio(fcglRadioName,'3');
    			}
    		}else if (xxgwxysCount>=1){
    			if(gxyfcjg>2){
    				checkRadio(wxfcRadioName,'4');
    				checkRadio(fcglRadioName,'3');
    			}else{
    				checkRadio(wxfcRadioName,'2');
    				checkRadio(fcglRadioName,'2');
    			}
    		}else{
    			if(gxyfcjg>2){
    				checkRadio(wxfcRadioName,'3');
    				checkRadio(fcglRadioName,'3');
    			}else if(gxyfcjg>1){
    				checkRadio(wxfcRadioName,'2');
    				checkRadio(fcglRadioName,'2');
    			}else{
    				checkRadio(wxfcRadioName,'1');
    				checkRadio(fcglRadioName,'1');
    			}
    		}
    	 }
		//alert(xxgwxysCount+"--"+bqgshCount+"--"+tnbVlue +"--"+bcxgjbCount)
    }
     /*
    	获得血压分级
    
      */
    function getXyfj(sbp,dbp){
    	var sbpValue =$("#"+sbp).val();
    	var dbpValue =$("#"+dbp).val();
    	if(typeof sbpValue=='string'&&typeof dbpValue=='string'&&sbpValue!==''&&dbpValue!==''){
    		if(sbpValue>=140||dbpValue>=90){
    			if(sbpValue<=159&&dbpValue<=99){//一级
    				return '1';
    			}else if(sbpValue<=179&&dbpValue<=109){//二级
    				return '2';
    			}else {//三级
    				return '3';
    			}
    		}else{
    			return '1';
    		}
    	}else{
    			$.dialog({
					    content: '收缩压或者舒张压值不正确，请正确填写后再评估！',
					    lock: true,
					    title: '消息提示',
					    okVal:'确定',
					     ok: true,
					    
					});
    	}
    } 
    
     /*获得checkbox选中的个数  */
     function getXxgwxys(CheckboxName ,elideVlue){
     	var number = 0;
     	$("input[name='"+CheckboxName+"']:checked").each(function(index,domEle){
			if($(this).val()!=elideVlue){
				number=number+1;
			}  		
     	});
     	return number;
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