package com.wondersgroup.frame.core.base.tags;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.components.Component;
import org.apache.struts2.views.jsp.ui.AbstractUITag;

import com.opensymphony.xwork2.util.ValueStack;
import com.wondersgroup.frame.core.base.model.PageModel;

public class PagerTag extends AbstractUITag { 
     
	private static final long serialVersionUID = 1L;
	
	private PageModel page;
 
     @Override
     public Component getBean(ValueStack stack, HttpServletRequest request, 
             HttpServletResponse response) {
         return new Pager(stack, request, response);
     }

     @Override
     protected void populateParams() {
         super.populateParams();

         Pager pager = (Pager)component;
         //pager.getStack().findValue("page");
         pager.setPage(page);
     }

     public void setPage(PageModel page) {
         this.page = page;
     }

	
 }

