"use strict";var ScrollController={controller:new ScrollMagic.Controller({vertical:!0})};!function(){var a=$(".parallax"),b=$(".page"),c=$(".intro"),d=$(".parallax__scrollbar"),e="undefined"!=typeof staticPath?staticPath:"";window.HomepageParallaxSection={$element:a,$page:b,$intro:c,$introFixed:c.find(".intro__fixed"),$elementFixed:a.find(".parallax__fixed"),$elementInner:a.find(".parallax__inner"),$content:a.find(".parallax__content"),$screens:a.find(".parallax__screen"),$overlay:a.find(".parallax__overlay"),$bgWrap:a.find(".parallax__bg-wrap"),$scrollBar:d,$scrollProgress:d.find(".parallax__scrollbar-progress"),$scrollMilestones:d.find(".parallax__scrollbar-milestone"),$attacks:a.find(".parallax__attacks"),$people:a.find(".parallax__people"),$preloader:a.find(".parallax__bg--preloader"),$mobileBg:a.find(".parallax__mobile-bg"),backgrounds:{$whole:a.find(".parallax__bg--whole"),$graphs:a.find(".parallax__bg--graphs"),$map:a.find(".parallax__bg--map")},timeline:null,scene:null,attackTimelines:[],scrollDirection:null,isLoading:!1,isLoaded:!1,isAttacksAnimationPaused:!0,isPortraitMode:w.width<w.height,isMobile:w.device.mobile,isFixed:!1,isPaddingTopSet:!1,overlayFadeDuration:.05,overlayDuration:.1,overlayOpacity:.8,textOpacity:.2,initHandler:function(){var a=this;if(this.isMobile&&(this.$element.addClass("is-mobile"),this.$mobileBg.css({height:$(window).innerHeight()+100})),this.isPortraitMode&&this.$element.addClass("is-portrait"),this.isMobile)return this._setupMobileBackgroundVisibility(),void this._finishLoading();this._updateScreenHeights(),this.screenCount=this.$screens.length,this.sceneOffset=this.$element.offset().top+this.$elementInner.outerHeight()/2-window.innerHeight/2,this.sceneDuration=this.$content.outerHeight(),this._setupBackgroundVisibility();new ScrollMagic.Scene({offset:this.sceneOffset-window.innerHeight,duration:window.innerHeight+this.sceneDuration}).addTo(ScrollController.controller).on("enter",function(){a.isLoading||a.isLoaded||(a.isLoading=!0,Preload.images([{0:e+"i/mkt/technology/parallax/map__2.jpg"},{0:e+"i/mkt/technology/parallax/graphs__2.jpg"},{0:e+"i/mkt/technology/parallax/whole__2.jpg"},{0:e+"i/mkt/technology/parallax/people__2.png"}],function(){a._finishLoading(),a._setupAnimations()}))})},resizeEndHandler:function(){this.isPortraitMode=w.width<w.height,this.$element.toggleClass("is-portrait",this.isPortraitMode),this.isMobile&&this.$mobileBg.css({height:$(window).innerHeight()+100}),this.isMobile||this.isPortraitMode||this._updateScreenHeights()},_finishLoading:function(){this.isLoading=!1,this.isLoaded=!0,this.$element.addClass("is-loaded"),EventHub.emit("parallaxReady")},_setupAnimations:function(){var a=this;this.timeline=new TimelineMax({onUpdate:function(){a.$scrollMilestones.each(function(b,c){$(c).toggleClass("parallax__scrollbar-milestone--visited",a.timeline._time>=a._getScreenCenterPointTime(b))})}})},_setupPreSectionAnimations:function(){var a=new TimelineMax;a.from(this.$screens.eq(0),1,{yPercent:40,opacity:0,ease:Power0.easeNone}).from(this.$scrollBar,.1,{opacity:0,ease:Power0.easeNone},.9).add(this._getBgZoomTween(this.backgrounds.$map,0,1,1.26,1.2).tween,0),new ScrollMagic.Scene({offset:0,duration:w.height}).addTo(ScrollController.controller).setTween(a)},_setupPostSectionAnimations:function(){var a=new TimelineMax;a.to(this.$screens.eq(-1),.5,{yPercent:-20,opacity:0,ease:Power0.easeNone}).to(this.$scrollBar,.1,{opacity:0,ease:Power0.easeNone},0).add(this._getBgZoomTween(this.backgrounds.$whole,0,1,1.05,1).tween,0),new ScrollMagic.Scene({offset:this.sceneOffset+this.sceneDuration,duration:w.height}).addTo(ScrollController.controller).setTween(a)},_setupSectionSticking:function(){var a=this;this._recalculatePageHeight(),this.scene=new ScrollMagic.Scene({offset:this.$element.offset().top,duration:this.sceneDuration,reverse:!0}).on("enter",function(){a.isFixed=!0}).on("leave",function(){a.isFixed=!1}).on("start",function(b){a.isPaddingTopSet=!1,"FORWARD"===b.scrollDirection?HomepageAnimationController.introVideo.pause():HomepageAnimationController.introVideo.play()}).setTween(this.timeline).addTo(ScrollController.controller),$("#introVideo")[0].play()},_setupMilestoneClicking:function(){var a=this;this.$scrollMilestones.click(function(b){var c=$(b.currentTarget),d=a.$scrollMilestones.index(c);Scroll.to(a.sceneOffset+a.sceneDuration*d/a.screenCount+100)})},_recalculatePageHeight:function(){this.$element.css({height:this.sceneDuration+w.height})},_setupMobileBackgroundVisibility:function(){var a=this;new ScrollMagic.Scene({offset:this.$element.offset().top-w.height-300,triggerHook:0,duration:this.$elementInner.outerHeight()+w.height+600}).on("enter",function(){a.$mobileBg.css({opacity:1})}).on("leave",function(){a.$mobileBg.css({opacity:0})}).addTo(ScrollController.controller)},_setupBackgroundVisibility:function(){var a=this;new ScrollMagic.Scene({offset:-300,triggerHook:0,duration:this.sceneDuration+2*w.height+600}).on("enter",function(){a.$element.css({opacity:1})}).on("leave",function(){a.$element.css({opacity:0})}).addTo(ScrollController.controller)},_updateScreenHeights:function(){var a=Math.max(w.width,w.height/1876*3840);this.$elementInner.css({width:"100%",height:1876*a/3840}),$("#textTable").css({height:1876*a/3840}),this.$elementFixed.css({height:w.height}),this.$screens.css({height:this.$elementInner.outerHeight()})},_getBgZoomTween:function(a,b,c,d,e){return{tween:TweenMax.fromTo(a,c-b,{scale:d},{scale:e,immediateRender:!1,ease:ExpoScaleEase.config(d,e)}),from:b,to:c}},_getScreenFadeInTween:function(a){return[TweenMax.fromTo(this.$overlay,this.overlayFadeDuration,{opacity:0},{opacity:this.overlayOpacity,immediateRender:!1,ease:Power3.easeInOut}),TweenMax.fromTo(this.$content,this.overlayFadeDuration,{opacity:this.textOpacity},{opacity:1,immediateRender:!1,ease:Power3.easeInOut}),TweenMax.fromTo(this.$scrollMilestones.eq(a),this.overlayFadeDuration,{scale:1},{scale:2,immediateRender:!1,ease:Power3.easeInOut})]},_getScreenFadeOutTween:function(a){return[TweenMax.fromTo(this.$overlay,this.overlayFadeDuration,{opacity:this.overlayOpacity},{opacity:0,immediateRender:!1,ease:Power3.easeInOut}),TweenMax.fromTo(this.$content,this.overlayFadeDuration,{opacity:1},{opacity:this.textOpacity,immediateRender:!1,ease:Power3.easeInOut}),TweenMax.fromTo(this.$scrollMilestones.eq(a),this.overlayFadeDuration,{scale:2},{scale:1,immediateRender:!1,ease:Power3.easeInOut})]},_getScreenFadeTimes:function(a){var b=this._getScreenCenterPointTime(a),c=b-this.overlayDuration/2-this.overlayFadeDuration,d=b+this.overlayDuration/2;return{"in":{from:c,to:c+this.overlayFadeDuration},out:{from:d,to:d+this.overlayFadeDuration}}},_getScreenCenterPointTime:function(a){return a/(this.screenCount-1)}},w.autoHandle(HomepageParallaxSection)}();var HomepageAnimationController={_currentlyPlayingIndex:null,animations:[AnimationMalware,AnimationAi,AnimationLocation,AnimationSecurity,AnimationDevice],play:function(a,b){if(!w.device.mobile)return this.animations[a].play(b),this._currentlyPlayingIndex=a,this},pauseCurrent:function(a){return null!==this._currentlyPlayingIndex&&this.pause(this._currentlyPlayingIndex,a),this},pause:function(a,b){return this.animations[a].pause(b),this._currentlyPlayingIndex=null,this},introVideo:{$el:document.getElementById("introVideo"),play:function(){this.$el.play()},pause:function(){this.$el.pause()}}},$pathImgAssets="undefined"!=typeof staticPath?staticPath:"",Zigzag={scenes:{zigzag:null,navigation:null,cards:[]},navigation:{$root:$(".navigation"),hoverThrottle:null,smallHeight:null,offset:20,isAutoScrolling:!1},zigzag:{$root:$(".zigzag"),activeTab:null,lastId:null,currentSectionIndex:null,animationFreeze:!0},video:{$root:null,$sprite:null},selectors:{navigation:{rootContainer:".navigation__container",tabs:".navigation__tab",tabsContainer:".navigation__tabs-container",tabsWrapper:".navigation__tabs-wrapper",progress:".navigation__line",tabContainer:".navigation__tabs",hover:".navigation__hover",icons:".navigation__icon",labels:".navigation__text",sectorArr:[]},zigzag:{items:".zigzag__item",svgPlaceholders:".zigzag__svg-placeholder",currentSectionIndex:null},video:{root:".video-thumbnail",sprite:"#animated-sprite-video-ai"}},classes:{navActiveClass:"is-active",navigationTabsWrapperSmall:"navigation__tabs-wrapper--small"},vars:function(){this.zigzag.$rootHeight=this.zigzag.$root.outerHeight(!0),this.zigzag.$items=this.zigzag.$root.find(this.selectors.zigzag.items),this.zigzag.$firstItem=this.zigzag.$root.find(this.selectors.zigzag.items).eq(0),this.zigzag.activeTab=this.zigzag.$firstItem.attr("id"),this.zigzag.lastId=this.zigzag.activeTab,this.zigzag.$svgPlaceholders=this.zigzag.$root.find(this.selectors.zigzag.svgPlaceholders),this.navigation.$rootContainer=this.navigation.$root.find(this.selectors.navigation.rootContainer),this.navigation.$tabsContainer=this.navigation.$rootContainer.find(this.selectors.navigation.tabsContainer),this.navigation.$tabsWrapper=this.navigation.$rootContainer.find(this.selectors.navigation.tabsWrapper),this.navigation.$tabsWrapperSmall=this.navigation.$tabsWrapper.clone().addClass(this.classes.navigationTabsWrapperSmall).insertAfter(this.navigation.$tabsWrapper),this.navigation.$tabContainer=this.navigation.$rootContainer.find(this.selectors.navigation.tabContainer),this.navigation.$tabsStatic=this.navigation.$rootContainer.find(this.selectors.navigation.tabs),this.navigation.$tabs=this.navigation.$tabsWrapperSmall.find(this.selectors.navigation.tabs),this.navigation.$progress=this.navigation.$tabsWrapperSmall.find(this.selectors.navigation.progress),this.navigation.$hover=this.navigation.$tabsWrapperSmall.find(this.selectors.navigation.hover),this.video.$root=this.zigzag.$root.find(this.selectors.video.root),this.video.$sprite=this.video.$root.find(this.selectors.video.sprite),this.setNavHeight()},initHandler:function(){var a=this;this.vars(),this.bindEvents(),HomepageParallaxSection.isLoaded?this.loadAnimations():EventHub.on("parallaxReady",function(){a.loadAnimations()}),EventHub.on("zigzagReady",function(){a.getSticky(),a.progressAnim(),a.setupCardAnimations()})},scrollStartHandler:function(){HomepageAnimationController.pauseCurrent(.2),this.zigzag.animationFreeze=!0},scrollEndHandler:function(){null!==this.zigzag.currentSectionIndex&&(HomepageAnimationController.pauseCurrent(.2).play(this.zigzag.currentSectionIndex),this.zigzag.animationFreeze=!1)},resizeEndHandler:function(){this.setNavHeight(),this.zigzag.$rootHeight=this.zigzag.$root.outerHeight(!0),this.scenes.zigzag.refresh()},bindEvents:function(){var a=this,b=AnimatedSprite.createImg(this.video.$sprite,15,.25);b.pause(),this.video.$root.hover(function(){b.play()},function(){AnimatedSprite.resetImg(a.video.$sprite,b)}),this.navigation.$tabs.hover(function(b){a.navigation.targetIndex=$(b.currentTarget).index(),null===a.navigation.hoverThrottle&&(clearTimeout(a.navigation.hoverThrottle),a.navigation.hoverThrottle=setTimeout(function(){a.setActiveNavItem(a.navigation.targetIndex),a.navigation.hoverThrottle=null},150))})},loadAnimations:function(){var a=this,b=[].map.call(this.zigzag.$svgPlaceholders,function(a){return $(a).data("svg")});Preload.images(b.map(function(a){return{0:$pathImgAssets+"i/mkt/technology/svg/raster/svg-"+a+"__2.png"}}),function(){setTimeout(function(){EventHub.emit("zigzagReady")},300)},function(b,c,d){var e=$('<img class="zigzag__svg"/>');e[0].src=c,a.zigzag.$svgPlaceholders.eq(d).append(e)})},setupCardAnimations:function(){var a=$("#card1"),b=a.find(".card__heading"),c=a.find(".card__perex"),d=$("#svg-line-curve"),e=($("#svg-line-glow"),$("#svg-line-glow-clip-path")),f=new TimelineMax;f.add(AnimationNumber.create(b,1.5,Expo.easeIn,parseInt(b.data("number")),"%n")).from(c,.375,{opacity:0},0).from(d,1.5,{drawSVG:"0% 0%",ease:Power0.easeNone},0).from(e,1.5,{xPercent:-100,ease:Power0.easeNone},0),this.registerCardAnimation(a,f);var g=$("#card2"),h=g.find(".card__heading"),i=g.find(".card__perex"),j=new TimelineMax,k=$("#svg-bars").children(),l=$("#svg-bars-blurred").children(),m=new TimelineMax;m.set([k,l],{transformOrigin:"0% 100%"}).staggerFromTo(k,1,{scaleY:0},{scaleY:1,ease:Power3.easeOut},.8,0).staggerFromTo(l,1,{scaleY:0},{scaleY:1,ease:Power3.easeOut},.8,0).duration(1.5),j.add(AnimationNumber.create(h,1.5,Expo.easeIn,parseInt(h.data("number")),"%n")).from(i,.375,{opacity:0},0).add(m,0),this.registerCardAnimation(g,j);var n=$("#card3"),o=n.find(".card__heading"),p=n.find(".card__perex"),q=Helpers.shuffle($("#svg-map-bg-dots").children().toArray()),r=0,s=function(){return q[r=(r+1)%q.length]};TweenMax.set(q,{transformOrigin:"50% 50%",opacity:0});var t=new TimelineMax({repeat:-1,repeatDelay:.3,onRepeat:function(){var a=s();TweenMax.fromTo(a,1.5,{scale:0},{scale:1.5,ease:Power3.easeOut}),TweenMax.fromTo(a,1,{opacity:1},{opacity:0,delay:.5,ease:Power3.easeOut})}}),u=new TimelineMax;u.add(AnimationNumber.create(o,1,Expo.easeIn,parseInt(o.data("number")),"%n&nbsp;+")).from(p,.5,{opacity:0},0).add(t,0),this.registerCardAnimation(n,u)},registerCardAnimation:function(a,b){var c=new ScrollMagic.Scene({triggerElement:a[0],triggerHook:.7,duration:0});b.add(function(){c.enabled(!1)},0),c.setTween(b).addTo(ScrollController.controller),this.scenes.cards.push(c)},getSticky:function(){var a=this;this.zigzag.$rootHeight=this.zigzag.$root.outerHeight(!0),this.scenes.zigzag=new ScrollMagic.Scene({triggerElement:$(".navigation__trigger")[0],duration:function(){return a.zigzag.$rootHeight},triggerHook:0}).on("enter",function(){a.navigation.$rootContainer.addClass("is-pinned")}).on("leave",function(){a.navigation.$rootContainer.removeClass("is-pinned")}).addTo(ScrollController.controller)},setActiveNavItem:function(a){var b=this,c=this.navigation.$tabs.eq(a);this.navigation.$tabs.removeClass(this.classes.navActiveClass),TweenLite.to(this.navigation.$hover,.5,{xPercent:100*a,ease:Power3.easeInOut,onComplete:function(){c.addClass(b.classes.navActiveClass)}})},progressAnim:function(){var a=this,b=this.navigation.smallHeight/w.height+(w.height-this.navigation.smallHeight)/w.height/2;this.sectorArr={},this.zigzag.$items.each(function(c,d){var e="scene-"+c,f=a.navigation.$tabs.eq(c).find(a.selectors.navigation.progress);a.sectorArr[e]=new ScrollMagic.Scene({triggerElement:d,duration:$(d).outerHeight(!0),triggerHook:b}).on("enter",function(){a.navigation.isAutoScrolling||a.setActiveNavItem(c),a.zigzag.currentSectionIndex=c,a.zigzag.animationFreeze||HomepageAnimationController.pauseCurrent().play(c)}).setTween(a.getProgressLineTimeline(f)).addTo(ScrollController.controller)})},getProgressLineTimeline:function(a){return(new TimelineMax).to(a,1,{scaleX:1,ease:Power0.easeNone}).to(a,.1,{xPercent:100,scaleX:1})},canShowSvgAnimations:function(){return!w.device.mobile&&"ms msie"!==w.browser.name},setNavHeight:function(){this.navigation.smallHeight=w.height<=800?80:160}};w.autoHandle(Zigzag);var Homepage={$page:$(".page"),$navigation:$(".navigation"),$zigzagItems:$(".zigzag__item"),$parallax:HomepageParallaxSection.$element,isReset:!0,fastInit:function(){if(storageAvailable("localStorage")){$(".zigzag__btn").click(function(a){localStorage.setItem("avastTechnologyHomepageState",JSON.stringify({scrollOffset:w.top,parallaxHeight:HomepageParallaxSection.$element.outerHeight(),pageHeight:w.$document.height(),navigationHeight:$(".navigation").outerHeight(),zigzagHeights:$(".zigzag__item").toArray().map(function(a){return $(a).outerHeight()})}))});var a=JSON.parse(localStorage.getItem("avastTechnologyHomepageState"));a&&(this.$page.css({minHeight:a.pageHeight}),this.$parallax.css({minHeight:a.parallaxHeight}),this.$navigation.css({minHeight:a.navigationHeight}),this.$zigzagItems.each(function(b,c){$(c).css({minHeight:a.zigzagHeights[b]})}),window.scrollTo(0,a.scrollOffset),this.isReset=!1)}},resizeStartHandler:function(){this.isReset||(this.$page.css({minHeight:""}),this.$parallax.css({minHeight:""}),this.$navigation.css({minHeight:""}),this.$zigzagItems.each(function(a,b){$(b).css({minHeight:""})}),this.isReset=!0)}};w.device.mobile||(Homepage.fastInit(),w.autoHandle(Homepage,-1));
