$(document).ready(function(){var a=detect().browser,b=[];if(b.push("br-"+a.name.toLowerCase()),b.push("br-ver-"+parseInt(a.version)),$("body").addClass(b.join(" ")),"safari"===a.name.toLowerCase()&&$(".article-item-ad").length>0){var c=$(".article-item-ad").height();$(".article-item-ad a").css("height",c)}}),$(document).ready(function(){$(".navigation-switch").on("click",function(a){a.preventDefault(),a.stopPropagation(),$(".nav").toggleClass("active-navigation"),$("body").addClass("nav-opened")}),$(".nav-controls-close").on("click",function(a){a.preventDefault(),a.stopPropagation(),$(".nav").removeClass("active-navigation"),$("body").removeClass("nav-opened")})}),$(document).ready(function(){$(".search-switch").on("click",function(a){a.preventDefault(),a.stopPropagation(),$(".search").addClass("search-active"),$("body").addClass("search-opened"),window.location.hash="#searchOpen"}),$(".search-controls-close").on("click",function(a){a.preventDefault(),a.stopPropagation(),$(".search").removeClass("search-active"),$("body").removeClass("search-opened"),window.location.hash=""})}),$(document).ready(function(){$(".language-selector-switch").on("click",function(a){a.preventDefault(),$(".languages").toggleClass("active")})}),$(window).on("load",function(){if($(".x-detail").length>0){var a=$(".article .share"),b=($(".article .tags").first(),$(window).scrollTop()),c=a.offset().top-50,d=$(".article").offset().top+$(".article").outerHeight()-$(window).height(),e=d-($(".article").offset().top-$(window).height());b>c&&b<e&&(a.addClass("share-sticky"),a.removeClass("share-sticky-bottom")),b>=e&&(a.removeClass("share-sticky"),a.addClass("share-sticky-bottom")),b<=c&&(a.removeClass("share-sticky"),a.removeClass("share-sticky-bottom")),$(window).on("scroll",function(){b=$(window).scrollTop(),b>c&&b<e&&(a.addClass("share-sticky"),a.removeClass("share-sticky-bottom")),b>=e&&(a.removeClass("share-sticky"),a.addClass("share-sticky-bottom")),b<=c&&(a.removeClass("share-sticky"),a.removeClass("share-sticky-bottom"))})}});
//# sourceMappingURL=script.js.map