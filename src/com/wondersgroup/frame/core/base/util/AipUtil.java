package com.wondersgroup.frame.core.base.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;

import com.baidu.aip.speech.AipSpeech;
import com.baidu.aip.speech.TtsResponse;

public class AipUtil {
	
	//设置APPID/AK/SK
    public static final String APP_ID = "10153779";
    public static final String API_KEY = "aerX6P8rqNaF4AMIcK9b67cy";
    public static final String SECRET_KEY = "jTCK8kIdak1iVQFyTVGc4QzB8hMqHyMc";
	


	public static byte[] TextToAudio(String appId,String aipKey,String secretKey,String tex,
			                         String lang,String spd,String pit,String vol,String per) {
		
		if("".equalsIgnoreCase(appId) || appId==null){
			appId = "10153779";
	    }
		if("".equalsIgnoreCase(aipKey) || aipKey==null){
			aipKey = "aerX6P8rqNaF4AMIcK9b67cy";
	    }
		if("".equalsIgnoreCase(secretKey) || secretKey==null){
			secretKey = "jTCK8kIdak1iVQFyTVGc4QzB8hMqHyMc";
	    }
		
		// 初始化一个AipSpeech
		AipSpeech client = new AipSpeech(appId, aipKey, secretKey);

		// 可选：设置网络连接参数
		client.setConnectionTimeoutInMillis(2000);
		client.setSocketTimeoutInMillis(60000);

		// 可选：设置代理服务器地址, http和socket二选一，或者均不设置
		// client.setHttpProxy("proxy_host", proxy_port); // 设置http代理
		// client.setSocketProxy("proxy_host", proxy_port); // 设置socket代理
		
		//设置参数
//		tex	String	合成的文本，使用UTF-8编码，请注意文本长度必须小于1024字节	是
//		lang	String	语言选择,填写zh	是
//		ctp	String	客户端类型选择，web端填写1	是
//		cuid	String	用户唯一标识，用来区分用户，填写机器 MAC 地址或 IMEI 码，长度为60以内	否
//		spd	String	语速，取值0-9，默认为5中语速	否
//		pit	String	音调，取值0-9，默认为5中语调	否
//		vol	String	语速，取值0-15，默认为5中语速	否
//		per	String	发音人选择, 0为女声，1为男声，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女	否
		
	    
	    //判断参数空值
	    if("".equalsIgnoreCase(lang) || lang==null){
	    	lang = "zh";
	    }
	    if("".equalsIgnoreCase(tex) || tex==null){
	    	tex = "什么都没有填让我读什么?";
	    }
	    if("".equalsIgnoreCase(spd) || spd==null){
	    	spd = "5";
	    }
	    if("".equalsIgnoreCase(pit) || pit==null){
	    	pit = "5";
	    }
	    if("".equalsIgnoreCase(vol) || vol==null){
	    	vol = "5";
	    }
	    if("".equalsIgnoreCase(per) || per==null){
	    	vol = "0";
	    }
	    
	    HashMap<String, Object> options = new HashMap<String, Object>();
	    options.put("spd", spd);
	    options.put("pit", pit);
	    options.put("vol", vol);
	    options.put("per", per);

		// 调用接口
		TtsResponse res = client.synthesis(tex, lang, 1, options);
		System.out.println(res.getErrorCode());
		byte[] data = res.getData();
		return data;
	}


}
