package com.wondersgroup.frame.core.base.annotation;

import java.lang.annotation.Documented;  
import java.lang.annotation.ElementType;  
import java.lang.annotation.Inherited;  
import java.lang.annotation.Retention;  
import java.lang.annotation.RetentionPolicy;  
import java.lang.annotation.Target;  
  
  
@Target(ElementType.METHOD)  
@Retention(RetentionPolicy.RUNTIME)  
@Documented  
@Inherited  
public @interface PdfColumn {  
      
    /** 
     * 列名注释 
     */  
    public String name() default "";  
    
    public String parentNode() default "";
    
    public String codeType() default "";
    
    public int orderby() default 0;
  
}  
