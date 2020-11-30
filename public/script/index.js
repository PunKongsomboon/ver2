


//card
// $().ready(function () {
//     $('[rel="tooltip"]').tooltip();
// });

function rotateCard(btn) {
    var $card = $(btn).closest('.card-container');
    console.log($card);
    if ($card.hasClass('hover')) {
        $card.removeClass('hover');
    } else {
        $card.addClass('hover');
    }
}


// let showprofile = document.querySelector('#openProfile');
// let loginWrapper = document.querySelector('.login-wrapper');

// showprofile.addEventListener('click', function(){
//     pro +=1;
//     alert(pro);
//     loginWrapper.classList.toggle('open');
// });


// hide card area and modal sign in
$(document).ready(function () {
    // alert(localStorage.id);
    if (localStorage.id == undefined || localStorage.id == 0) {

    } else {
        $("body").toggleClass("signupsuccess");
        $("body").toggleClass("openlogout");
        $("body").toggleClass("closelogin");
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
    // var check = 0;
    $("body").toggleClass("visibilitybtn");
    $('.btn').removeClass("active");
    $("#btnslide").click(function () {
        $("body").toggleClass("open");
    });

    $('#btnSignin').click(function () {
        // alert("test");
        let username = $("#txtUserlogin").val();
        let password = $("#txtPasslogin").val();
        if ($("#checkbox").is(':checked')) {
            // alert("Remember me");

        }
        $.ajax({
            method: 'POST',
            url: '/SignIn',
            data: { username: username, password: password }
        }).done(function (data, state, xhr) {
            // alert(data);
            localStorage.id = data[0].user_ID;
            // alert(data[0].user_Role);
            if (data[0].user_Role == 1) {
                window.location.replace("/Admin");
            } else {
                $("#txtUserlogin").val("");
                $("#txtPasslogin").val("");
                $("body").toggleClass("signupsuccess");
                $("body").toggleClass("openlogout");
                $("body").toggleClass("closelogin");
                $('#ModalSignin').modal('hide');
            }
        }).fail(function (xhr, state) {
            $("#txtUserlogin").val("");
            $("#txtPasslogin").val("");
            alert("Usernmae or password wrong");
        });

    });

    $("#btnSignin").click(function () {
        // alert("test");
        $('body').toggleClass("openProfile");
        $('#ModalSignin').modal('show');
    });


    $("#formSignUp").submit(function (e) {
        e.preventDefault();
        const signup_email = $("#txtSignup_email").val();
        const signup_username = $("#txtSignup_username").val();
        const signup_password = $("#txtSignup_password").val();
        
        if (signup_email != "" && signup_username != "") {
            if (signup_password != "") {
                // alert(signup_email+" "+signup_username+" "+signup_password);
                $.ajax({
                    method: 'POST',
                    url: '/SignUp',
                    data: { username: signup_username, password: signup_password, email: signup_email, role: 2 }
                }).done(function (data, state, xhr) {
                    // alert(data);
                    $.ajax({
                        method: 'POST',
                        url: '/SignIn',
                        data: { username: signup_username, password: signup_password }
                    }).done(function (data, state, xhr) {
                        // alert(data);
                        localStorage.id = data[0].user_ID;
                        // alert(data[0].user_Role);
                        $("#txtSignup_email").val("");
                        $("#txtSignup_username").val(""); 
                        $("#txtSignup_password").val("");
                        $("body").toggleClass("signupsuccess");
                        $("body").toggleClass("openlogout");
                        $("body").toggleClass("closelogin");
                        $('#ModalSignin').modal('hide');
                        
                    }).fail(function (xhr, state) {
                        $("#txtUserlogin").val("");
                        $("#txtPasslogin").val("");
                        alert("Usernmae or password wrong");
                    });


                }).fail(function (xhr, state) {
                    alert(xhr.responeText);
                });
            }
        }
    });

    // $('#btnSignup').click(function () {
    //     // alert("ok");
    //     

    // });

    $("#logout").click(function () {
        localStorage.id = 0;
        $("body").toggleClass("signupsuccess");
        $("body").toggleClass("openlogout");
        $("body").toggleClass("closelogin");
        // check = 0;
    });

    $("#pin").click(function () {

        // if (check == 1) {
        //     $("#pin").attr("data-toggle", "");
        //     $("#pin").attr("data-target", "");
        //     $("#pin").attr("href", "/Filter");
        // } else {
        //     $("#pin").attr("href", "#");
        //     $("#pin").attr("data-toggle", "modal");
        //     $("#pin").attr("data-target", "#ModalSignin");
        // }
    });

    $(function () {
        $(".btn").click(function () {
            $(".form-signin").toggleClass("form-signin-left");
            $(".form-signup").toggleClass("form-signup-left");
            $(".frame").toggleClass("frame-long");
            $(".signup-inactive").toggleClass("signup-active");
            $(".signin-active").toggleClass("signin-inactive");
            $(".forgot").toggleClass("forgot-left");
            $(this).removeClass("idle").addClass("active");
        });
    });
});



// animation in modal








