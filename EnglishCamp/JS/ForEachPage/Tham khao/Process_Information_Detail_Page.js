

function LoadInformationDetail(div,CodeContents)
{
 
    var html = "<div class='title'><span> {$T.Contents_Group.CategoryNameLevel1} </span></div>";
    html = html + "<div id='content_detail'>";
    
    html = html + "<div  class='detail-wrap'>";

    html = html + "	<div class='information-detail clearfix'>";
    html = html + "   <div>";
    html = html + "     <div>";
    html = html + "	        <div class='img-detail left'>";
    html = html + "	            <img src='" + sys_CommonType.PathDefaultUpload + "{$T.Contents_Group.Image}' width='337' height='164' alt='' />";
    html = html + "	        </div>";
    html = html + "     </div>";
    html = html + "     <div>";
    html = html + "	        <h1>{$T.Contents_Group.Title}</h1>";
    html = html + "	        <div class='item-cat'>";
    html = html + "	             {$T.Contents_Group.CategoryNameLevel1}";
    html = html + "	        </div>";
    html = html + "	        <div class='short-des'>";
    html = html + "	            {$T.Contents_Group.Intro}";
    html = html + "	        </div>";
    html = html + "	        <div class='item-action'>";
    html = html + "	            <div class='left'>";
    html = html + "	                <a class='print' href='#'>print</a>";
    html = html + "	                <span>{$T.aContents.ViewCount} view</span>";
    html = html + "	            </div>";
    html = html + "	        <div class='right'>{$T.Contents_Group.DateCreated}</div>";
    html = html + "	    </div>";
    html = html + "  </div>";


    html = html + "  </div>";
    html = html + "  <div class='left'>";
    html = html + "	      {$T.Contents_Group.Info}";
    html = html + " </div>";
    html = html + "	</div>";
    html = html + "	<!-- end information-detail-->";
    html = html + "	<div class='item-action t-cen clearfix'>";
    html = html + "	    <div class='right'>{$T.Contents_Group.DateCreated}</div>";
    html = html + "	    <a class='print' href='#'>print</a>";
    html = html + "	    <span>230 view</span>";
    html = html + "	</div>";
    html = html + "	</div>";
    html = html + "	</div>";

    

    var data = ContentsBO.LoadContents_ByCode(CodeContents, 80, 420);
    
    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

    html = jQuery(div).html();
    html = Encoder.htmlDecode(html);
    jQuery(div).html(html);

}