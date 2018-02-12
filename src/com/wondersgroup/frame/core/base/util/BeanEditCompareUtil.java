package com.wondersgroup.frame.core.base.util;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.wondersgroup.frame.core.base.annotation.BeanColumn;

/**
 * @desc: 对象修改记录操作工具
 * @date-2011-1-10
 * @author-xujing
 * */
public class BeanEditCompareUtil {

	/**
	 * 获取当前工作薄的每一行数据
	 * */
	public static String compareBean(Object po,Object vo)
			throws IOException {

		Class<?> targetClass = po.getClass();
		//Method methods[] = targetClass.getMethods();
		String resultStr = "";
		Field fields[] = targetClass.getDeclaredFields();
		String befValue = "";
		String aftValue = "";
		for (Field field : fields) {
			BeanColumn columnAnno = field.getAnnotation(BeanColumn.class);
			//System.out.println("=====>>" + field.getName());
			//System.out.println("=====>>" + field.getName());
			if (columnAnno != null) {//需要做比较
				try {
					if (invokeGet(po, field.getName())!=null){
						befValue = invokeGet(po, field.getName()).toString();
					}else{
						befValue = "";
					}
					if (invokeGet(vo, field.getName())!=null){
						aftValue = invokeGet(vo, field.getName()).toString();
					}else{
						aftValue = "";
					}
					if(!befValue.equalsIgnoreCase(aftValue)){
					    resultStr += "#@#" + columnAnno.name() + ":" + befValue.toString() + "=>" + aftValue;
					}
				} catch (IllegalArgumentException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

		}
		return resultStr;
	}

	/**
	 * 是否为符合javaBean规范的set方法
	 * 
	 * @param methodName
	 * @return
	 */
	public static boolean isSetMethod(Method method) {
		String methodName = method.getName();
		if (!methodName.startsWith("set")) {
			return false;
		}
		Class<?>[] clazzes = method.getParameterTypes();
		// 如果方法的参数>1 则不是设置属性的方法
		if (clazzes.length != 1) {
			return false;
		}
		return true;
	}

	// 工具函数: 判断字符串不空
	public static boolean isNotEmpty(String s) {
		return s != null && !s.trim().equalsIgnoreCase("");
	}

	// 取obj属性值
	private static Object invokeGet(Object target, String name) {
		// System.out.println("========>>" + name);
		name = name.substring(0, 1).toUpperCase() + name.substring(1);
		String getMethodName = "get" + name;

		Object res = null;
		try {
			Method method = target.getClass().getMethod(getMethodName);
			res = method.invoke(target);
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		return res;
	}

}
