package com.wondersgroup.frame.core.base.annotation;

import java.lang.annotation.Documented;  
import java.lang.annotation.ElementType;  
import java.lang.annotation.Inherited;  
import java.lang.annotation.Retention;  
import java.lang.annotation.RetentionPolicy;  
import java.lang.annotation.Target;  
  
/** 
 * @desc: 标记为xml  
 * @date-2011-1-15 
 * @author ziliang 
 */  
@Target(ElementType.TYPE)  
@Retention(RetentionPolicy.RUNTIME)  
@Documented  
@Inherited  
public @interface Xml {  
    /** 
     * xml根节点名 
     *  
     * @return 
     */  
    public String name() default "";  
  
    /** 
     * xml的命名空间 
     *  
     * @return 
     */  
    public String qName() default "";  
  
}  

