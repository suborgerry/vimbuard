!function(){"use strict";var a=avm.require("cash"),b=a(window),c=avm.require("avast.web.platformSwitcher"),d=/(all|windows|mac|android|ios)/,e=a("#tabs .tab"),f=a(".tab-content"),g=function(b){a(".platforms .platform").hide(),a(".platforms .platform-"+b).show()},h=function(b){a(".tab-content").hide(),a(".tab-content-"+b).show()},i=function(){var b=window.location.hash.substring(1);switch(d.test(b)||(window.location.hash="all"),b){case"all":b="allProducts";break;case"windows":b="pc"}g(b),h(b);var c=a('[data-tabselector="'+b+'"]'),i=a('[data-selectedContent="'+b+'"]');e.removeClass("tab-active").attr("aria-selected","false").attr("tabindex",-1),c.addClass("tab-active").attr("aria-selected","true").attr("tabindex",0),f.removeClass("active"),i.addClass("active")};e.on("keydown",function(b){var c=a(b.target).parent();40==b.keyCode?(c.next().find(".tab").trigger("focus"),b.preventDefault()):38==b.keyCode&&(c.prev().find(".tab").trigger("focus"),b.preventDefault())}),b.on("hashchange",function(){i()}),i(),c.init({disableHash:!0}),a("body").hasClass("website-3400-b")&&a(".btn-outline-secondary .btn-icon-normal").each(function(){var b=a(this).attr("src");a(this).attr("src",b.split("-purple.svg")[0]+"-pine.svg")})}();
