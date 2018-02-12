package com.wondersgroup.frame.core.base.init;


import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.web.context.WebApplicationContext;

import com.opensymphony.xwork2.util.logging.Logger;
import com.opensymphony.xwork2.util.logging.LoggerFactory;

public class InitListener implements ServletContextListener {

	protected static Logger LOG = LoggerFactory.getLogger(InitListener.class);

	private WebApplicationContext springContext;

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		System.out.println("web exit ... ");
	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		System.out.println("web init ... ");
	}

}
