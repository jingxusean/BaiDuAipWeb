//自适应高度  
$(function($) {
    resizeH();
   /* $(window).resize(function(){
       resizeH();
    });*/
});

 

function resizeH(){
     var len=$(window).height();
    //alert(len);
    //console.log(len);
    $(".leftBox").css({"height": + len - 36});
    $(".mainheight").css({"height": + len - 53});
    $(".autoheight").css({"height": + len - 0});
}