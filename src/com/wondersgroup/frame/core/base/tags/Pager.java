package com.wondersgroup.frame.core.base.tags;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.components.UIBean;
import org.apache.struts2.views.annotations.StrutsTag;
import org.apache.struts2.views.annotations.StrutsTagAttribute;

import com.opensymphony.xwork2.util.ValueStack;
import com.wondersgroup.frame.core.base.model.PageModel;

@StrutsTag(name = "pager", tldTagClass = "com.wondersgroup.frame.core.base.tags.PagerTag", description = "Pager")
public class Pager extends UIBean {
	private PageModel page;

	public Pager(ValueStack stack, HttpServletRequest request,
			HttpServletResponse response) {
		super(stack, request, response);
	}

	@Override
	protected String getDefaultTemplate() {
		return "pager";
	}

	@StrutsTagAttribute(description = "set page", type = "PageModel")
	public void setPage(PageModel page) {
		this.page = page;
	}

	@Override
	protected void evaluateExtraParams() {
		super.evaluateExtraParams();

		if (null != page) {
			addParameter("page", findAncestor(page.getClass()));
		}
	}
}
