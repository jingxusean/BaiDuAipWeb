package com.wondersgroup.frame.core.base.annotation;

import java.lang.annotation.Documented;  
import java.lang.annotation.ElementType;  
import java.lang.annotation.Inherited;  
import java.lang.annotation.Retention;  
import java.lang.annotation.RetentionPolicy;  
import java.lang.annotation.Target;  
  
  
@Target(ElementType.FIELD)  
@Retention(RetentionPolicy.RUNTIME)  
@Documented  
@Inherited  
public @interface BeanColumn {  
      
    /** 
     * 列名注释 
     */  
    public String name() default "";  
  
}  
