package com.wondersgroup.frame.core.base.action;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.convention.annotation.ExceptionMapping;
import org.apache.struts2.convention.annotation.ExceptionMappings;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.util.ServletContextAware;

import com.opensymphony.xwork2.ActionSupport;
import com.wondersgroup.frame.core.base.model.PageModel;

/**
 * base action
 * 
 * @author ethan
 */

@Result(name = "error", location = "error.jsp")	
@ExceptionMappings({
@ExceptionMapping(exception="java.lang.Exception",result="error"),
@ExceptionMapping(exception="com.wondersgroup.frame.core.base.exception.CustomException",result="error")
}) 

public class BaseAction extends ActionSupport implements ServletContextAware, ServletResponseAware, ServletRequestAware, SessionAware {

    private static final long serialVersionUID = 1L; 

    protected ServletContext servletContext;

    protected HttpServletRequest httpServletRequest;

    protected HttpServletResponse httpServletResponse;

    protected HttpSession httpSession;
    
    public String getRequestURI(){
    	return this.httpServletRequest.getRequestURI();
    }
    
    public String getContextPath(){
    	return this.httpServletRequest.getContextPath();
    }
    
  /*public String getRealPath(String path){
    	return this.httpServletRequest.getRealPath(path);
    }*/
    
    public String storagePath;
    
    public String getStoragePath() {
		return storagePath;
	}

	public void setStoragePath(String storagePath) {
		this.storagePath = storagePath;
	}

	public String redirectUrl;
    
    public String oper;
    
    public PageModel page;
    
    public String ids[];

	public String[] getIds() {
		return ids;
	}

	public void setIds(String[] ids) {
		this.ids = ids;
	}

	public PageModel getPage() {
		if(this.page==null){
			this.page = new PageModel();
		}
		return page;
	}

	public void setPage(PageModel page) {
		this.page = page;
	}

    public String getOper() {
		return oper;
	}

	public void setOper(String oper) {
		this.oper = oper;
	}

	public String getRedirectUrl() {
		return redirectUrl;
	}

	public void setRedirectUrl(String redirectUrl) {
		this.redirectUrl = redirectUrl;
	}

	protected Map<String, Object> session; 

	@Override
    public void setServletContext(ServletContext context) {
        this.servletContext = context;
    }

    @Override
    public void setServletResponse(HttpServletResponse response) {
        this.httpServletResponse = response;
    }

    @Override
    public void setServletRequest(HttpServletRequest request) {
        this.httpServletRequest = request;
        this.httpSession = request.getSession();
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }

    public Date addDay(int n) {   
        try { 
                 Calendar cd = Calendar.getInstance();   
                 cd.setTime(new Date());     
                 cd.add(Calendar.MONTH, n);//增加n个月   
                 return cd.getTime();          
             } catch (Exception e) {  
                 return null;   
             }   
     }  
}


