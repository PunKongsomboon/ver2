$(document).ready(function () {

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

    $(".btn-secondary").click(function () {
        $("#modelDetailplan").modal("show");
    });

    $("#btnChange-password").click(function () {
        $("#modelChange-password").modal("show");
    });

});