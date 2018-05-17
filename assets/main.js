/**
 * 通用模块
 *
 */
var $win = $(window),
    $doc = $(document),
    $body = $('body', $doc),
    winW = $win.width();

$(window).resize(function() {
    winW = $win.width();
})


/**
 * 图片加载
 */
$(function() {
    if (!$.fn.lazyload) return;
    $("img.lazy", $body).lazyload({
        effect: "fadeIn",
        threshold: 200,
        failure_limit: 0
    });
});


$(function() {
    if ($win.width() > 992) {
        if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
            new WOW().init();
        };
    }

});
// 导航滑动
$(function() {
    var jCate = $('.category ul', $body);
    var wrap = $('.category');
    var wrapWidth = wrap.width();
    if (jCate.width() < wrap.width()) {
        jCate.width("100%");
    } else {
        jCate.on('click', 'a', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            location.href = this.href;
        });

        jCate.on('touchstart', function(event) {
            jCate.addClass('touchstart');
            var touch = event.originalEvent.targetTouches[0];
            var data = {
                'touchX': touch.pageX,
                'width': jCate.width(),
                'left': parseInt(jCate.css('left')),
                'wwidth': wrapWidth
            };

            if (data.width < data.wwidth) {
                return true;
            }

            jCate.on('touchmove', data, touchMove);
            jCate.on('touchend', touchEnd);
        });
    }


    //  TAB 滑动
    var touchMove = function(event) {
        event.preventDefault();

        var touch = event.originalEvent.targetTouches[0];
        var touchX = touch.pageX;

        var incr = touchX - event.data.touchX;
        var left = event.data.left + incr;

        if (left > 0) {
            left = 0;
        } else if ((event.data.wwidth - left) > event.data.width) {
            left = event.data.wwidth - event.data.width;
        }

        jCate.css('left', left);
    };

    var touchEnd = function(event) {
        jCate.removeClass('touchstart');
        jCate.off('touchmove', touchMove);
        jCate.off('touchend', touchEnd);
    };


    /**
     * init-pos
     */
    (function() {
        var width = jCate.find('.active').width();
        var offset = jCate.find('.active').offset();

        var winWidth = $win.width();
        var cateWidth = jCate.width();

        // ($win - jCate) < left < 0
        if (offset && cateWidth > winWidth) {
            var left = winWidth / 2 - (offset.left + width / 2);
            left = Math.min(left, 0);
            left = Math.max(left, winWidth - cateWidth);
            jCate.css('left', left);
        }
    })();
});



//头部导航
$(function() {
    //折叠导航
    var oset;
    $(".nav-collapse").click(function(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
        $(".nav-collapse").toggleClass("active");

        $(".nav").stop().fadeToggle().toggleClass("fade-out");
        $("body").toggleClass("fixed");
        $(".nav").removeClass("left-100 left-200");

        if (!$(this).hasClass("active")) {
            $(".nav").hide();
            $(".nav-list1").find("li").removeClass("act");
        } else {
            clearTimeout(oset);
            $(".nav-list1>li").each(function(index, val) {
                var me = $(this);
                var num = $(this).index()
                oset = setTimeout(function() {
                    me.addClass("act");
                }, (index * 100))
            })
        }
    })

});

$(function() {

    var list1 = $(".nav-list1"),
        list2 = $(".nav-list2"),
        list3 = $(".nav-list3");
    list1.on("click", ".more", function(event) {
        if (winW > 1199) return;
        event.stopPropagation();
        event.preventDefault();
        $(".nav").addClass("left-100");
        var ostr = "";
        ostr = $(this).children(".nav-list2").html();
        ohref = $(this).children("a").clone(true);
        $(".nav-2 .content ul").html(ostr).children("li").has(".nav-list3").addClass("more");
        $(".nav-2 h2").html(ohref);

    })
    $(".nav2-list2").on("click", "li", function(event) {
        if (winW > 1199) return;
        event.stopPropagation();
        if ($(this).hasClass("more")) {
            event.preventDefault();
            $(".nav").addClass("left-200");
            var ostr = "";
            ostr = $(this).children(".nav-list3").html();
            ohref = $(this).children("h4").children("a").clone(true);
            
            $(".nav-3 .content ul").html(ostr);
            $(".nav-3 h2").html(ohref);
        }
    })

    list1.on("mouseenter", ".more", function(event) {

        if (winW < 1200) return;
        var me2 = $(this).children(".nav-list2");
        me2
            .stop().slideDown("fast")
            .children("li").has(".nav-list3").addClass("more");

    }).on("mouseleave", ".more", function(event) {

        if (winW < 1200) return;
        $(this).children(".nav-list2").stop().slideUp("fast");

    })

    list2.on("mouseenter", "li", function(event) {
        if (winW < 1200) return;
        // $(this).children(".nav-list3").stop().slideDown("fast");
    }).on("mouseleave", "li", function(event) {
        if (winW < 1200) return;
        // $(this).children(".nav-list3").stop().slideUp("fast");
    })

    $(".back-btn2").click(function() {
        $(".nav").removeClass("left-100");
    })
    $(".back-btn3").click(function() {
        $(".nav").removeClass("left-200");
    })
    //查找按钮
    $(".find").click(function(e) {
        if (e && e.stopPropagation) {
            //W3C取消冒泡事件
            e.stopPropagation();
        } else {
            //IE取消冒泡事件
            window.event.cancelBubble = true;
        }
        $(".search-lg").stop().fadeIn();
        $(".input-text").focus();
        $("body").addClass('searchactive');
        if (winW < 1200) {
            $("#btn").removeClass("active");
        }
    })

    $(".search-icon").click(function() {
        if (winW < 1200) {
            $(".search-xs").addClass("show")
        }
    })
    $(".nav").click(function(e) {
        if (!$(e.target).hasClass("input-text") && !$(e.target).hasClass("search-icon")) {
            
            $(".search-xs").removeClass("show")
        }
    })

    $(".close-btn").click(function() {
        $(".search-lg").fadeOut("fast");
        $("body").removeClass('searchactive');
    })


});



