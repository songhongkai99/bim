$(function () {

    //全局变量
    var $clickAudio = $("#clickAudio"),
        $vIframeBox = $("#vIframeBox"),
        $mianTankuang = $(".mian-tankuang"),
        $closeIframe = $("#closeIframe"),
        $backButton = $("#backButton"),
        $photoWall = $("#photoWall"),
        $mainShan = $("#mainShan");

    var backOptions = {
        shouldBackShow: "shouldBackShow",
        shouldBackHide: "shouldBackHide"
    };

    /**
     * 增加一个可返回的操作
     * @param $from 触发元素
     * @param $target 要显示的元素
     */
    function addBackOptions($from, $target) {
        $("." + backOptions.shouldBackShow).removeClass(backOptions.shouldBackShow);
        $("." + backOptions.shouldBackHide).removeClass(backOptions.shouldBackHide);
        $from && $from.addClass(backOptions.shouldBackShow).removeClass("vis-show");
        $target && $target.addClass(backOptions.shouldBackHide).addClass("vis-show");
        $backButton.removeClass("nothing");
    }

    function controlBackOptions() {
        var data = $backButton.data();
        $("." + backOptions.shouldBackShow).removeClass(backOptions.shouldBackShow).addClass("vis-show");
        $("." + backOptions.shouldBackHide).removeClass(backOptions.shouldBackHide).removeClass("vis-show");
        if(data.backLevel == 4){
            var $dom = $(".back-ground.vis-show")
            addBackOptions($("#" + $dom.data("backId")), $dom);
            data.backLevel = 3;
        } else if($(".mian-tankuang.vis-show").length){
            addBackOptions($photoWall, $(".mian-tankuang.vis-show"))
        } else {
            $backButton.addClass("nothing")
        }
    }

    //照片墙初始化
    var $pwSpan = $(".pw-span");
    $pwSpan.each(function () {
        $(this).css({
            animationDelay: Math.random() * 10 + "s"
        })
    })
    $photoWall.addClass("animate")

    //内嵌浏览器全屏控制
    $closeIframe.on("click", function (e) {
        var $dom = $("#domBody");
        if($dom.hasClass("iframe-fullscreen")){
            $dom.addClass("iframe-fullscreen-delay");
            $dom.removeClass("iframe-fullscreen");
            setTimeout(function () {
                $dom.removeClass("iframe-fullscreen-delay");
            },600)
        } else {
            $dom.addClass("iframe-fullscreen");
        }
    })

    //全局返回控制按钮
    $backButton.on("click", function (e) {
        var data = $(this).data();
        controlBackOptions();
    })

    //圆形按钮
    $(".js-open-folder").on("click", function (e) {
        e.stopPropagation();
        var data = $(this).data(),
            $openId = $('#' + data.openId);
        $backButton.data({
            backFrom: "folder",
            backLevel: data.openLevel
        });
        //通过addBackOptiongs统一控制隐藏和显示
        //$(this).closest(".back-ground").removeClass("vis-show")
        //$openId.addClass('vis-show');
        addBackOptions($(this).closest(".back-ground"), $openId);
    })

    //内嵌浏览器
    $(".js-open-iframe").on("click", function (e) {
        e.stopPropagation();
        $clickAudio[0].play();
        var data = $(this).data(),
            $openId = $('#' + data.openId),
            $back = $photoWall;
        $backButton.data({
            backFrom: "iframe",
            backTarget: data.openLevel == 2 ? "home" : "tankuang",
            backLevel: data.openLevel
        });
        $mianTankuang.not($vIframeBox).removeClass("vis-show");
        if($openId.attr("src") == ""){
            $openId.attr("src", data.link);
        }
        $("#popupFrames").find(">iframe").not($openId).removeClass("vis-show")
        $openId.addClass('vis-show');
        //是否从圆形文件夹打开
        if($(this).hasClass("cicle-posiab")){
            $back = $(this).closest(".mian-tankuang")
        }
        addBackOptions($back, $vIframeBox);
    })

    //弧形按钮
    $(".js-open-tankuang").on("click", function (e) {
        e.stopPropagation();
        $clickAudio[0].play();
        var data = $(this).data(),
            $openId = $("#" + data.openId);
        $backButton.data({
            backFrom: "tankuang",
            backTarget: "home"
        });
        $mianTankuang.not($openId).removeClass("vis-show");
        addBackOptions($photoWall, $openId)
    })

    //页面缩放
    function controlPageScale() {
        var scalexRate = $(window).width() / 1920,
            scaleyRate = $(window).height() / 1080;
        $("#navBottom, #bodyScaleDoms").css("transform", 'scale(' + scalexRate + ', ' + scaleyRate + ')');
    }
    controlPageScale();

    $(window).on("resize", function () {
        controlPageScale();
    })

    //20180417 变更 start
    var initRotate = 0, h;
    $("#clickHover").click(function () {
        initRotate += 90;
        $(this).find('.chi-ibox').css({
            transform: "rotate(" + initRotate + "deg)"
        })
        $(".click-audio")[0].play();
        var $dom = $(".mian-tankuang.vis-show").find('.back-ground-box');
        if ($mainShan.hasClass('opened-nav')) {
            if (!h){
                h = $dom.height();
            }
            $mainShan.removeClass("opened-nav");
            // $dom.animate({
            //     height: '600px'
            // })
            $("#domBody").addClass("shan-nav-closed").removeClass("shan-nav-opened")
        } else {
            $mainShan.addClass("opened-nav");
            // if($dom.length == 0){
            //     $('.back-ground-box').removeAttr("style");
            // } else {
            //     $dom.animate({
            //         height: h + "px"
            //     })
            // }
            $("#domBody").removeClass("shan-nav-closed").addClass("shan-nav-opened")
        }
    })
    //20180417 变更 end

    //20180417 变更 start
    $(window).on("load", function () {
        //初始化扇形按钮
        setTimeout(function () {
            $mainShan.addClass('opened-nav');
            $("#domBody").addClass("shan-nav-opened");
        }, 300)
    })
    //20180417 变更 end

    $(".cicle-posiab").hover(function () {
        $(this).addClass("img-hover");
        $(this).find(".gong-txt").addClass("txt-hover")
        $(this).find(".gong-txt").css("color", "#fff")
    }, function () {
        $(this).removeClass("select-hover");
        $(this).removeClass("img-hover");
        $(this).find(".gong-txt").removeClass("txt-hover")
        $(this).find(".gong-txt").css("color", "")
    })
    $(".cicle-posiab").click(function () {
        $(".click-audio")[0].play();
        if($(this).hasClass("nothing")){
            $(this).closest('.back-ground').animate({
                left: "-120px"
            }, 60).animate({
                left: "120px"
            },120).animate({
                left: "0px"
            },60)
        }
    })
    $(".cicle-posiab").mousedown(function (event) { //获取鼠标按下的位置
        $(this).removeClass("img-hover");
        $(this).find(".gong-txt").removeClass("txt-hover")
        $(this).addClass("select-hover");
    });
    $(".cicle-posiab").mouseup(function (event) {//鼠标释放
        $(this).addClass("img-hover");
        $(this).find(".gong-txt").addClass("txt-hover")
        $(this).removeClass("select-hover");
    })


    $(".backgroud-audio")[0].play();
//
    $(".kuang01").hover(function () {
        $(this).find("img").first().attr("src", "images/kuang-hover01.png");
        $(this).find("img").last().attr("src", "images/wirte01.png");
        $(this).find(".gongyi-txt").css("color", "#fff");
    }, function () {
        $(this).find("img").first().attr("src", "images/kuang01.png");
        $(this).find("img").last().attr("src", "images/blue01.png");
        $(this).find(".gongyi-txt").css("color", "");
    })
    $(".kuang02").hover(function () {
        $(this).find("img").first().attr("src", "images/kuang-hover02.png");
        $(this).parent().prev().find("img").first().attr("src", "images/kuang-hover01_2.png");
        $(this).find("img").last().attr("src", "images/wirte02.png");
        $(this).find(".gongyi-txt").css("color", "#fff");
    }, function () {
        $(this).find("img").first().attr("src", "images/kuang02.png")
        $(this).parent().prev().find("img").first().attr("src", "images/kuang01.png");
        $(this).find("img").last().attr("src", "images/blue02.png");
        $(this).find(".gongyi-txt").css("color", "");
    })
    $(".kuang03").hover(function () {
        $(this).find("img").first().attr("src", "images/kuang-hover03.png")
        $(this).find("img").last().attr("src", "images/wirte03.png");
        $(this).parent().prev().find("img").first().attr("src", "images/kuang-hover02_2.png");
        $(this).find(".gongyi-txt").css("color", "#fff");
    }, function () {
        $(this).find("img").first().attr("src", "images/kuang03.png")
        $(this).parent().prev().find("img").first().attr("src", "images/kuang02.png");
        $(this).find("img").last().attr("src", "images/blue03.png");
        $(this).find(".gongyi-txt").css("color", "");
    })
    $(".kuang04").hover(function () {
        $(this).find("img").first().attr("src", "images/kuang-hover04.png")
        $(this).find("img").last().attr("src", "images/wirte04.png");
        $(this).parent().prev().find("img").first().attr("src", "images/kuang-hover03_2.png");
        $(this).find(".gongyi-txt").css("color", "#fff");
    }, function () {
        $(this).find("img").first().attr("src", "images/kuang04.png")
        $(this).parent().prev().find("img").first().attr("src", "images/kuang03.png");
        $(this).find("img").last().attr("src", "images/blue04.png");
        $(this).find(".gongyi-txt").css("color", "");
    })
    $(".kuang05").hover(function () {
        $(this).find("img").first().attr("src", "images/kuang-hover05.png")
        $(this).find("img").last().attr("src", "images/wirte05.png");
        $(this).parent().prev().find("img").first().attr("src", "images/kuang-hover04_2.png");
        $(this).find(".gongyi-txt").css("color", "#fff");
    }, function () {
        $(this).find("img").first().attr("src", "images/kuang05.png")
        $(this).find("img").last().attr("src", "images/blue05.png");
        $(this).parent().prev().find("img").first().attr("src", "images/kuang04.png");
        $(this).find(".gongyi-txt").css("color", "");
    })
    $(".kuang06").hover(function () {
        $(this).find("img").first().attr("src", "images/kuang-hover06.png");
        $(this).find("img").last().attr("src", "images/wirte06.png");
        $(this).parent().prev().find("img").first().attr("src", "images/kuang-hover05_2.png");
        $(this).find(".gongyi-txt").css("color", "#fff");
    }, function () {
        $(this).find("img").first().attr("src", "images/kuang06.png");
        $(this).parent().prev().find("img").first().attr("src", "images/kuang05.png");
        $(this).find(".gongyi-txt").css("color", "");
        $(this).find("img").last().attr("src", "images/blue06.png");
    })
    $(".kuang07").hover(function () {
        $(this).find("img").first().attr("src", "images/kuang-hover07.png");
        $(this).find("img").last().attr("src", "images/wirte07.png");
        $(this).parent().prev().find("img").first().attr("src", "images/kuang-hover06_2.png");
        $(this).find(".gongyi-txt").css("color", "#fff");
    }, function () {
        $(this).find("img").first().attr("src", "images/kuang07.png");
        $(this).parent().prev().find("img").first().attr("src", "images/kuang06.png");
        $(this).find("img").last().attr("src", "images/blue07.png");
        $(this).find(".gongyi-txt").css("color", "");
    })
})

