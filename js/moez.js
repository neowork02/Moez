const navtab = {
  init: function () {
    this.motab();
  },
  motab: function () {
    let btnNav = $(".btnNav");
    let closeBtn = $(".closeBtn");

    // 모바일 버튼 클릭
    $(btnNav).click(function () {
      $(".gnbWrap").addClass("on");
      $(".bg-shadow").css("display", "block");
    });
    // 화면 클릭
    $(".bg-shadow").click(function () {
      $(".gnbWrap").removeClass("on");
      $(".bg-shadow").css("display", "none");
    });
    // 닫기 버튼 클릭
    $(closeBtn).click(function () {
      $(".gnbWrap").removeClass("on");
      $(".bg-shadow").css("display", "none");
    });
    // toggle
    $(document).ready(function () {
      $("ul.subMenu").hide();
      $("ul.mainMenu li").click(function () {
        $("ul", this).slideToggle("fast");
      });
      $("ul.mainMenu li a").toggleClass("on");
    });
    // toggle-2depth
    $(".mainMenu li").click(function () {
      $(this).toggleClass("on").siblings().removeClass("on");
    });
  },
};

$(document).ready(function () {
  navtab.init();
});

//펼침메뉴 Tabs
$(document).ready(function () {
  tab();
});
function tab() {
  //탭메뉴 클릭할 때 실행
  $(".tabWrap .tabsNav > li a").on("click", function (e) {
    e.preventDefault();
    //초기화
    $(".tabWrap .tabsNav > li").removeClass("active");
    $(".tabWrap .tab_list").hide();
    //실행
    $(this).parent().addClass("active");
    var activeTab = $(this).attr("href");
    $(activeTab).show();
  });
  //초기 탭 설정
  var activeChk = 0;
  $(".tabWrap .tabsNav > li").each(function (i) {
    if ($(this).hasClass("active")) {
      $(this).addClass("active");
      $(this).find("a").trigger("click");
      activeChk++;
    }
  });
  //active 지정 안했을 시 첫 탭메뉴 선택
  if (activeChk == 0) {
    $(".tabWrap .tabsNav > li:first-child a").trigger("click");
  }
}

//accodian 메뉴
$(".accordion > ul > li > a").attr({
  role: "button",
  "aria-expanded": "false",
});
$(document)
  .off("click", ".accordion ul li a")
  .on("click", ".accordion ul li a", function () {
    if ($(this).closest(".mainAllMenu").length == 1) {
      if ($(this).next("ul").css("display") == "block") {
        $(this).attr({
          "aria-expanded": "false",
        });
      } else {
        $(this).attr({
          "aria-expanded": "true",
        });
      }
      if ($(this).parent().parent().hasClass("dep1")) {
        if ($(this).next("ul").css("display") === "block") {
          $(this).next("ul").slideUp("fast");
          $(this).removeClass("active");
        } else {
          $(".accordion .dep2").slideUp("fast");
          $(".accordion .dep1 > li > a")
            .removeClass("active")
            .attr("aria-expanded", "false");
          $(this).next("ul").slideDown("fast");
          $(this).addClass("active").attr("aria-expanded", "true");
        }
      } else {
        if (
          $(this).attr("class") == "more" ||
          $(this).attr("class") == "more active"
        ) {
          var $thisClass = $(this).next("ul").attr("class");
          $("." + $thisClass).slideUp("fast");
          $("." + $thisClass)
            .prev("a")
            .removeClass("active");
          if ($(this).next("ul").css("display") == "block") {
            $(this).next("ul").slideUp("fast");
            $(this).removeClass("active");
          } else {
            $(this).next("ul").slideDown("fast");
            $(this).addClass("active");
          }
        }
        var msgToggle = $(this).closest(".messageToggle");
        if (msgToggle.hasClass("messageToggle")) {
          $(".accordion .dep2 a").removeClass("active");
          $(this).addClass("active");
        }
      }

      // 아코디언 메뉴 클릭 이벤트
    } else {
      if ($(this).parent().closest(".dep1")) {
        if ($(this).next("ul.dep2").css("display") === "block") {
          $(this).next("ul.dep2").hide();
          $(this)
            .attr({ "aria-expanded": "false", role: "button" })
            .removeClass("active");
        } else {
          $(".accordion .dep2").hide();
          $(this).next("ul.dep2").show();
          $(".accordion .dep1 > li > a").removeClass("active");
          $(this).attr("aria-expanded", "true").addClass("active");
        }
      } else {
        $(this).next("ul").slideToggle();
        $(this).toggleClass("active");
        var msgToggle = $(this).closest(".messageToggle");
        if (msgToggle.hasClass("messageToggle")) {
          $(".accordion .dep2 a").removeClass("active");
          $(this).addClass("active");
        }
      }
    }
  });

