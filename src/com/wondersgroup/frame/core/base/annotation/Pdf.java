package com.wondersgroup.frame.core.base.annotation;

import java.lang.annotation.Documented;  
import java.lang.annotation.ElementType;  
import java.lang.annotation.Inherited;  
import java.lang.annotation.Retention;  
import java.lang.annotation.RetentionPolicy;  
import java.lang.annotation.Target;  
  
/** 
 * @desc: 标记为pdf  
 * @date-2011-1-15 
 * @author ziliang 
 */  
@Target(ElementType.TYPE)  
@Retention(RetentionPolicy.RUNTIME)  
@Documented  
@Inherited  
public @interface Pdf {  
    /** 
     * pdf根节点名 
     *  
     * @return 
     */  
    public String name() default "";  
  
    /** 
     * pdf的命名空间 
     *  
     * @return 
     */  
    public String qName() default "";  
  
}  

