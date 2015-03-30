jQuery(document).ready(function ($) {

    $('.greensock-select-box').selectBox();
    checkCookie();


    /*
     * expandable-list:
     * the following code handles adding the expandable functionality to anything with a class of "expandable-list" applied which you'd typically add to <ul> or <ol> elements.
     * Then, inside the <li>, make sure you have a <div class="expandable-content"> that contains the stuff that should be hidden initially, like <li>This is my question<div class="expandable-content">Answer...</div></li>
     * It will add a dot with a plus/minus sign to the beginning.
     * You'll probably also want to add the following CSS (or something similar) to prevent flashes of content when the page finishes loading:
     * ul.expandable-list li .expandable-content {
     * 	height: 0;
     * 	overflow: hidden;
     * }
     * ul.expandable-list li {
     * 	border: 1px solid transparent;
     * }
     * ul.expandable-list li:hover {
     * 	background-color:white;
     * 	border: 1px solid rgb(216,216,216);
     * }
     * ul.expandable-list li .expander-button {
     * 	position:relative;
     * 	border-radius: 50%;
     * 	background-color:#444;
     * 	width: 15px;
     * 	height: 15px;
     * 	display:inline-block;
     * 	vertical-align: middle;
     * 	border: 1px solid #FFF;
     * 	left: -8px;
     * 	margin-left: -18px;
     * }
     * ul.expandable-list li .expander-plus, ul.expandable-list li .expander-minus {
     * 	position:absolute;
     * 	background-color: #ccc;
     * 	display:block;
     * }
     * ul.expandable-list li .expander-plus {
     * 	width: 1px;
     * 	height: 7px;
     * 	left: 7px;
     * 	top:4px;
     * }
     * ul.expandable-list li .expander-minus {
     * 	width: 7px;
     * 	height: 1px;
     * 	top: 7px;
     * 	left: 4px;
     * }
     */
    var _isOldIE = (document.all && !document.addEventListener),
        _closedHeight = _isOldIE ? 1 : 0;
    $(".expandable-list").css({ listStyleType: "none" }).children().each(function (i, e) {
        var dot = document.createElement("span"),
            plus = document.createElement("div"),
            minus = document.createElement("div"),
            $e = $(e),
            $content = $e.find(".expandable-content"),
            fontSize = parseInt($e.css("font-size"), 10),
            paddingTop = $e.css("paddingTop"),
            paddingBottom = $e.css("paddingBottom"),
            contentPadding = $(e.parentNode).data("padding"),
            mouseDownX, mouseDownY;
        if (contentPadding == null) {
            contentPadding = 6;
        }
        e.insertBefore(dot, e.firstChild);
        dot.className = "expander-button";
        minus.className = "expander-minus";
        plus.className = "expander-plus";
        dot.appendChild(minus);
        dot.appendChild(plus);
        $content.css({ overflow: "hidden", height: 0, paddingTop: 0, paddingBottom: 0 });
        TweenLite.set(e, { borderRadius: "8px", paddingLeft: 34, marginLeft: -33, cursor: "pointer" });
        TweenLite.set(dot, { marginTop: Math.floor(fontSize / -6) });
        $e.on("mousedown", function (event) {
            mouseDownX = event.pageX;
            mouseDownY = event.pageY;
        }).on("mouseup", function (event) {
            if (Math.abs(mouseDownX - event.pageX) < 3 && Math.abs(mouseDownY - event.pageY) < 3) {
                e.open = (e.open !== true);
                if (e.open) {
                    TweenLite.fromTo($content[0], 0.35, { height: 0 }, { height: $content.css("height", "auto").height(), paddingTop: contentPadding, paddingBottom: contentPadding });
                    TweenLite.to(e, 0.35, { paddingTop: 6, paddingBottom: 6 });
                    TweenLite.to(plus, 0.2, { opacity: 0 });
                } else {
                    TweenLite.to($content[0], 0.35, { height: _closedHeight, paddingTop: 0, paddingBottom: 0 });
                    TweenLite.to(e, 0.35, { paddingTop: paddingTop, paddingBottom: paddingBottom });
                    TweenLite.to(plus, 0.2, { opacity: 1 });
                }
            }
        });
    });



    // once you create a GSPreloader instance, call preloader.active(true) to open it, preloader.active(false) to close it, and preloader.active() to get the current status.
    function GSPreloader(options) {
        options = options || {};
        var parent = options.parent || document.body,
			element = this.element = document.createElement("div"),
			radius = options.radius || 42,
			dotSize = options.dotSize || 15,
			animationOffset = options.animationOffset || 1.8, //jumps to a more active part of the animation initially (just looks cooler especially when the preloader isn't displayed for very long)
			createDot = function (rotation) {
			    var dot = document.createElement("div");
			    element.appendChild(dot);
			    TweenLite.set(dot, { width: dotSize, height: dotSize, transformOrigin: (-radius + "px 0px"), x: radius, backgroundColor: colors[colors.length - 1], borderRadius: "50%", position: "absolute", rotation: rotation });
			    dot.className = options.dotClass || "preloader-dot";
			    return dot;
			},
			i = options.dotCount || 10,
			rotationIncrement = 360 / i,
			colors = options.colors || ["#61AC27", "black"],
			animation = new TimelineLite({ paused: true }),
			dots = [],
			isActive = false,
			box = document.createElement("div"),
			tl, dot, closingAnimation, j;
        colors.push(colors.shift());

        //setup background box
        TweenLite.set(box, { width: radius * 2 + 70, height: radius * 2 + 70, borderRadius: "14px", backgroundColor: options.boxColor || "white", border: options.boxBorder || "1px solid #AAA", position: "absolute", xPercent: -50, yPercent: -50, opacity: ((options.boxOpacity != null) ? options.boxOpacity : 0.3) });
        box.className = options.boxClass || "preloader-box";
        if (options.boxOpacity === 0) {
            TweenLite.set(box, { display: "none" });
        }
        element.appendChild(box);

        parent.appendChild(element);
        TweenLite.set(element, { position: "fixed", top: "45%", left: "50%", perspective: 600, overflow: "visible", zIndex: 2000 });
        animation.from(box, 0.1, { opacity: 0, scale: 0.1, ease: Power1.easeOut }, animationOffset);
        while (--i > -1) {
            dot = createDot(i * rotationIncrement);
            dots.unshift(dot);
            animation.from(dot, 0.1, { scale: 0.01, opacity: 0, ease: Power1.easeOut }, animationOffset);
            //tuck the repeating parts of the animation into a nested TimelineMax (the intro shouldn't be repeated)
            tl = new TimelineMax({ repeat: -1, repeatDelay: 0.25 });
            for (j = 0; j < colors.length; j++) {
                tl.to(dot, 2.5, { rotation: "-=360", ease: Power2.easeInOut }, j * 2.9)
					.to(dot, 1.2, { skewX: "+=360", backgroundColor: colors[j], ease: Power2.easeInOut }, 1.6 + 2.9 * j);
            }
            //stagger its placement into the master timeline
            animation.add(tl, i * 0.07);
        }
        if (TweenLite.render) {
            TweenLite.render(); //trigger the from() tweens' lazy-rendering (otherwise it'd take one tick to render everything in the beginning state, thus things may flash on the screen for a moment initially). There are other ways around this, but TweenLite.render() is probably the simplest in this case.
        }

        //call preloader.active(true) to open the preloader, preloader.active(false) to close it, or preloader.active() to get the current state.
        this.active = function (show) {
            if (!arguments.length) {
                return isActive;
            }
            if (isActive != show) {
                isActive = show;
                if (closingAnimation) {
                    closingAnimation.kill(); //in case the preloader is made active/inactive/active/inactive really fast and there's still a closing animation running, kill it.
                }
                if (isActive) {
                    element.style.visibility = "visible";
                    TweenLite.set([element, box], { rotation: 0 });
                    animation.play(animationOffset);
                } else {
                    closingAnimation = new TimelineLite();
                    if (animation.time() < animationOffset + 0.3) {
                        animation.pause();
                        closingAnimation.to(element, 1, { rotation: -360, ease: Power1.easeInOut }).to(box, 1, { rotation: 360, ease: Power1.easeInOut }, 0);
                    }
                    closingAnimation.staggerTo(dots, 0.3, { scale: 0.01, opacity: 0, ease: Power1.easeIn, overwrite: false }, 0.05, 0).to(box, 0.4, { opacity: 0, scale: 0.2, ease: Power2.easeIn, overwrite: false }, 0).call(function () { animation.pause(); closingAnimation = null; }).set(element, { visibility: "hidden" });
                }
            }
            return this;
        };
    }

    window.preloader = new GSPreloader({ colors: ["#61AC27", "#777"], boxOpacity: 0 });

});


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + '; path=/';
}

//primarily for IE8 compatibility
if (typeof (String.prototype.trim) !== "function") {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "");
    };
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var lang = getCookie("greensock-language");
    if (lang != "") {
        //alert("Language selected " + lang);
    } else {
        setCookie("greensock-language", 'HTML5', 60);
    }
    $("#language_dropdown").selectBox('value', [getCookie("greensock-language")]);
}