/**
 * 幻灯切换
 */
$(function() {
    if (!$.fn.owlCarousel) return;

    // 首页 banner
    $('#owl-index').owlCarousel({
        autoPlay: 4000,
        autoPlay: true,
        autoHeight: false,

        stopOnHover: false,
        lazyLoad: true,

        singleItem: true,
        slideSpeed: 300,
        autoPlay: true,
        navigation: true,
        navigationText: false,
        paginationSpeed: 400,
        transitionStyle: "fade",
        afterAction: function() {
            var current = this.currentItem;
            
            $(".owl-item")
                .eq(current)
                .addClass("active")
                .siblings().removeClass("active");
        }
    });
});


$(function() {
    if (!$.fn.owlCarousel) return;

    // 首页 banner
    $('#owl-recommended,#owl-recommended').owlCarousel({
        autoPlay: 4000,
        autoPlay: true,
        autoHeight: false,

        stopOnHover: false,
        lazyLoad: true,

        singleItem: true,
        slideSpeed: 300,
        autoPlay: true,
        navigation: true,
        navigationText: false,
        paginationSpeed: 400,
        transitionStyle: "fade",
        afterAction: function() {
            var current = this.currentItem;
            
            $(".owl-item")
                .eq(current)
                .addClass("active")
                .siblings().removeClass("active");
        }
    });
});






$(function() {
    if (!$.fn.owlCarousel) return;

    $('#owl-solution').owlCarousel({
        autoPlay: 4000,
        autoPlay: true,
        autoHeight: false,

        stopOnHover: false,
        lazyLoad: true,

        singleItem: true,
        slideSpeed: 300,
        autoPlay: true,
        navigation: true,
        navigationText: false,
        paginationSpeed: 400,
        transitionStyle: "fade",
    });
});

$(function() {
    if (!$.fn.owlCarousel) return;

    $('#owl-service').owlCarousel({
        autoPlay: 4000,
        autoPlay: true,
        autoHeight: false,

        stopOnHover: false,
        lazyLoad: true,

        singleItem: true,
        slideSpeed: 300,
        autoPlay: true,
        navigation: true,
        navigationText: false,
        paginationSpeed: 400,
        transitionStyle: "fade",
    });
});



// 浮动客服弹出二维码and缓冲回到顶部

// $(function() {
//     $('.online > .online-wechat').hover(function() {
//         $('.online-wechat .erweima').stop(true, true).fadeIn();
//     }, function() {
//         $('.online-wechat .erweima').stop(true, true).fadeOut();
//     });
//     $('.online > .online-weixin').hover(function() {
//         $('.online-weixin .erweima').stop(true, true).fadeIn();
//     }, function() {
//         $('.online-weixin .erweima').stop(true, true).fadeOut();
//     });
//     $('.online > .online-tel').hover(function() {
//         $('.online-tel p').stop(true, true).fadeIn();
//     }, function() {
//         $('.online-tel p').stop(true, true).fadeOut();
//     });
//     $('.online > .online-whatsapp').hover(function() {
//         $('.online-whatsapp p').stop(true, true).fadeIn();
//     }, function() {
//         $('.online-whatsapp p').stop(true, true).fadeOut();
//     });
//     $('#backtop,.backtop').click(function() {
//         $("html, body").animate({
//             scrollTop: 0
//         }, 400);
//     });
// });



$(function() {
    $('.icon-online').click(function() {
        $('.online').toggleClass('active');
        $('.icon-online').toggleClass('icon');
    });
});



