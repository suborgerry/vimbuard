!function(){"use strict";$(".js-bundle-select").on("change",function(){var a=this.id,b=document.body.querySelectorAll('[data-controlled-by="'+a+'"]'),c=document.body.querySelector('[data-controlled-by="'+a+'"][data-maintenance="'+this.value+'"]');b.forEach(function(a){a.classList.add("d-none")}),c.classList.remove("d-none")})}();