// 토글버튼 slideToggle 처리
$(document)
  .off("click", ".toggleBtn")
  .on("click", ".toggleBtn", function () {
    /* Toggle Button*/
    var $toggleBtn = $(".toggleBtn"),
      $toggleWrap = $(".toggleWrap"),
      $toggleCont = $(".toggleCont");
    $(this).attr("aria-expanded", "true");
    if ($(this).parents().closest(".listToggle").length == 1) {
      $toggleCont.slideUp("fast");
      if ($(this).next(".toggleCont").css("display") == "block") {
        $(this)
          .parents()
          .closest($toggleWrap)
          .find($toggleBtn)
          .removeClass("active");
        $(this).attr("aria-expanded", "false");
      } else {
        if ($(this).parents().next(".toggleCont").css("display") == "block") {
          $(this)
            .parents()
            .closest($toggleWrap)
            .find($toggleCont)
            .slideUp("fast");
          $(this)
            .parents()
            .closest($toggleWrap)
            .find($toggleBtn)
            .removeClass("active");
          $(this).attr("aria-expanded", "false");
        } else {
          $(this)
            .parents()
            .closest($toggleWrap)
            .find($toggleCont)
            .slideDown("fast");
          $(this)
            .parents()
            .closest($toggleWrap)
            .find($toggleBtn)
            .addClass("active");
          $toggleBtn.attr("aria-expanded", "false");
          $(this).attr("aria-expanded", "true");
        }
      }
    } else {
      if (
        $(this).closest(".toggleWrap").find(".toggleCont").css("display") ==
        "block"
      ) {
        $(this)
          .parents()
          .closest($toggleWrap)
          .find($toggleCont)
          .slideUp("fast");
        $(this)
          .parents()
          .closest(".toggleWrap")
          .find(".toggleBtn")
          .removeClass("active");
        $(this).attr("aria-expanded", "false");
      } else {
        // $(this).parents().closest($toggleWrap).find($toggleCont).slideDown('fast', function() {
        //  if ($(this).parents().is("#NSCN0009P")) {
        //      //console.log(1);
        //      $(".popCont").scrollTop(300);
        //  }
        // });
        $(this)
          .parents()
          .closest($toggleWrap)
          .find($toggleCont)
          .slideDown("fast");
        $(this)
          .parents()
          .closest(".toggleWrap")
          .find(".toggleBtn")
          .addClass("active");
        $(this).attr("aria-expanded", "true");
      }
    }
  });

/* center 팝업 */
popCenter = function () {
  var $winH = $(window).height();
  var maxH = $winH * 0.7;
  var maxTotalH = maxH - 135;
  scrollLock();
  // 최대 높이 지정
  var cTarget = $(".centerLayer .popInner2");
  cTarget.css({ "max-height": maxH });
  cTarget.find(".popCont").css("max-height", maxTotalH);
  // center 팝업 열기
  $(".centerLayer").show();
  cTarget.css(
    "bottom",
    Math.max(0, ($(window).height() - cTarget.outerHeight()) / 2) + "px"
  );
  cTarget.css(
    "left",
    Math.max(0, ($(window).width() - cTarget.outerWidth()) / 2) + "px"
  );
  // 높이관련
  var cTargetNoti = $(".popInner2");
  cTargetNoti.css("max-height", "");
  cTargetNoti.find(".popCont").css("max-height", "");
  if (cTargetNoti.height() > $(window).height() * 0.8) {
    cTargetNoti
      .find(".oneImg > a> img")
      .css({ height: $(window).height() * 0.75, width: "" });
    //통이미지 사이즈에 따른 팝업높이 조절
  }
  cTargetNoti.css(
    "bottom",
    Math.max(0, ($(window).height() - cTargetNoti.outerHeight()) / 2) + "px"
  );
  cTargetNoti.css(
    "left",
    Math.max(0, ($(window).width() - cTargetNoti.outerWidth()) / 2) + "px"
  );
};

