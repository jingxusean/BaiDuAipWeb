package com.wondersgroup.jkda.application.modules.action;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.wondersgroup.frame.core.base.action.BaseAction;
import com.wondersgroup.frame.core.base.model.PageModel;
import com.wondersgroup.frame.core.base.util.AipUtil;


/**
 * @author Sean Xu
 */

//@ParentPackage("struts-default")
@ParentPackage("basePackge")
@Controller
public class AipAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	private PageModel page;

	public PageModel getPage() {
		if (this.page == null) {
			this.page = new PageModel();
		}
		return page;
	}

	public void setPage(PageModel page) {
		this.page = page;
	}
	
	private String appId;
	private String  apiKey;
	private String  secretKey;

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	public String getApiKey() {
		return apiKey;
	}

	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}

	public String getSecretKey() {
		return secretKey;
	}

	public void setSecretKey(String secretKey) {
		this.secretKey = secretKey;
	}
	
	private String tex;
	private String lang;
	private String spd;
	private String pit;
	private String vol;
	private String per;

	public String getTex() {
		return tex;
	}

	public void setTex(String tex) {
		this.tex = tex;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}

	public String getSpd() {
		return spd;
	}

	public void setSpd(String spd) {
		this.spd = spd;
	}

	public String getPit() {
		return pit;
	}

	public void setPit(String pit) {
		this.pit = pit;
	}

	public String getVol() {
		return vol;
	}

	public void setVol(String vol) {
		this.vol = vol;
	}

	public String getPer() {
		return per;
	}

	public void setPer(String per) {
		this.per = per;
	}

//	  <result name="download" type="stream">
//      <!-- 下载文件类型 -->
//      <param name="contentType">text/plain</param>
//      <!-- 下载对话框所弹出的文件名 -->
//      <param name="contentDisposition">
//      attachment;fileName=${currentLogName}
//      </param>
//      <!-- 下载的InputStream流，Struts2自己动对应Action中的getDownloadFile方法，该方法必须返回InputStream 类型 -->
//      <param name="inputName">downloadFile</param>
//    </result>
	@Action(value = "AipAction", results = {@Result(name = SUCCESS, location = "index.jsp")})
	@Override
	public String execute() {
		System.out.println("Start!");
		return SUCCESS;
	}
	
	@Action(value = "AipActionExe", results = {@Result(name = "download", type="stream", params={
					"contentType","octet-stream",
					"contentDisposition","attachment;fileName=audit.mp3",//${currentFileName}
					"inputName","downloadFile"
					}) 
	        })
	public String download() {
		System.out.println("Start!");
		return "download";
	}
	
	public InputStream getDownloadFile() {
		byte[] audit = AipUtil.TextToAudio(this.appId, this.apiKey, this.secretKey,
				this.tex, this.lang, this.spd, this.pit, this.vol, this.per);
		InputStream inp = new ByteArrayInputStream(audit); 
		return inp;
	}
	
	
}
