
$(document).ready(function () {
  if(localStorage.id == 0 || localStorage.id == undefined){
    window.location.replace("/");
  }
  // alert(localStorage.Origin);
  // alert(localStorage.Destination);
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 100) {
      $(".navbar").css("background", "#578097");
      $(".navbar").style
    }
    else if (scroll < 100) {
      $(".navbar").css("background", "none");

    }
  })

  // select date
  $('#sandbox-container').datepicker({
    format: "dd/DD/mm/yyyy",
    startDate: "-Infinity",
    startView: 0,
    viewMode: "years",
    minViewMode: "days",
    minViewMode: "days",
    multidate: true,
    multidateSeparator: " - ",
    autoClose: true,
    defaultViewDate: "today",
  }).on("changeDate", function (event) {
    var dates = event.dates, elem = $('#sandbox-container');
    if (elem.data("selecteddates") == dates.join(",")) return; //To prevernt recursive call, that lead to lead the maximum stack in the browser. 
    if (dates.length > 2) dates = dates.splice(dates.length - 1);
    dates.sort(function (a, b) { return new Date(a).getTime() - new Date(b).getTime() });
    elem.data("selecteddates", dates.join(",")).datepicker('setDates', dates);
  });
  $("#btndate").click(function () {
    var btndate = $("#date").val();
    $("#outputdate").text(btndate);
    $("#txtdate").text(btndate);
  });

  $.ajax({
    method: 'POST',
    url: '/DataPlace',
  }).done(function (data, state, xhr) {
    // alert(data);
    let createOption = "";
    for (let i = 0; i < data.length; i++) {
      createOption += "<option value='" + data[i].placeID + "'>" + data[i].name_place + "</option>";
    }
    // console.log(createOption);
    $("#pinOrigin").html(createOption);
    $("#pinDestination").html(createOption);
    // $("#pinOrigin option[value='"+ 13 +"']").attr('selected', 'selected');
    $("#pinOrigin").val(localStorage.Origin);
    $("#pinDestination").val(localStorage.Destination);
    // $("#EditTypeplace").html(createOption);
  }).fail(function (xhr, state) {
    alert(xhr.responeText);
  });



  $("#pinOrigin").change(function () {
    // alert("test");
    // alert($(this).children(":selected").attr("value"))
    let valplace1 = $("#pinOrigin").children(":selected").attr("value");
    let valplace2 = $("#pinDestination").children(":selected").attr("value");
    // $("#Route_Destination[value='"+ valplace +"']").remove();
    // alert(valplace1+" "+valplace2);
    if (valplace1 == valplace2) {
      $.ajax({
        method: 'POST',
        url: '/select_Route',
        data: { selectRoute: valplace1 }
      }).done(function (data, state, xhr) {
        // alert(data[0].);
        let createOption = "";
        for (let i = 0; i < data.length; i++) {
          createOption += "<option value='" + data[i].placeID + "'>" + data[i].name_place + "</option>";
        }
        console.log(createOption);
        // $("#txtOrigin").text(text);
        $("#pinDestination").html(createOption);
      }).fail(function (xhr, state) {
        alert(xhr.responeText);
      })
    }



  });

  $("#pinDestination").change(function () {
    // alert("test");
    // alert($(this).children(":selected").attr("value"))
    let valplace1 = $("#pinOrigin").children(":selected").attr("value");
    let valplace2 = $("#pinDestination").children(":selected").attr("value");
    // alert(valplace);
    if (valplace1 == valplace2) {
      $.ajax({
        method: 'POST',
        url: '/select_Route',
        data: { selectRoute: valplace2 }
      }).done(function (data, state, xhr) {
        // alert(data[0].);
        let createOption = "";
        for (let i = 0; i < data.length; i++) {
          createOption += "<option value='" + data[i].placeID + "'>" + data[i].name_place + "</option>";
        }
        console.log(createOption);
        $("#pinOrigin").html(createOption);
      }).fail(function (xhr, state) {
        alert(xhr.responeText);
      })
    }
  });

  $("#logout").click(function () {
    localStorage.id = 0;
    // alert("test");
    window.location.replace("/");
  });

})