/* close */
popClose = function (e) {
  scrollPosY = $("body").css("top");
  var $popWrap = $(e).closest(".popWrap");
  var $slidePopInner = $(
    ".slidePopOption .popInner, .slidePopConfirm .popInner, .bankSetWrap .popInner"
  );
  var $slidePop = $(".slidePopOption, .slidePopConfirm, .bankSetWrap");
  $(".dim").fadeOut(100);
  if (
    $popWrap.hasClass("slidePopOption") ||
    $popWrap.hasClass("slidePopConfirm") ||
    $popWrap.hasClass("bankSetWrap")
  ) {
    $slidePopInner.animate({ height: 0 }, 150, function () {
      $slidePop.hide();
    });
  } else {
    $(e).closest(".popWrap").hide();
  }
  scrollUnlock(scrollPosY);
};

/* 화면 back scroll 고정/해제 */
scrollLock = function (thisScrollY) {
  $(".dim").fadeIn(100);
  $("body").css({ overflow: "hidden", position: "fixed", width: "100%" });
  $("body").css("top", -thisScrollY);
};

scrollUnlock = function (scrollPosY) {
  $("body").css({ overflow: "", position: "", width: "" });
  scrollPosY = scrollPosY.replace("/[^0-9]/g", "");
  $(window).scrollTop(scrollPosY);
};

/* Full layer(툴팁용 포함) */
fullLayerPop = function (toolTip) {
  //scrollLock();
  $(".fullLayerPop").show();
  //   $(".toolTip").hide();
  fullLayerHeight();
};
fullLayerHeight = function () {
  var $winH = $(window).height();
  var fullTit =
    $(".fullLayerPop .popInner h1").length > 0
      ? $(".fullLayerPop .popInner h1").outerHeight()
      : $(".fullLayerPop .popInner h2").outerHeight();
  var fullBtnAra =
    $(".fullLayerPop .popBtnWrap .popBtn").length > 0
      ? $(".fullLayerPop .popBtnWrap .popBtn").outerHeight()
      : 0;
  //console.log(fullTit, fullBtnAra , $winH);
  $(".fullLayerPop > .popInner > .popCont").css({
    height: $winH - fullTit - fullBtnAra,
  });
};
/* slidePopOption */
/* select 형 팝업 */
slidePopOption = function () {
  var thisScrollY = $(window).scrollTop();
  scrollLock(thisScrollY);
  $(".slidePopOption").show();

  var $winH = $(window).height();
  var $slideInner = $(".slidePopOption .popInner");
  var $slideCont = $(".slidePopOption .popCont");
  setTimeout(function () {
    var slidePopOpt = $(".slidePopOption");
    var slidePopOptTit =
      slidePopOpt.find(".popInner h1").length > 0
        ? slidePopOpt.find(".popInner h1").outerHeight()
        : slidePopOpt.find(".popInner h2").outerHeight();
    var slidePopOptBtnAra =
      slidePopOpt.find(".popBtnWrap .popBtn").length > 0
        ? slidePopOpt.find(".popBtnWrap").outerHeight()
        : 0;
    var slidePopOptH = slidePopOpt.find(".popCont").outerHeight();
    //console.log(slidePopOptTit, slidePopOptBtnAra , slidePopOptH);
    $slideCont.css({ height: $winH / 2 });
    $slideInner.animate(
      { height: $winH / 2 + slidePopOptBtnAra + slidePopOptTit },
      100
    );
  }, 100);
};
