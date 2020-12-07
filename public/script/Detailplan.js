$(document).ready(function () {

  if (localStorage.id == 0 || localStorage.id == undefined) {
    window.location.replace("/");
  }
  if (localStorage.role == 1) {
    window.location.replace("/Admin");
  }
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

  $("#btnCreateplan").click(function () {
    Swal.fire({
      title: 'Do you sure to save this plan?',
      icon: 'info',
      showCancelButton: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Check your plan in your profile!',
          icon: 'success',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // alert(localStorage.saveRoute)
            // alert(localStorage.idhotel)
            // alert(localStorage.id);
            // alert(localStorage.Origin);
            // alert(localStorage.Destination);
            let route = localStorage.Origin + "," + localStorage.saveRoute + "," + localStorage.Destination;
            // alert(route);
            $.ajax({
              method: 'POST',
              url: '/Addplan',
              data: { hotelID: localStorage.idhotel, user_ID: localStorage.id, route: route }
            }).done(function (data, state, xhr) {
              window.location.replace("/profile");
            }).fail(function (xhr, state, err) {
              alert(err);
            })

          }
        });
      }
    })
  });



  $("#btnBacktoViewplan").click(function () {
    window.location.replace("/Filter");
  });

  $("#logout").click(function () {
    localStorage.id = 0;
    window.location.replace("/");
  });


});
