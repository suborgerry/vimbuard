function OptanonWrapper(){var a=document.getElementById("onetrust-consent-sdk");document.body.prepend(a);var b=document.getElementsByClassName("onetrust-pc-dark-filter");b[0]&&"block"===window.getComputedStyle(b[0]).display?document.body.classList.add("ot-overflow-hidden"):document.body.classList.remove("ot-overflow-hidden"),document.querySelectorAll("#onetrust-accept-btn-handler,.onetrust-close-btn-handler,#accept-recommended-btn-handler,.save-preference-btn-handler, #onetrust-reject-all-handler").forEach(function(a){a.addEventListener("click",function(){document.body.classList.remove("ot-overflow-hidden")})}),function(a){var b="; "+document.cookie,c=b.split("; "+a+"=");if(2==c.length)return c.pop().split(";").shift()}("OptanonAlertBoxClosed")||($(".ot-accordion-layout button").attr("aria-expanded","true"),$("#onetrust-reject-all-handler").length>0&&$("#onetrust-reject-all-handler").appendTo("#onetrust-button-group"),$(".ot-pc-footer .ot-pc-refuse-all-handler").length>0&&$(".ot-pc-footer .ot-pc-refuse-all-handler").insertAfter("#accept-recommended-btn-handler"))}
