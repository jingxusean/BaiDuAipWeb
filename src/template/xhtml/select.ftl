<select name="${parameters.beanName}" style="width:60%" data-placeholder="" <#rt/>
class="<#if !parameters.clazz??>asddd</#if>
		<#if parameters.clazz?? && parameters.clazz!='selectTemplate'>asddd<#rt/></#if>
		<#if parameters.clazz??>${parameters.clazz}<#rt/></#if>"<#rt/>
id="<#if parameters.id?? >${parameters.id}</#if>"<#rt/>
>
<option value="">--请选择--</option>
<#list parameters.codeMap?keys as key>  
<option value="${key}" <#if (key==parameters.codeValue)>selected</#if>>${parameters.codeMap[key]}</option>  
</#list>
</select>