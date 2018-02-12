package com.wondersgroup.frame.core.base.annotation;

import java.lang.annotation.Documented;  
import java.lang.annotation.ElementType;  
import java.lang.annotation.Inherited;  
import java.lang.annotation.Retention;  
import java.lang.annotation.RetentionPolicy;  
import java.lang.annotation.Target;  
  
/** 
 * Title: 标记该属性不会被映射 
 * Description: 
 * Create DateTime: 2011-1-15 
 *  
 * @author ziliang 
 */  
@Target(ElementType.METHOD)  
@Retention(RetentionPolicy.RUNTIME)  
@Documented  
@Inherited  
public @interface Ignore {  
  
}  

