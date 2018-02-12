package com.wondersgroup.frame.core.base.exception;

public class CustomException extends Exception {

	private static final long serialVersionUID = 1L;
	
	private String M_message;

	public CustomException(String p_MeString) {
		super(p_MeString);
		this.M_message = p_MeString;
	}

	public String getM_message() {
		return M_message;
	}

	public void setM_message(String mMessage) {
		M_message = mMessage;
	}

}
