package com.wondersgroup.frame.core.base.tags;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.components.UIBean;
import org.apache.struts2.views.annotations.StrutsTag;
import org.apache.struts2.views.annotations.StrutsTagAttribute;

import com.opensymphony.xwork2.util.ValueStack;

@StrutsTag(name = "age", tldTagClass = "com.wondersgroup.frame.core.base.tags.AgeTag", description = "Age")
public class Age extends UIBean {
	
	private String csrq;

	public Age(ValueStack stack, HttpServletRequest request,
			HttpServletResponse response) {
		super(stack, request, response);
	}

	@Override
	protected String getDefaultTemplate() {
		return "age";
	}

	@StrutsTagAttribute(description = "set csrq", type = "String")
	public void setCsrq(String csrq) {
		this.csrq = csrq;
	}
	
	public String getCsrq() {
		return csrq;
	}

	protected void evaluateExtraParams() {
		super.evaluateExtraParams();
		if (null != csrq) {
			addParameter("csrq", findAncestor(csrq.getClass()));
		}
	}
}
