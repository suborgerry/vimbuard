function detectInitScreen(){return window.getComputedStyle?window.getComputedStyle(document.body,":after").getPropertyValue("content"):""}function setStickyHeight(){var a=detectInitScreen(),b=72;return"mobile"==a&&(b=0),"tablet"==a&&(b=0),b}function sysReqOsVer(){var a,b=navigator.userAgent.toLowerCase(),c=["XP","Vista","7","8","10"],d=avm.require("avast.detect")();if("object"==typeof d&&d.os.isWindows)for(var e=0;c.length>e;e++)d.os.version===c[e]&&(a=d.os.name+" "+d.os.version);return!(b.indexOf(" arm;")>-1)&&a}var Abdata={cache:{},options:{pricelistApi:avastGlobals.web.RootPath+"api/v2/pricing/business-pricelist?",pricelistApiB:avastGlobals.web.RootPath+"api/v2/pricing/pricelist?",vatLocales:{}},init:function(a){return this.options=$.extend({},this.options,a),this.cache={},this.cacheDelimiter=",","undefined"==typeof $.xhrPool&&($.xhrPool=[],$.xhrPool.abortAll=function(){$.each(this,function(a,b){b.abort()})}),this.getPriceData(),this},createCacheId:function(a){var b=this.options.el,c=b?b.data():null,d=a||this.collectAjaxParams(c),e=this.cacheDelimiter;return"multiyear"===d.abtype?d.internalId+"-"+d.campaign+e+d.maintenance+e:d.internalId+"-"+d.campaign+e+d.maintenance+e+d.computers+e+d.lic+e+d.appendix},getPriceData:function(a){var b,c=a||this.options.el,d=c?c.data():null,e=this.ajaxParams=this.collectAjaxParams(d),f="multiyear"===e.abtype?this.options.pricelistApi:this.options.pricelistApiB,g=this.createCacheId(e),h="productId="+e.internalId.match(/[^-]*-[^-]*/)+"&internalId="+e.internalId+"&maintenance="+e.multiyear+"&seats="+e.computers+"&locale="+avast.locale+"&campaignMarker="+e.campaignMarker+"&platform=web&h="+e.apiHash;e.installments&&(h+="&installments="+e.installments),e.campaign&&(h+="&campaign="+e.campaign),e.provider&&(h+="&provider="+e.provider),this.cache[g]?(b=this.selectFromCache(g),$(c).trigger("data.ab.avast",[b?"data sent":"no data",b])):$.ajax({type:"GET",url:f+h,dataType:"json",context:this,beforeSend:function(a){$.xhrPool.push(a)},success:function(a){this.parseData(g,a),b=this.selectFromCache(g),$(c).trigger("data.ab.avast",[b?"data sent":"no data",b])},error:function(a,b,d){"abort"!==b&&$(c).trigger("data.ab.avast",["ajax error",b,d])}})},collectAjaxParams:function(a){var b={};return a&&(b={abtype:"string"==typeof a.abtype&&a.abtype.indexOf("business")>-1?"multiyear":"",internalId:a.internalid||"",campaign:a.campaign||"",maintenance:a.maintenance||"12",computers:a.computers||"1",lic:a.lic||"1",appendix:"",multiyear:a.multiyear||"12,24,36",provider:a.provider||null,installments:a.installments||null,additional2:a.additional2||null,apiHash:a.apiHash||null,campaignMarker:a.campaignMarker||"WDS"}),b},parseData:function(a,b){var c=this.cacheDelimiter,d=this,e=new RegExp(this.cacheDelimiter+"(.+?)"+this.cacheDelimiter);if(d.updateCache(a,{}),b&&!b.products)$.each(b,function(){var b=a.replace(e,c+this.maintenance+c);this.maintenanceLimits=[12,24,36],this.computersLimits=[1,3,5,10],this.priceInNumber=""+this.price,this.price=this.priceFormatted,this.realPriceInNumber=""+d.stripDecimals(this.realPrice,this.precision),this.realPrice=this.realPriceFormatted,this.totalPrice=d.getTotalPrice(this.internalId),d.updateCache(b,this)});else if(b.products&&0!==b.products.length)$.each(b.products,function(){var f={},g=[],h=[],i=$(this)[0],j=a.replace(e,c+i.maintenance+c);for(var k in i.prices)g.push({min:parseInt(k,10),price:parseFloat(i.prices[k])}),h.push({min:parseInt(k,10),price:parseFloat(i.prices[k])});f.price=function(a){for(var c,e=parseInt(a,10),f=b.vat&&d.options.vatLocales[avast.locale]?b.vat:1,h=0;g.length>h;h++)e>=g[h].min&&(c=g[h].price);return c*e*f},f.realPrice=function(a){for(var c,e=parseInt(a,10),f=b.vat&&d.options.vatLocales[avast.locale]?b.vat:1,g=0;h.length>g;g++)e>=h[g].min&&(c=h[g].price);return c*e*f},f.link=function(a){return b.link.replace("{PID}",i.foreignId).replace("{QUANT}",a)},f.flatDiscount=b.discount,f.discountType=b.discountType,f.minQuantity=b.minQuantity,f.maxQuantity=b.maxQuantity,f.maintenance=i.maintenance,f.maintenanceLimits=[12,24,36],f.priceFormat=b.priceFormat,f.currency=b.currencySymbol,f.thousandSeparator=b.thousandSeparator,f.decimalSeparator=b.decimalSeparator,f.precision=b.precision,f.priceFormat=b.priceFormat,d.updateCache(j,f)});else{$(elem).trigger("data.ab.avast",["no data"])}},stripDecimals:function(a,b){var c=new RegExp("^-?\\d+(?:\\.\\d{0,"+b+"})?");return b&&(a=a.toString().match(c)[0]),Number(a)},updateCache:function(a,b){this.cache[a]=b},selectFromCache:function(a){return this.cache[a]},getDataByInternalId:function(a,b){var c=this.cache,d=$.extend({},{internalId:a},b),e=this.collectAjaxParams(d),f=this.createCacheId(e),g=this.selectFromCache(f),h=new RegExp("^"+a),i=[];if(b)g&&i.push(g);else for(var j in c)h.test(j)&&i.push(c[j]);return i},getTotalPrice:function(a){var b=null;return $("[data-pricelist]").each(function(c){var d;try{d=JSON.parse(this.dataset.pricelist)}catch(e){console.log(e)}d&&d[a]&&(b=d[a].realPriceFormatted)}),b}},Actionbox={defaults:{abProductsSelector:"[data-internalid]",overlaySelector:"#overlay",abBoxSelector:".box",autoLoadData:!1,installments:0,installmentTemplate:'<b class="installment">#p&#215; de </b>',customCurrency:"",currencySwitch:""},init:function(a,b){this.options=$.extend({},this.defaults,a),this.build(b),$(document).on("data.ab.avast",$.proxy(this.loopBoxes,this))},build:function(a){this.countTimeout="",this.context=$(a),this.abEl=this.context.data("internalid")?this.context:this.context.find("[data-internalid]").first(),this.abEl.find(".add").on("mousedown.ab.avast",$.proxy(this.updateInputs,this)),this.abEl.find(".add").on("mouseup.ab.avast",$.proxy(this.updateInputsData,this)),$(document).on("keydown.ab.avast",$.proxy(this.handleKeyPress,this)),this.preRender(),this.options.autoLoadData&&this.pullData()},preRender:function(){this.abEl.append('<div class="ab-overlay hidden" />'),this.resetInputs();var a=this.options.abBoxSelector;this.abEl.find(".no-discount").each(function(){var b=$(this),c=b.closest(a),d=b.find(".value"),e=d.text(),f=!$.trim(e),g=$(c).find("a.button > span").text()===e?1:0;(f||g)&&b.addClass("hidden")})},pullData:function(){this.abEl.addClass("spinning"),this.abEl.find(".box .button").addClass("spinning"),this.abEl.parent("div").find(".ab-overlay").removeClass("hidden"),$.data(this.abEl.get(0),"abdata")?this.abEl.data("abdata").getPriceData():"function"==typeof $.fn.abdata&&this.abEl.abdata({el:this.abEl})},loopBoxes:function(a,b,c){var d;if(c&&c.maintenance){var e=this;this.fillData(a,b,c),this.abEl.data("maintenance",parseInt(c.maintenance,10)+12),d=this.abEl.find("[data-internalid]").filter(function(){var a=$(this).data("internalid"),b=(e.buildInternalId(a,{maintenance:parseInt(c.maintenance,10)+12}),e.internalIdToObj(a)),d=b.maintenance,f=parseInt(c.maintenance,10)+12;return parseInt(d,10)===f}),$.data(this.abEl.get(0),"abdata")&&d.length>0?this.pullData():$(document).trigger("priceUpdate.ab.avast",["actionbox prices updated"]),this.abEl.removeData("maintenance")}},fillData:function(a,b,c){var d,e={},f=this.abEl.find("#computers"),g=this.abEl.data("internalid"),h=this,i=this.options.installments?this.options.installments:"monthly"===this.options.pricing&&c&&c.maintenance?c.maintenance:1,j=c.currencySymbol?c.currencySymbol:c.currency;if(c){c.minQuantity&&parseInt(f.val(),10)<=parseInt(c.minQuantity,10)&&f.val(c.minQuantity),c.maxQuantity&&parseInt(f.val(),10)>=parseInt(c.maxQuantity,10)&&f.val(c.maxQuantity);var k=f.val();if(e.link="function"==typeof c.link?c.link(k):c.link,e.realPrice="function"==typeof c.realPrice?c.realPrice(k):c.realPrice,e.price="function"==typeof c.price?c.price(k):c.price,e.discount=c.discount,"function"==typeof c.price&&(e.price=this.formatPrice(e.price,c.priceFormat,c.currency,c.precision,c.decimalSeparator,c.thousandSeparator),e.realPrice=this.formatPrice(e.realPrice,c.priceFormat,c.currency,c.precision,c.decimalSeparator,c.thousandSeparator)),this.options.installments){var l=this.formatPrice(c.realPriceInNumber/this.options.installments,c.priceFormat,j,c.precision,c.decimalSeparator,c.thousandSeparator);e.realPriceTotal=e.realPrice,e.realPrice=this.options.installmentTemplate.replace("#p",this.options.installments)+l}if(this.options.priceyTypo){var m=this.formatPrice(c.realPriceInNumber/i,c.priceFormat,j,c.precision,c.decimalSeparator,c.thousandSeparator);m=m.replace("&nbsp;","");var n=m.split(c.decimalSeparator),o=[];o.push('<span class="price-wrapper">'),0===m.indexOf(j)&&o.push('<span class="currency">'+j+"</span>"),o.push('<span class="integer">'+n[0].replace(j,"")+"</span>"),n[1]&&o.push('<span class="decimal">'+c.decimalSeparator+n[1].replace(j,"")+"</span>"),0!==m.indexOf(j)&&o.push('<span class="currency">'+j+"</span>"),o.push("</span>"),e.realPriceTotal=e.realPrice,e.realPrice=o.join("")}"monthly"===this.options.pricing&&(e.link=e.link.replace(/\/CustomID.(.*)\//,"/CustomID."+this.options.customId+"/")),c.computersLimits&&!this.abEl.data("computers-limits")&&this.abEl.data("computers-limits",c.computersLimits),c.maintenanceLimits&&!this.abEl.data("maintenance-limits")&&this.abEl.data("maintenance-limits",c.maintenanceLimits),c.minQuantity&&this.abEl.data("min-quantity",c.minQuantity),c.maxQuantity&&this.abEl.data("max-quantity",c.maxQuantity),c.maintenance&&g&&(this.buildInternalId(g,{maintenance:parseInt(c.maintenance,10)}),d=this.abEl.find("[data-internalid]").filter(function(){var a=$(this).data("internalid"),b=h.internalIdToObj(a),d=b.maintenance,e=parseInt(c.maintenance,10);return parseInt(d,10)===e})),d&&this.renderData(d,e)}},renderData:function(a,b){this.renderValue(".button > span",a,b.realPrice),this.renderValue(".discounted > span:first-child",a,b.realPrice),this.renderValue(".discount",a,b.realPriceTotal),this.renderValue(".no-discount",a,b.discount?b.price:""),this.renderValue(".save",a,b.discount),this.renderValue(".button",a,b.link,"href"),this.renderValue(".cart",a,b.link,"href"),this.abEl.removeClass("spinning"),this.abEl.find(".box .button").removeClass("spinning"),this.abEl.find(".ab-overlay").addClass("hidden")},formatPrice:function(a,b,c,d,e,f){var g;if("function"==typeof $().number_format&&(g=$().number_format(a,{numberOfDecimals:d,decimalSeparator:e,thousandSeparator:f,symbol:""})),g)return b.replace("#c",c).replace("#p",g)},renderValue:function(a,b,c,d){var e=a?$(b).find(a):"";c?(e.removeClass("hidden"),d&&"class"!==d?e.attr(d,c):d&&"class"===d?(e.removeClass(this.findClass(e,"avast-").join("")),e.addClass(c)):e.has(".value").length>0?e.find(".value").html(c):e.html(c)):e.addClass("hidden")},updateInputsData:function(a){var b=this.abEl.find("#computers"),c=this.abEl.find("#maintenance"),d=$(a.currentTarget).siblings(".amount").find("#computers").length>0?b:c,e=parseInt(d.val(),10),f=this.pad(b.val(),3),g=$(a.currentTarget);"custom"!==g.data("behavior")&&(clearTimeout(this.countTimeout),d===c&&parseInt(e,10)>=12&&(e=parseInt(e,10)/12),this.abEl.data("computers",b.val()),("mouseup"===a.type||"mouseout"===a.type&&"mouseout"===g.data("flag-outbound"))&&(g.removeData("flag-outbound"),this.updateInternalIds({pcs:f}),this.pullData()))},pad:function(a,b){for(var c=a+"";c.length<b;)c="0"+c;return c},updateInternalIds:function(a){var b=this;("business"!==this.abEl.data("abtype")?this.abEl.parent():this.abEl).find("[data-internalid]").each(function(){var c=$(this),d=b.buildInternalId(c.data("internalid"),a);c.data("internalid",d)})},buildInternalId:function(a,b){var c=this.internalIdToObj(a),d={};return b&&$.extend(d,c,b),$.map(d,function(a){return a}).join("-")},internalIdToObj:function(a){var b={},c=a.split("-");return b.name=c[0],b.version=c[1],b.pcs=c[2],b.maintenance=c[3],b.renewal=c[4],b},resetInputs:function(){var a=this.abEl.find("#computers"),b=this.abEl.find("#maintenance"),c=this.abEl;a.val(1),b.val(1),c.data("computers",1),c.data("maintenance",12),c.data("internalid-default")&&c.data("internalid",c.data("internalid-default")),this.abEl.find(".add.disabled").removeClass("disabled")},findClass:function(a,b){return $(a).attr("class").split(" ").filter(function(a){return 0===a.lastIndexOf(b,0)})},allowedValues:function(a,b,c){var d=[],e=!(!a||!b)&&b-a+1;if(!c&&e)for(var f=0;e>f;f++)d.push(a+f);else d=c;return d},updateInputs:function(a){function b(a){a(),g.countTimeout=setTimeout(function(){b(a)},d),d=d>f?d*e:f}var c=$(a.currentTarget),d=300,e=.5,f=50,g=this,h=c.closest(".select").find("input").attr("id"),i=this.abEl.find("#"+h),j=c.hasClass("plus")?1:-1,k=parseInt(this.abEl.data("min-quantity"),10),l=parseInt(this.abEl.data("max-quantity"),10),m="computers"===h?this.abEl.data("computers-limits"):this.abEl.data("maintenance-limits"),n=this.allowedValues(k,l,m);$(a.currentTarget).hasClass("disabled")||("function"==typeof a.originalEvent.preventDefault&&a.originalEvent.preventDefault(),n?(f=150,this.countIndex=n.indexOf("computers"===h?parseInt(i.val(),10):12*parseInt(i.val(),10))):this.countIndex="computers"===h?parseInt(i.val(),10):12*parseInt(i.val(),10),"mouseout"!==c.data("flag-outbound")&&(c.on("mouseout.ab.avast",function(a){clearTimeout(g.countTimeout),g.updateInputsData.call(g,a),c.off("mouseout.ab.avast"),c.removeData("flag-outbound")}),c.data("flag-outbound","mouseout")),b(function(){g.updateCount(n,g.countIndex,h,j,k,l)}))},updateCount:function(a,b,c,d,e,f){var g;if(a)b+d>=0&&b+d<a.length?this.countIndex=b+d:(g=0===b?4:3,4===g&&(this.countIndex=a.length-1),3===g&&(this.countIndex=0)),this.abEl.find("#"+c).val("computers"===c?a[this.countIndex]:a[this.countIndex]/12);else{var h=this.abEl.find("#"+c),i=parseInt(h.val(),10)+d;i>0&&h.val(i),i>f&&(g=3),i<=e&&(g=4)}g&&this.triggerMsg("validation.avast",g)},_clearTimeout:function(){clearTimeout(this.countTimeout)},triggerMsg:function(a,b){$(document).trigger(a,[{message:b}])},updatePrice:function(){var a=this.options||{};"function"==typeof $.fn.abdata&&(a.el=this.abEl,this.abEl.abdata(a))}};Array.prototype.filter||(Array.prototype.filter=function(a){if(void 0===this||null===this)throw new TypeError;var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError;for(var d=[],e=arguments.length>=2?arguments[1]:void 0,f=0;f<c;f++)if(f in b){var g=b[f];a.call(e,g,f,b)&&d.push(g)}return d}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){if(this===undefined||null===this)throw new TypeError('"this" is null or not defined');var c=this.length>>>0;for(b=+b||0,Math.abs(b)===Infinity&&(b=0),b<0&&(b+=c)<0&&(b=0);b<c;b++)if(this[b]===a)return b;return-1}),"function"!=typeof Object.create&&(Object.create=function(a){function b(){}return b.prototype=a,new b}),$(document).ready(function(){$.fn.ab=$.fn.actionbox=function(a){if(this.length>0){if(Actionbox[a]&&$(this).data("actionbox"))return void $(this).data("actionbox")[a].apply($(this).data("actionbox"));if("object"==typeof a||!a)return this.each(function(){var b=Object.create(Actionbox);b.init(a,this),$.data(this,"actionbox",b)})}},$.fn.abdata=function(a){if(this.length>0)return this.each(function(){var b=Object.create(Abdata);b.init(a),$.data(this,"abdata",b)})};var a={};"pt-br"===locale&&(a.installments=3),$("#abox-home-color-v10").length>0&&(a.priceyTypo=!0),$('#abox-home-color-v10 [data-pricing="monthly"]').length>0&&(a.priceyTypo=!0,a.pricing="monthly",a.customId="PPMONTH"),$("#abox-home-boxes-v10").actionbox(a),$("#abox-home-color-v10").actionbox(a)}),$(document).ready(function(){var a=sysReqOsVer();a||($("#sysreq .supported").hide(),$("#sysreq .not-supported").show()),$(".sysreq-toggle-link").on("click",function(a){a.preventDefault();var b=$("#sysreq"),c=b.outerHeight(),d=c-$("#sysreq .supported").outerHeight()+$("#sysreq .not-supported").height();b.css({"min-height":c+"px"}),b.animate({"min-height":d},200),$("#sysreq .supported").fadeOut(300,function(){$("#sysreq .not-supported").fadeIn(300)})}),a&&$("#sysreq .sysreq-os-ver").text(a)});
//# sourceMappingURL=product-home-v10.js.map