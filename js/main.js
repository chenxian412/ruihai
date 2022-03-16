var winW, winH, winST, isSp, isChange, spW = 768;
$(function () {
    initCommon();
    initHeader();
    initHome();
    initAbout();
    initContact();
});

function initCommon() {
    $(window).scroll(function () { winST = $(window).scrollTop() }).trigger('scroll');
    $(window).resize(getWinSize).trigger('resize');

    function getWinSize() {
        winW = $('html').css('overflow', 'hidden').width();
        winH = $(window).height();
        isChange = isSp !== undefined && isSp != (winW < spW);
        isSp = winW < spW;
        $('html').removeAttr('style');
    }
}

function initHeader() {
    // 搜索框按钮出现搜索框
    if (!isSp) {
        $("#header .search").hover(function () {
            $('.search .search_bd').stop().fadeToggle(300);
        });
    }

    $("#header .search_bd .reset").click(function () {
        $('#header .search_bd input').val('');
    });

    // 回到顶部
    $("#fixed .top").click(function () {
        $('body,html').animate({ scrollTop: 0 }, 1000);
        return false;
    });

    // 移动端菜单按钮
    var count = 2;
    $('#btnMenu').click(function () {
        if (count % 2 == 0) {
            $(this).addClass('btnMenu_on').removeClass('btnMenu');

        } else {
            $(this).addClass('btnMenu').removeClass('btnMenu_on');
        }
        $('#header .bd .inner ul').toggleClass('openMenu');
        $('body').toggleClass('barrier');
        $('body').toggleClass('stop_scroll');
        count++;
    });
}

function initHome() {
    if (!$('body').hasClass('home')) return;

    // 轮播图
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: true,
        loop: true,
    });
}

function initAbout() {
    if (!$('body').hasClass('about')) return;

    // sec03
    var swiper = new Swiper('.sec03 .swiper-container', {
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: '.sec03 .swiper-button-next',
            prevEl: '.sec03 .swiper-button-prev',
        },
    });

    // sec04
    var swiper = new Swiper('.sec04 .swiper-container', {
        loop: true,
        spaceBetween: 94,
        slidesPerView: 4,
        navigation: {
            nextEl: '.sec04 .swiper-button-next',
            prevEl: '.sec04 .swiper-button-prev',
        },
    });

    // sec05
    var swiper = new Swiper('.sec05 .swiper-container', {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 3,
        slidesPerGroup: 3,
        navigation: {
            nextEl: '.sec05 .swiper-button-next',
            prevEl: '.sec05 .swiper-button-prev',
        },
    });

    // sec06
    var swiper = new Swiper('.sec06 .swiper-container', {
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: '.sec06 .swiper-button-next',
            prevEl: '.sec06 .swiper-button-prev',
        },
    });
}

function initContact() {
    if (!$('body').hasClass('contact')) return;

    //创建和初始化地图函数：
    function initMap() {
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMapOverlay();//向地图添加覆盖物
    }
    function createMap() {
        map = new BMap.Map("map");
        map.centerAndZoom(new BMap.Point(106.548425, 29.49753), 17);
    }
    function setMapEvent() {
        map.enableScrollWheelZoom();
        map.enableKeyboard();
        map.enableDragging();
        map.enableDoubleClickZoom()
    }
    function addClickHandler(target, window) {
        target.addEventListener("click", function () {
            target.openInfoWindow(window);
        });
    }
    function addMapOverlay() {
        var markers = [
            { content: "我的备注", title: "我的标记", imageOffset: { width: -46, height: -21 }, position: { lat: 29.497345, lng: 106.54807 } }
        ];
        for (var index = 0; index < markers.length; index++) {
            var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
            var marker = new BMap.Marker(point, {
                icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png", new BMap.Size(20, 25), {
                    imageOffset: new BMap.Size(markers[index].imageOffset.width, markers[index].imageOffset.height)
                })
            });
            var label = new BMap.Label(markers[index].title, { offset: new BMap.Size(25, 5) });
            var opts = {
                width: 200,
                title: markers[index].title,
                enableMessage: false
            };
            var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
            marker.setLabel(label);
            addClickHandler(marker, infoWindow);
            map.addOverlay(marker);
        };
    }
    //向地图添加控件
    function addMapControl() {
        var scaleControl = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
        scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
        map.addControl(scaleControl);
        var navControl = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
        map.addControl(navControl);
        var overviewControl = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: true });
        map.addControl(overviewControl);
    }
    var map;
    initMap();

    $('.sec01 .bd').click(function () {
        $('.mask').hide();
        $('.inner1').hide();
        $('#map').css('zIndex', '99');
    })
}