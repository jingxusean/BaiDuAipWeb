       <#if (page.totalPages>=1)><a href="javascript:gofirst()"><i class="pg_hm">首页</i></a></#if>
       <#if (page.currentPage>1)><a href="javascript:goprevious()"><i class="prev">上一页</i></a></#if>
       <#if (page.currentPage<page.totalPages)><a href="javascript:gonext()"><i class="next">下一页</i></a></#if>
       <#if (page.currentPage<=page.totalPages)><a href="javascript:golast(${page.totalPages?c})"><i class="pg_wy">尾页</i></a></#if>  
     &nbsp; 共 ${page.totalPages}页 &nbsp; 合计 ${page.totalRecords}条
              转到第<input id="gopagenumber" type="text" value="${page.currentPage?c}" maxlength="7"  maxnum="${page.totalPages?c}" >页
     <input onclick="return goNumPage(${page.totalPages?c});" name="" class="tz_bt" value="跳转" type="button">