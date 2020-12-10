
$(document).ready(function () {
  var haveroute = 0;
  var checkroute = 0;
  var GFselect = 1;
  var personselect = 0;
  var startprice = 0;
  var totalprice = 0;
  var selecthotel = 0;
  var saveRoute = "";
  var idhotel = 0;
  if (localStorage.id == 0 || localStorage.id == undefined) {
    window.location.replace("/");
  }
  if (localStorage.role == 1) {
    window.location.replace("/Admin");
  }
  $("body").toggleClass("GFselect");
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
    method: 'GET',
    url: '/Datahotel'
  }).done(function (data, state, xhr) {
    var createhotel = "";
    for (let i = 0; i < data.length; i++) {
      // alert(data[i].pic_hotel);
      var pichotelA = data[i].pic_hotel;
      var picH = pichotelA.split(',');
      for (let r = 0; r < picH.length; r++) {
        if (picH[r] == "") {
          // console.log(r);
          // alert("test");
          picH.splice(r, 1);
        }
      }

      var randomhotel = Math.floor(Math.random() * picH.length);
      // alert(picH[randomhotel]);
      createhotel += "<img src='upload/" + picH[randomhotel] + "'class='m-3 rounded shadow col-8 p-0 hotel-card' style='cursor: pointer;' id='" + data[i].hotelID + "'>";
      // for (let i = 0; i < data.length; i++) {
      // }
      $("#area-showhotel").html(createhotel);
      $(".hotel-card").click(function () {
        // alert($(this).attr('id'));
        idhotel = $(this).attr('id');
        // alert(idhotel);
        $.ajax({
          method: 'POST',
          url: '/getsomehotel',
          data: { idhotel: idhotel }
        }).done(function (data, state, xhr) {
          // console.log(data);
          selecthotel = data[0].price_per_day;
          // alert(totalprice);
          $("#Namehotel").text("โรงแรม " + data[0].name_hotel);
          $("#Pricehotel").text("ราคา " + data[0].price_per_day + " บาท");
        }).fail(function (xhr, state, err) {
          alert(err);
        })
      });

    }

    $("#btncancelhotel").click(function () {
      selecthotel = 0;
      $("#Namehotel").text("โรงแรม ");
      $("#Pricehotel").text("ราคา " + 0 + " บาท");
    });
    // var pichotelA = data.pic_hotel;
    // console.log(picplaceInR);
    // 

    // alert(picH);

  }).fail(function (xhr, state, err) {
    alert(err);
  })

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

  $.ajax({
    method: 'POST',
    url: '/getplace_Route',
    data: { Origin: localStorage.Origin, Destination: localStorage.Destination }
  }).done(function (data, state, xhr) {
    // console.log(data);
    if (data == "") {
      alert("ไม่มีข้อมูลเส้นนี้");
      haveroute = 0;
      if (checkroute == 1) {
        checkroute = 1;
        $('body').toggleClass("notifi");
      }
    } else {
      if (data[0].place_in_route == undefined || data[0].place_in_route == "") {
        // alert("เส้นทางนี้ไม่มีสถานที่เที่ยวระหว่างทาง");
        haveroute = 1;
        if (checkroute == 0) {
          checkroute = 0;
          $('body').toggleClass("notifi");
        } else {

        }
      } else {
        haveroute = 1;
        startprice = data[0].price_route;
        totalprice += data[0].price_route;
        $("#txttotalprice").text("ราคา " + totalprice + " บาท");
        var placebetweenroute = data[0].place_in_route;
        var PlaceInR = placebetweenroute.split(',');
        let htmlspawncard = "";
        // alert(PlaceInR + " " + PlaceInR[0]);
        // alert(PlaceInR[1]);
        for (let i = 0; i < PlaceInR.length; i++) {

          $.ajax({
            method: 'POST',
            url: '/getsomeplaceInRoute',
            data: { someplace: PlaceInR[i] }
          }).done(function (data, state, xhr) {
            // console.log(PlaceInR[i]);

            if (data[0] == undefined || data[0].place_in_route == "") {
              // alert("test");
            } else {
              // console.log(data[0].pic_place);
              var picplaceInR = data[0].pic_place;
              // console.log(picplaceInR);
              var picInR = picplaceInR.split(',');
              for (let r = 0; r < picInR.length; r++) {
                if (picInR[r] == "") {
                  // console.log(r);
                  // alert("test");
                  picInR.splice(r, 1);
                }
              }
              // console.log(picInR);
              let randompic = Math.floor(Math.random() * picInR.length);
              // console.log(randompic);
              // console.log(picInR);
              // console.log(picInR[randompic]);
              htmlspawncard += "<div class='card col-4 p-0 m-5 shadow rounded' style='height: auto;'><img class='card-img-top' src='upload/" + picInR[randompic] + "'><h4 class='card-title'>" + data[0].name_place + "</h4><p class='card-text'>" + data[0].info_place + "</p><label for=''>เลือก</label><div class='form-check m-auto p-0'><input class='m-auto' type='checkbox' value='" + data[0].placeID + "' name='place_inR' style='height: 2rem; width: 2rem;'></div></div>";
              // console.log(randompic);


            }
            //  alert(data[0].pic_place);
            $("#spawn-place-area").html(htmlspawncard);
            $(".card").click(function () {
              var checkplace = $("input[name='place_inR']:checked");
              // console.log(checkplace);
              totalprice = 0;
              totalprice = startprice;
              $("#txttotalprice").text("ราคา " + totalprice + " บาท");
              var placeR = "";
              for (let i = 0; i < checkplace.length; i++) {
                placeR += checkplace[i].value + ",";
              }
              let pricecard = placeR.split(',');
              for (let r = 0; r < pricecard.length; r++) {
                if (pricecard[r] == "") {
                  // console.log(r);
                  // alert("test");
                  pricecard.splice(r, 1);
                }
              }
              saveRoute = pricecard;
              for (let i = 0; i < pricecard.length; i++) {
                $.ajax({
                  method: 'POST',
                  url: '/getsomeplaceInRoute',
                  data: { someplace: pricecard[i] }
                }).done(function (data, state, xhr) {
                  // alert(data[0].carID);
                  totalprice += data[0].price_place;
                  // alert($("#amountperson").val());
                  $("#txttotalprice").text("ราคา " + totalprice + " บาท");
                }).fail(function (xhr, state, err) {
                  alert(err);
                })
              }
              // alert(pricecard[0]);
            });
          }).fail(function (xhr, state, err) {
            alert(err);
          })
        }
        console.log(htmlspawncard);
      }
    }

  }).fail(function (xhr, state, err) {
    alert(err);
  });

  $("#pinOrigin").change(function () {
    totalprice = 0;
    // alert("test");
    // alert($(this).children(":selected").attr("value"))
    var valplace1 = $("#pinOrigin").children(":selected").attr("value");
    var valplace2 = $("#pinDestination").children(":selected").attr("value");
    // $("#Route_Destination[value='"+ valplace +"']").remove();
    // alert(valplace1 + " " + valplace2);
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
    } else {
      $.ajax({
        method: 'POST',
        url: '/getplace_Route',
        data: { Origin: valplace1, Destination: valplace2 }
      }).done(function (data, state, xhr) {
        // alert(data[0].place_in_route);
        // alert(data);
        if (data == "") {
          alert("ไม่มีข้อมูลเส้นนี้");
          haveroute = 0;
          $(".card").remove();
          if (checkroute == 1) {
            checkroute = 1;
            $('body').toggleClass("notifi");
          }
        } else {
          if (data[0].place_in_route == undefined || data[0].place_in_route == "") {
            // alert("เส้นทางนี้ไม่มีสถานที่เที่ยวระหว่างทาง");
            haveroute = 1;
            if (checkroute == 0) {
              checkroute = 0;
              $('body').toggleClass("notifi");
            } else {

            }
          } else {
            haveroute = 1;
            startprice = data[0].price_route;
            totalprice += data[0].price_route;
            $("#txttotalprice").text("ราคา " + totalprice + " บาท");
            var placebetweenroute = data[0].place_in_route;
            var PlaceInR = placebetweenroute.split(',');
            let htmlspawncard = "";
            // alert(PlaceInR + " " + PlaceInR[0]);
            // alert(PlaceInR[1]);
            for (let i = 0; i < PlaceInR.length; i++) {

              $.ajax({
                method: 'POST',
                url: '/getsomeplaceInRoute',
                data: { someplace: PlaceInR[i] }
              }).done(function (data, state, xhr) {
                // console.log(PlaceInR[i]);

                if (data[0] == undefined) {
                  // alert("test");
                } else {
                  // console.log(data[0].pic_place);
                  var picplaceInR = data[0].pic_place;
                  // console.log(picplaceInR);
                  var picInR = picplaceInR.split(',');
                  for (let r = 0; r < picInR.length; r++) {
                    if (picInR[r] == "") {
                      // console.log(r);
                      // alert("test");
                      picInR.splice(r, 1);
                    }
                  }
                  // console.log(picInR);
                  let randompic = Math.floor(Math.random() * picInR.length);
                  // console.log(randompic);
                  // console.log(picInR);
                  // console.log(picInR[randompic]);
                  htmlspawncard += "<div class='card col-4 p-0 m-5 shadow rounded' style='height: auto;'><img class='card-img-top' src='upload/" + picInR[randompic] + "'><h4 class='card-title'>" + data[0].name_place + "</h4><p class='card-text'>" + data[0].info_place + "</p><label for=''>เลือก</label><div class='form-check m-auto p-0'><input class='m-auto' type='checkbox' value='" + data[0].placeID + "' name='place_inR' style='height: 2rem; width: 2rem;'></div></div>";
                  // console.log(randompic);


                }
                //  alert(data[0].pic_place);
                $("#spawn-place-area").html(htmlspawncard);
                $(".card").click(function () {
                  var checkplace = $("input[name='place_inR']:checked");
                  totalprice = 0;
                  totalprice = startprice;
                  $("#txttotalprice").text("ราคา " + totalprice + " บาท");
                  var placeR = "";
                  for (let i = 0; i < checkplace.length; i++) {
                    placeR += checkplace[i].value + ",";
                  }
                  let pricecard = placeR.split(',');
                  for (let r = 0; r < pricecard.length; r++) {
                    if (pricecard[r] == "") {
                      // console.log(r);
                      // alert("test");
                      pricecard.splice(r, 1);
                    }
                  }
                  saveRoute = pricecard;
                  for (let i = 0; i < pricecard.length; i++) {
                    $.ajax({
                      method: 'POST',
                      url: '/getsomeplaceInRoute',
                      data: { someplace: pricecard[i] }
                    }).done(function (data, state, xhr) {
                      // alert(data[0].carID);
                      totalprice += data[0].price_place;
                      $("#txttotalprice").text("ราคา " + totalprice + " บาท");
                    }).fail(function (xhr, state, err) {
                      alert(err);
                    })
                  }
                  // alert(pricecard[0]);
                });
              }).fail(function (xhr, state, err) {
                alert(err);
              })
            }
            console.log(htmlspawncard);
          }
        }
      }).fail(function (xhr, state, err) {
        alert(err);
      });
    }

  });

  $("#pinDestination").change(function () {
    // alert("test");
    // alert($(this).children(":selected").attr("value"))
    totalprice = 0;
    var valplace1 = $("#pinOrigin").children(":selected").attr("value");
    var valplace2 = $("#pinDestination").children(":selected").attr("value");
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
    } else {
      $.ajax({
        method: 'POST',
        url: '/getplace_Route',
        data: { Origin: valplace1, Destination: valplace2 }
      }).done(function (data, state, xhr) {
        // alert(data[0].place_in_route);
        // alert(data);
        if (data == "") {
          haveroute = 0;
          alert("ไม่มีข้อมูลเส้นนี้");
          $(".card").remove();
          if (checkroute == 1) {
            checkroute = 1;
            $('body').toggleClass("notifi");
          }
        } else {
          if (data[0].place_in_route == undefined || data[0].place_in_route == "") {
            // alert("เส้นทางนี้ไม่มีสถานที่เที่ยวระหว่างทาง");
            haveroute = 1;
            if (checkroute == 0) {
              checkroute = 0;
              $('body').toggleClass("notifi");
            } else {

            }
          } else {
            haveroute = 1;
            startprice = data[0].price_route;
            totalprice += data[0].price_route;
            $("#txttotalprice").text("ราคา " + totalprice + " บาท");
            var placebetweenroute = data[0].place_in_route;
            var PlaceInR = placebetweenroute.split(',');
            let htmlspawncard = "";
            // alert(PlaceInR + " " + PlaceInR[0]);
            // alert(PlaceInR[1]);
            for (let i = 0; i < PlaceInR.length; i++) {

              $.ajax({
                method: 'POST',
                url: '/getsomeplaceInRoute',
                data: { someplace: PlaceInR[i] }
              }).done(function (data, state, xhr) {
                // console.log(PlaceInR[i]);

                if (data[0] == undefined) {
                  // alert("test");
                } else {
                  // console.log(data[0].pic_place);
                  var picplaceInR = data[0].pic_place;
                  // console.log(picplaceInR);
                  var picInR = picplaceInR.split(',');
                  for (let r = 0; r < picInR.length; r++) {
                    if (picInR[r] == "") {
                      // console.log(r);
                      // alert("test");
                      picInR.splice(r, 1);
                    }
                  }
                  // console.log(picInR);
                  let randompic = Math.floor(Math.random() * picInR.length);
                  // console.log(randompic);
                  // console.log(picInR);
                  // console.log(picInR[randompic]);
                  htmlspawncard += "<div class='card col-md-4 col-12 p-0 m-5 shadow rounded' style='height: auto;'><img class='card-img-top' src='upload/" + picInR[randompic] + "'><h4 class='card-title'>" + data[0].name_place + "</h4><p class='card-text'>" + data[0].info_place + "</p><label for=''>เลือก</label><div class='form-check m-auto p-0'><input class='m-auto' type='checkbox' value='" + data[0].placeID + "' name='place_inR' style='height: 2rem; width: 2rem;'></div></div>";
                  // console.log(randompic);
                  

                }
                //  alert(data[0].pic_place);
                $("#spawn-place-area").html(htmlspawncard);
                $(".card").click(function () {
                  var checkplace = $("input[name='place_inR']:checked");
                  totalprice = 0;
                  totalprice = startprice;
                  $("#txttotalprice").text("ราคา " + totalprice + " บาท");
                  var placeR = "";
                  for (let i = 0; i < checkplace.length; i++) {
                    placeR += checkplace[i].value + ",";
                  }
                  let pricecard = placeR.split(',');
                  for (let r = 0; r < pricecard.length; r++) {
                    if (pricecard[r] == "") {
                      // console.log(r);
                      // alert("test");
                      pricecard.splice(r, 1);
                    }
                  }
                  saveRoute = pricecard;
                  for (let i = 0; i < pricecard.length; i++) {
                    $.ajax({
                      method: 'POST',
                      url: '/getsomeplaceInRoute',
                      data: { someplace: pricecard[i] }
                    }).done(function (data, state, xhr) {
                      // alert(data[0].carID);
                      totalprice += data[0].price_place;
                      $("#txttotalprice").text("ราคา " + totalprice + " บาท");
                    }).fail(function (xhr, state, err) {
                      alert(err);
                    })
                  }
                  // alert(pricecard[0]);
                });
              }).fail(function (xhr, state, err) {
                alert(err);
              })
            }
            console.log(htmlspawncard);
          }
        }
      }).fail(function (xhr, state, err) {
        alert(err);
      });
    }
  });

  $("#TypeTravel").change(function () {

    let Typetravel = $("#TypeTravel").val();
    // alert(Typetravel);
    if (Typetravel == "person") {
      if (GFselect == 1) {

      } else if (GFselect != 1) {
        GFselect = 1;
        $("body").toggleClass("GFselect");
      }
      if (personselect == 1) {
        personselect = 0;
        $("body").toggleClass("personselect");

      }

    } else if (Typetravel == "friend" || Typetravel == "family") {
      if (personselect == 1) {

      } else if (personselect != 1) {
        personselect = 1
        $("body").toggleClass("personselect");
      }

      if (GFselect == 1) {
        GFselect = 0
        $("body").toggleClass("GFselect");
      }

    }
  });

  $("#btncomfirmplan").click(function () {
    // alert(totalprice+" "+selecthotel);
    let txtbudget = $("#txtbudget").val();
    let TypeTravel = $("#TypeTravel").val();
    let date = $("#date").val();
    let checktotalpeople = $("#amountperson").val();
    let getweather = $("#weather").val();
    let RangeAge = $("#selectRangeAge").val();

    if (haveroute == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Not have this route!',
        text: 'Please select another route'
      })
    } else {
      if (txtbudget == "") {
        Swal.fire({
          icon: 'info',
          title: 'Please tell your budget!'
        })
      } else {
        if (TypeTravel == "person") {
          let amountallprice = totalprice + selecthotel;
          if (amountallprice > txtbudget) {
            Swal.fire({
              icon: 'error',
              title: 'Total price is more than budget!',
              text: 'Try to manage your total price!'
            })
          } else {

            if (date == "") {
              Swal.fire({
                icon: 'info',
                title: 'Please select your date!',
              })
            } else {
              // alert("test");
              // alert(saveRoute);
              localStorage.budget = txtbudget;
              localStorage.TypeTravel = TypeTravel;
              localStorage.date = date;
              localStorage.getweather = getweather;
              localStorage.RangeAge = RangeAge;
              localStorage.saveRoute = saveRoute;
              localStorage.idhotel = idhotel;
              window.location.href = "/Detailplan";
            }
          }
        } else if (TypeTravel == "friend" || TypeTravel == "family") {
          if (checktotalpeople == "") {
            Swal.fire({
              icon: 'info',
              title: 'Please tell your number of your friend or family!'
            })
          } else {
            let amountallprice = checktotalpeople * (totalprice + selecthotel);
            if (amountallprice > txtbudget) {
              Swal.fire({
                icon: 'error',
                title: 'Total price is more than budget!',
                text: 'Try to manage your total price!'
              })
            } else {
              if (date == "") {
                Swal.fire({
                  icon: 'info',
                  title: 'Please select your date!',
                })
              } else {
                // alert("test");
                localStorage.budget = txtbudget;
                localStorage.TypeTravel = TypeTravel;
                localStorage.date = date;
                localStorage.getweather = getweather;
                localStorage.RangeAge = RangeAge;
                localStorage.saveRoute = saveRoute;
                localStorage.idhotel = idhotel;
                window.location.href = "/Detailplan";
              }
            }
          }
        }
      }
    }
  });

  $("#weather").change(function () {
    // alert("test");
    let checkweather = $("#weather").val();
    // alert(checkweather);
    if (checkweather == "winter") {
      $("#txtweather").text("ฤดูที่ต้องการเที่ยว : ฤดูหนาว");
    } else if (checkweather == "summer") {
      $("#txtweather").text("ฤดูที่ต้องการเที่ยว : ฤดูร้อน");
    } else if (checkweather == "Rainly") {
      $("#txtweather").text("ฤดูที่ต้องการเที่ยว : ฤดูหนาว");
    }
  });



  $("#logout").click(function () {
    localStorage.id = 0;
    // alert("test");
    window.location.replace("/");
  });

})



