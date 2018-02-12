<div class="checkboxs">
<#list parameters.codeMap?keys as key>
<span>
<input type="checkbox" name="${parameters.beanName}" <#rt/>
class="radNo <#if parameters.clazz??>${parameters.clazz}<#rt/></#if>" <#rt/>
id="${parameters.beanName}${key_index}" <#rt/>
value="${key}" <#rt/>
<#if (parameters.codeValue?? && parameters.codeValue?index_of(","+key+",")>-1)>checked</#if><#rt/>/><label for="${parameters.beanName}${key_index}">${parameters.codeMap[key]}</label>
</span>
</#list>
</div>