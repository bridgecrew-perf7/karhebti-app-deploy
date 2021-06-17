$(window).on("load", () => {
  $(".spinner").delay(1000).fadeOut(1000);
});

$(document).ready(() => {
  $(".classified").delay(3000).fadeOut(5000);

  $(".nav-link").click(() => {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
  });

  /* ----------------- CALC FULL HEIGHT ---------------------- */
  getHeight();

  $(window).resize(() => {
    getHeight();
  });

  /* -----------------DATE HANDLERS - USER---------------------- */
  let date = new Date(),
    todayDay = date.getDate(),
    todayMonth = date.getMonth() + 1,
    todayFullDate = date.getFullYear();

  const dateClassObj = $(".date");

  todayDay = _addZero(todayDay);
  todayMonth = _addZero(todayMonth);

  todayFullDate += "-" + todayMonth + "-" + todayDay;

  dateClassObj.val(todayFullDate);
  dateClassObj.attr("min", todayFullDate);

  $("#dateIn, #days").click(() => {
    let days = $("#days").val(),
      price = $("#price").val(),
      hours = 24;

    price *= days;
    hours *= days;

    // changes price
    $("#numbers").val(price);
    $("#spMin").text(days + "J");

    todayFullDate = $("#dateIn").val();

    date = new Date(todayFullDate);

    --days; // needed for getDate()
    date.setDate(date.getDate() + days);

    todayDay = date.getDate();
    todayMonth = date.getMonth() + 1; // January is 0!

    todayDay = _addZero(todayDay);
    todayMonth = _addZero(todayMonth);

    todayFullDate = date.getFullYear() + "-" + todayMonth + "-" + todayDay;

    $("#dateOut").val(todayFullDate);
  });


});

function _hide(toShow) {
  $(".hide").hide();
  $("li").removeClass("active");
  $(toShow).addClass("active");
}

function _addZero(str) {
  if (str < 10) str = "0" + str;
  return str;
}

function getHeight() {
  let fullHeighMinusHeader =
    $(window).height() -
    $("header").outerHeight() -
    $("footer").outerHeight() -
    65;
  $("main").height(fullHeighMinusHeader.toFixed(2));
}