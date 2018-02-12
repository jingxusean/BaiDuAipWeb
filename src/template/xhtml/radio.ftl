<div class="selradio">
<#list parameters.codeMap?keys as key>
<span>
<input type="radio" name="${parameters.beanName}" <#rt/>
class="radNo <#if parameters.clazz??>${parameters.clazz}<#rt/></#if>" <#rt/>
id="${parameters.beanName}${key_index}" <#rt/>
value="${key}" <#rt/>
<#if (key==parameters.codeValue)>checked</#if><#rt/>/>
<label ondblclick="$(this).prop('className','');$('#${parameters.beanName?replace('.','\\\\.')}${key_index}').prop('checked',false);" for="${parameters.beanName}${key_index}">${parameters.codeMap[key]}</label>
</span>
</#list>
</div>


