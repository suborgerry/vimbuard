function initAvastForm(a){function b(a){return a.getAttribute("placeholder")||$(a).attr("placeholder")}function c(a){a.value=b(a)}function d(a){a.value=a.value.replace(b(a),"")}var e=avm.require("avast.detect")().browser.isInternetExplorer;if($('#AVform [name*="url"]').attr("value",window.location.href),$("form.avast-form input[data-set-hide]").each(function(){$(this).val($(this).data("set-hide")).closest("div.form-group").hide()}),"undefined"!=typeof formSubmitTracking&&avastFormSubmitTracking(formSubmitTracking),!0===e){var f=$("input[placeholder]");document.documentMode<10&&f.each(function(a,b){0==b.value.length&&c(b)}),f.on("click focus blur",function(){0==this.value.length&&c(this)}),f.on("keydown",function(){d(this)}),f.on("keyup",function(a){var b=a.keyCode;0==this.value.length&&8!=b&&46!=b&&c(this)})}$("form.avast-form div.form-group.alert").length?document.querySelectorAll("form.avast-form div.form-group.alert input[type=text]:not(.nofocus)").forEach(function(a){"none"!==a.closest(".form-group").style.display&&a.focus()}):document.querySelectorAll("form.avast-form input[type=text]:not(.nofocus)").forEach(function(a){"none"!==a.closest(".form-group").style.display&&a.focus()});try{$("form.avast-form").attr("novalidate","novalidate")}catch(g){}$("form.avast-form.live-validation").each(function(){new AvastForm(this).hideConditionInputs()}),$("form.avast-form input[data-help]").each(function(){new AvastForm(this).addHelp(this)}),$("form.avast-form").on("change","input",function(a){if(!$(this.form).hasClass("tracking-started")){avastFormStartTracking(this.form.id.split("\\").pop()),$(this.form).addClass("tracking-started")}}),$("form.avast-form.live-validation").on("change keyup click","input",function(a){if("change"==a.type&&$(this).data("changed",1),$(this).data("changed")||$(this.form).data("submitted")){new AvastForm(this.form).validate(this)}}),$("form.avast-form.live-validation").off("submit").on("submit",function(){$(this).data("submitted",!0);var a=new AvastForm(this),b=a.validate(),c=$(this).hasClass("ajax-form");if(b&&c)return a.ajaxSubmit();var d=$(this).closest("div.AVsizer");if(!b&&d.length){var e=parseInt(d.offset().top);parseInt($(window).scrollTop())>e&&$("html,body").animate({scrollTop:e},200)}return b}),$("form.avast-form [data-ajax]").on("change",function(){new AvastForm(this).ajaxUpdate($(this))}),$.datepicker&&$("input.datepicker").datepicker({dateFormat:"dd.mm.yy",changeYear:!0,changeMonth:!0}),"function"==typeof a&&a.call()}function AvastForm(a){this.form=a,$(this.globalErrorSelector).length&&$(this.form).data("submitted",!0)}function avastFormSubmitTracking(a){}function avastFormStartTracking(a){}"undefined"!=typeof $_&&($=$_),$(initAvastForm),AvastForm.prototype={trErrorClassName:"alert",helpDivSelector:"div.bundle-popup",errorSelector:"ul.errors",formDivSelector:"div.AVsizer",globalErrorSelector:"div.bubble.error",globalNoErrorSelector:"div.form-top",globalErrorClassName:"bubble error",globalNoErrorClassName:"form-top",ajaxHandlerInput:"_ajax_handler_",ajaxErrorInput:"_ajax_error_",globalErrorInput:"_global_error_",validate:function(a){var b=this,c=!1;return a=a||"input",$(a,this.form).each(function(){var a="radio"==this.type?$("input[name="+this.name+"]:first",b.form).get(0):this,d=b.checkControl(a);!0===d?b.removeErrorMessage(a):d&&(b.addErrorMessage(a,d),c=!0)}),!c},checkControl:function(a,b){var c=!0;if(b||$(a).data("nette-rules")){b=b||this.getElementRules(a);var d,e,f,g,h,i=this;b&&b.length&&$.each(b,function(b,j){d=j.op.replace(/^.*:(.*)$/,"$1"),h=j.op.match(/^~:.*$/),g=!!j.rules,f=j.arg||null,elem=j.control?i.form[j.control]:a,e=$(elem).data("validator"),val=i.getElementValue(elem);var k=!0;d&&d in i.validators&&(k=i.validators[d](val,i.form,f)),e&&e in window&&(k=window[e](val,i.form,f)),h&&(k=!k),k||g?k&&g&&(c=i.checkControl(a,j.rules)):c=j.msg})}return c},getElementValue:function(a){var b=$(a).val();if(a.name&&"radio"!=a.type)"checkbox"==a.type&&(b=!!$('input[name="'+a.name+'"]:checked').length);else{var c=a.name?a.name:a[0].name,d=$("input[name="+c+"]:checked");b=d.length?$(d).val():""}return b===$(a).data("nette-empty-value")&&(b=""),b},getElementRules:function(a){return new Function("return "+$(a).attr("data-nette-rules"))()},addErrorMessage:function(a,b){this.removeErrorMessage(a),$(a).closest("div.form-group").addClass(this.trErrorClassName);var c='<ul class="'+this.errorSelector.split(".").pop()+'"><li>'+b+"</li></ul>";$(a).closest("div.form-item").append(c),this.showGlobalErrorMessage()},removeErrorMessage:function(a){$(a).closest("div.form-group, div.captcha").removeClass(this.trErrorClassName).find(this.errorSelector).remove(),this.showGlobalErrorMessage()},showGlobalErrorMessage:function(){if($(this.form).data("submitted")){var a=$(this.form).closest(this.formDivSelector);a.find(this.errorSelector).length&&this.form[this.globalErrorInput]?a.find(this.globalNoErrorSelector).data("oldhtml",$(this.globalNoErrorSelector).html()).removeClass(this.globalNoErrorClassName).addClass(this.globalErrorClassName).append(this.form[this.globalErrorInput].value):a.find(this.globalErrorSelector).html($(this.globalErrorSelector).data("oldhtml")).removeClass(this.globalErrorClassName).addClass(this.globalNoErrorClassName)}},validators:{filled:function(a){return""!==a&&!1!==a&&null!==a},email:function(a){return/^("([ !\x23-\x5B\x5D-\x7E]*|\\[ -~])+"|[-a-z0-9!#$%&'*+\/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+\/=?^_`{|}~]+)*)@([0-9a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,61}[0-9a-z\u00C0-\u02FF\u0370-\u1EFF])?\.)+[a-z\u00C0-\u02FF\u0370-\u1EFF][-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,17}[a-z\u00C0-\u02FF\u0370-\u1EFF]$/i.test(a)},url:function(a){return/^(https?:\/\/|(?=.*\.))([0-9a-z\u00C0-\u02FF\u0370-\u1EFF](([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,61}[0-9a-z\u00C0-\u02FF\u0370-\u1EFF])?\.)*[a-z\u00C0-\u02FF\u0370-\u1EFF][-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,17}[a-z\u00C0-\u02FF\u0370-\u1EFF]|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d{1,5})?(\/\S*)?$/i.test(a)},regexp:function(a,b,c){var d="string"==typeof c&&c.match(/^\/(.*)\/([imu]*)$/);if(d)try{return new RegExp(d[1],d[2].replace("u","")).test(a)}catch(e){}},pattern:function(a,b,c){try{return"string"==typeof c?new RegExp("^("+c+")$").test(a):null}catch(d){}},integer:function(a){return/^-?[0-9]+$/.test(a)},"float":function(a){return/^-?[0-9]*[.,]?[0-9]+$/.test(a)},range:function(a,b,c){return $.isArray(c)?(null===c[0]||parseFloat(a)>=c[0])&&(null===c[1]||parseFloat(a)<=c[1]):null},minLength:function(a,b,c){return a.length>=c},maxLength:function(a,b,c){return a.length<=c},length:function(a,b,c){return c=$.isArray(c)?c:[c,c],(null===c[0]||a.length>=c[0])&&(null===c[1]||a.length<=c[1])},equal:function(a,b,c){if(c===undefined)return!1;c=$.isArray(c)?c:[c];for(var d=0,e=c.length;d<e;d++)if(a==(c[d].control?$(b.elements[c[d].control]).val():c[d]))return!0;return!1}},ajaxSubmit:function(){var a=this.form,b=this,c=this.ajaxHandlerInput in a&&a[this.ajaxHandlerInput].value in window?window[a[this.ajaxHandlerInput].value]:null,d=$(a).serializeArray(),e={url:$(a).attr("action")||document.location.href,cache:!1,data:d,dataFilter:function(a){return $.trim(a)},dataType:"json",type:$(a).attr("method")||"get"},f=$("input[type=submit].ajax");return f.length&&!$("img.form-ajax-loader").length&&f.hide().after('<img src="//static3.avast.com/web/i/ajax-loader.gif" alt="" class="form-ajax-loader" />'),$.ajax(e).fail(function(){$("img.form-ajax-loader").remove(),$("input[type=submit].ajax").show(),alert(a[b.ajaxErrorInput].value)}).done(function(d){"undefined"!=typeof dataLayer&&dataLayer.length>0&&setTimeout(function(){for(var a=0;a<dataLayer.length;a++)if("undefined"!=typeof dataLayer[a].event&&"formCompleted"===dataLayer[a].event)return;dataLayer.push({event:"formCompleted"})},10),$(document).trigger("avastform-linear-success"),$("input[type=submit].ajax").show(),$("img.form-ajax-loader").remove(),c?c(d,a):b.processResult(d)}),!1},processResult:function(a){if($.isPlainObject(a)){if("errors"in a)for(var b in a.errors)b in this.form&&this.addErrorMessage(this.form[b],a.errors[b]);if("customErrors"in a&&$(".formCustomErrorMessage").length>0&&$(".formCustomErrorMessage").html(a.customErrors).removeClass("hidden"),"replaces"in a)for(var c in a.replaces){if(a.replaces[c].indexOf("&lt;")>-1)var d=$("<div/>").html(a.replaces[c]).text();else var d=a.replaces[c];"form"==c?$(this.form).replaceWith(d):0===c.indexOf("#")&&$(c).replaceWith(d)}}},addHelp:function(a){var b=$(a).data("help"),c=$(a).parent();b&&($(this.helpDivSelector,c).length||$(a).after('<span class="tooltip-w tooltip-i" vocw="_help'+a.name+'"></span><div id="_help'+a.name+'" class="hidden" style="display:none;"><div class="bundle-popup"><div class="bundle-popup-content">'+b+"</div></div></div>"))},hideConditionInputs:function(){var a=this;$("input[data-display-condition][data-nette-rules]",this.form).each(function(){var b=this,c=a.getElementRules(b);$.each(c,function(c,d){var e=a.form[d.control];$.isArray(e)&&(e=$("input[name="+e[0].name+"]",a.form)),a.checkConditionInput(e,d,b),$(e).on("change keyup click",function(){a.checkConditionInput(this,d,b)})})})},checkConditionInput:function(a,b,c){b.rules=null,b.control=null,!0===this.checkControl(a,[b])?$(c).closest("div.form-group").show():($(c).closest("div.form-group").hide(),this.removeErrorMessage(c))},ajaxUpdate:function(a){function b(a,b){var c=$("form.avast-form [name="+b+"]");switch($(c).prop("tagName").toLowerCase()){case"select":var d=$(c).find("option:first");$(c).empty().append(d),$.each(a,function(a,b){$(c).append("<option value='"+b.elVal+"'>"+b.elName+"</option>")});break;case"input":$(c).empty().val(a.elVal).text(a.elText);break;case"textarea":$(c).empty().text(a.elText)}}var c=a.attr("data-ajax").replace(/\'/g,'"'),d=(a.val(),$.parseJSON(c));if("undefined"==typeof d.destEl&&("undefined"==typeof d.url||"undefined"==typeof d.condition))return!1;var e="undefined"!=typeof d.url&&d.url;"undefined"==typeof d.condition?e&&AvastFormAjax.doAjax(e,b,!1,d.destEl):$.each(d.condition,function(c,d){if(a.val()===d.id){var f="undefined"==typeof d.url?e:d.url;AvastFormAjax.doAjax(f,b,!1,d.destEl)}})}};var AvastFormAjax={ajaxResponseStorage:[],ajaxExpirationDelay:6e4,doAjax:function(a,b,c,d){var e=AvastFormAjax.makeKeyFromUrl(a);AvastFormAjax.isExpired(e)?$.ajax({url:encodeURI(a),success:function(a){AvastFormAjax.writeToStorage(e,a),"function"==typeof b&&b(a,d)},error:function(a){"function"==typeof c&&c(a,d)}}):b(AvastFormAjax.readFromStorage(e),d)},makeKeyFromUrl:function(a){return a.replace(/\//gi,"-").replace(/\&/gi,"----").replace(/\=/gi,"---").replace(/\?/gi,"--").replace(/\%/gi,"-----").replace(/\;/gi,"------").replace(/\:/gi,"-")},writeToStorage:function(a,b,c){var d=(new Date).getTime();AvastFormAjax.ajaxResponseStorage[a]={expire:d+(void 0!==c?c:AvastFormAjax.ajaxExpirationDelay),data:b}},readFromStorage:function(a){return"undefined"!=typeof AvastFormAjax.ajaxResponseStorage[a]&&"undefined"!=typeof AvastFormAjax.ajaxResponseStorage[a].data&&AvastFormAjax.ajaxResponseStorage[a].data},isExpired:function(a){var b=(new Date).getTime();return"undefined"==typeof AvastFormAjax.ajaxResponseStorage[a]||AvastFormAjax.ajaxResponseStorage[a].expire<b}};
//# sourceMappingURL=avastform-linear.js.map