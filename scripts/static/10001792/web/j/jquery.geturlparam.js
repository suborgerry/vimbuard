jQuery.fn.extend({getUrlParam:function(a){a=escape(unescape(a));var b=new Array,c=null;if("#document"==$(this).attr("nodeName")){if(window.location.search.search(a)>-1){var d=/&amp/,e=d.exec(window.location.search);c=null!=e?window.location.search.substr(1,window.location.search.length).split("&amp;"):window.location.search.substr(1,window.location.search.length).split("&")}}else if("undefined"!=$(this).attr("src")){var f=$(this).attr("src");if(f.indexOf("?")>-1){var g=f.substr(f.indexOf("?")+1);c=g.split("&")}}else{if("undefined"==$(this).attr("href"))return null;var f=$(this).attr("href");if(f.indexOf("?")>-1){var g=f.substr(f.indexOf("?")+1);c=g.split("&")}}if(null==c)return null;for(var h=0;h<c.length;h++)escape(unescape(c[h].split("=")[0]))==a&&b.push(c[h].split("=")[1]);return 0==b.length?null:1==b.length?b[0]:b}});
//# sourceMappingURL=jquery.geturlparam.js.map