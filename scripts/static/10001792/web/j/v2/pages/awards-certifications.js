!function(){"use strict";var a=avm.require("cash"),b=a(".js-tab-link"),c=a(".nav-link"),d=a(".tab-pane");b.on("click",function(){var b=a(this).attr("data-target"),e=a(c.get(b-1)),f=a(d.get(b-1));c.removeClass("active").attr("aria-selected","false").attr("tabindex",-1),d.removeClass("active show"),e.addClass("active").attr("aria-selected","true").attr("tabindex",0).trigger("focus"),f.addClass("active show")})}();var tab1=tns({container:".slider-tab1",controlsContainer:".slider-tab1-controls",controlsPosition:"bottom",preventScrollOnTouch:"auto",controls:!1,navPosition:"bottom",nav:!0,mouseDrag:!0,speed:400,loop:!1,fixedWidth:280,slideBy:1,responsive:{992:{controls:!0,nav:!1},1280:{fixedWidth:316}}}),tab2=tns({container:".slider-tab2",controlsContainer:".slider-tab2-controls",controlsPosition:"bottom",preventScrollOnTouch:"auto",controls:!1,navPosition:"bottom",nav:!0,mouseDrag:!0,speed:400,loop:!1,fixedWidth:280,slideBy:1,responsive:{992:{controls:!0,nav:!1},1280:{fixedWidth:316}}}),tab3=tns({container:".slider-tab3",controlsContainer:".slider-tab3-controls",controlsPosition:"bottom",preventScrollOnTouch:"auto",controls:!1,navPosition:"bottom",nav:!0,mouseDrag:!0,speed:400,loop:!1,fixedWidth:280,slideBy:1,responsive:{992:{controls:!0,nav:!1},1280:{fixedWidth:316}}});
//# sourceMappingURL=awards-certifications.js.map