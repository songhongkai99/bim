$(function () {

    function controlPageScale() {
        var scaleRate = $(window).width() / 1920;
        $("#navBottom, #bodyScaleDoms").css("transform", 'scale(' + scaleRate + ')');
    }
    controlPageScale();

    $(window).on("resize", function () {
        controlPageScale();
    })

    //20180417 变更 start
    var initRotate = 0;
    $(".click-hover").click(function () {
        initRotate += 90;
        $(this).find('.chi-ibox').css({
            transform: "rotate(" + initRotate + "deg)"
        })
        $(".click-audio")[0].play();
        if ($(".main-shan").hasClass('opened-nav')) {
            $(".main-shan").removeClass("opened-nav");
            $(".faguang-bots").fadeOut(1200);
        } else {
            $(".main-shan").addClass("opened-nav");
            $(".faguang-bots").fadeIn(1200);
        }
    })
    //20180417 变更 end

    $(".kuang01").click(function () {
        $(".click-audio")[0].play();
        $(".vButton").fadeIn()
        $(".vVideo").fadeOut()
    })
    $(".kuang02").click(function () {
        $(".click-audio")[0].play();
        $(".vVideo").fadeIn()
        $(".vButton").fadeOut()
    })


    //20180417 变更 start
    $(window).on("load", function () {
        //控制菜单高度
        var $mainShan = $('#mainShan'),
            $firstMainShanLi = $('#firstMainShanLi'),
            $mainShanLis = $mainShan.find('>ul>li');
        $mainShan.css({
            "height": $firstMainShanLi.css('height')
        })
        $mainShanLis.each(function () {
            var width = $(this).width(),
                height = $(this).height();
            $(this).css({
                "width": width,
                "height": height
            })
        })
        setTimeout(function () {
            $mainShan.addClass('opened-nav');
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
        $(".back-ground1").toggle();
        $(".back-ground2").toggle();
        $(".click-audio")[0].play();
        $(".cicle-posiab").animate({left: '2000px'}, 500);
        $(".cicle-posiab").animate({left: '-2000px'}, 800);
        $(".cicle-posiab").animate({left: '0px'}, 100);
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

