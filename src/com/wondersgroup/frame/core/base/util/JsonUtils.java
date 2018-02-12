package com.wondersgroup.frame.core.base.util;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

public class JsonUtils {
	public static void returnJson(HttpServletResponse ressponse,Object obj){
		ressponse.setContentType("application/json");
		ressponse.setCharacterEncoding("UTF-8");
		try {
			ressponse.getWriter().print(com.alibaba.fastjson.JSON.toJSONString(obj));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

}
