package com.wondersgroup.frame.core.base.tags;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.components.Component;
import org.apache.struts2.views.jsp.ui.AbstractUITag;

import com.opensymphony.xwork2.util.ValueStack;

public class AgeTag extends AbstractUITag { 
     
	private static final long serialVersionUID = 1L;
	
	private Date csrq;
 
     @Override
     public Component getBean(ValueStack stack, HttpServletRequest request, 
             HttpServletResponse response) {
         return new Age(stack, request, response);
     }

     @Override
     protected void populateParams() {
         super.populateParams();
         
         Age age=(Age)component;
         String csrqString="";
         if(csrq!=null){
        	 Date now=new Date();
        	 csrqString=Integer.valueOf(((now.getTime()-csrq.getTime())/(long)(1000*60*60*24)/(long)365.25)+"").toString();
         }
         age.setCsrq(csrqString);
     }

	public Date getCsrq() {
		return csrq;
	}

	public void setCsrq(Date csrq) {
		this.csrq = csrq;
	}

 }

