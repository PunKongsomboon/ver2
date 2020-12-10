


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
        if (localStorage.role == 1) {
            window.location.replace("/Admin");
        } else {
            $("body").toggleClass("signupsuccess");
            $("body").toggleClass("openlogout");
            $("body").toggleClass("closelogin");
        }
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
        $("#dropdownselectOrigin").html(createOption);
        $("#dropdownselectDestination").html(createOption);
        // $("#EditTypeplace").html(createOption);
    }).fail(function (xhr, state) {
        alert(xhr.responeText);
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
                localStorage.id = data[0].user_ID;
                localStorage.role = data[0].user_Role;
                window.location.replace("/Admin");
            } else {
                $("#txtUserlogin").val("");
                $("#txtPasslogin").val("");
                $("body").toggleClass("signupsuccess");
                $("body").toggleClass("openlogout");
                $("body").toggleClass("closelogin");
                $('#ModalSignin').modal('hide');
            }
        }).fail(function (xhr, state, err) {
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
                        Swal.fire({
                            title: 'Sign Up successfully!',
                            icon: 'success',
                        })
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

        if (localStorage.id != 0) {
            $("#pin").attr("data-toggle", "");
            $("#pin").attr("data-target", "");
            let selectOrigin = $("#dropdownselectOrigin").val();
            let selectDestination = $("#dropdownselectDestination").val();
            localStorage.Origin = selectOrigin;
            localStorage.Destination = selectDestination;
            // alert(selectDestination+" "+selectOrigin);
            if (selectOrigin == selectDestination) {
                alert("Please do not select Origin and destination in the same value!");
            } else {
                // alert(localStorage.id);
                window.location.href = "/Filter";
            }
            // $("#pin").attr("href", "/Filter");
        } else {
            // $("#pin").attr("href", "#");
            $("#pin").attr("data-toggle", "modal");
            $("#pin").attr("data-target", "#ModalSignin");
        }
    });

    $("#dropdownselectOrigin").change(function () {
        // alert("test");
        // alert($(this).children(":selected").attr("value"))
        let valplace1 = $("#dropdownselectOrigin").children(":selected").attr("value");
        let valplace2 = $("#dropdownselectDestination").children(":selected").attr("value");
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
                $("#dropdownselectDestination").html(createOption);
            }).fail(function (xhr, state) {
                alert(xhr.responeText);
            })
        }
    });

    $("#dropdownselectDestination").change(function () {
        // alert("test");
        // alert($(this).children(":selected").attr("value"))
        let valplace1 = $("#dropdownselectOrigin").children(":selected").attr("value");
        let valplace2 = $("#dropdownselectDestination").children(":selected").attr("value");
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
                $("#dropdownselectOrigin").html(createOption);
            }).fail(function (xhr, state) {
                alert(xhr.responeText);
            })
        }
    });

    $.ajax({
        method: 'GET',
        url: '/shareplan'
    }).done(function (data1, state, xhr) {
        console.log(data1);
        let create = "";
        for (let i = 0; i < data1.length; i++) {
            // console.log(data[i].status_share);
            if (data1[i].status_share == 0) {

            } else if (data1[i].status_share == 1) {
                var picplaceInR = data1[i].route;
                // console.log(picplaceInR);
                var picInR = picplaceInR.split(',');
                let lengthroute = picInR.length;
                for (let r = 0; r < picInR.length; r++) {
                    if (picInR[r] == "") {
                        // console.log(r);
                        // alert("test");
                        picInR.splice(r, 1);
                    }
                }
                console.log(picInR);
                let randompic = Math.floor(Math.random() * picInR.length);
                console.log(randompic);
                $.ajax({
                    method: 'POST',
                    url: '/someplace',
                    data: { idplace: picInR[randompic] }
                }).done(function (data, state, xhr) {
                    // console.log(data);
                    let picplaceInR = data[0].pic_place;
                    // console.log(picplaceInR);
                    let picInR = picplaceInR.split(',');
                    for (let r = 0; r < picInR.length; r++) {
                        if (picInR[r] == "") {
                            // console.log(r);
                            // alert("test");
                            picInR.splice(r, 1);
                        }
                    }
                    // console.log(picInR);
                    let randompic = Math.floor(Math.random() * picInR.length);
                    // console.log(data1[i].planID);
                    create += "<div class='col-11 my-3'><div class='col-12 mx-auto p-0 shadow rounded'><div class='row no-gutters'><div class='col-sm-5 col-xs-12'><img src='upload/" + picInR[randompic] + "' class='card-img-top'></div><div class='col-sm-7'><div class='col-sm-12'><div class='card-body'><h5 class='card-title'>เที่ยว "+ lengthroute +" ที่</h5><p class='card-text'>"+ data[0].info_place +"</p></div></div><div class='col-sm-12 text-right'><button class='btn btn-outline-secondary my-3'>ดูรายละเอียด</button><button class='btn btn-outline-success my-3 btnselectplan' id='" + data1[i].planID + "'>เลือก</button></div></div></div></div></div>";
                    // console.log(create);
                    $("#area-share").html(create);
                    $(".btnselectplan").click(function () {
                        if (localStorage.id != 0) {
                            $("#pin").attr("data-toggle", "");
                            $("#pin").attr("data-target", "");
                            let idbtn = $(this).attr("id");
                            // alert(idbtn);
                            $.ajax({
                                method: 'POST',
                                url: '/updatecountplan',
                                data: { idplan: idbtn, iduser: localStorage.id }
                            }).done(function (data, state, xhr) {
                                window.location.replace("/Profile");
                            }).fail(function (xhr, state, err) {
                                alert(xhr.responeText);
                            });
                            // $("#pin").attr("href", "/Filter");
                        } else {
                            // $("#pin").attr("href", "#");
                            $("#pin").attr("data-toggle", "modal");
                            $("#pin").attr("data-target", "#ModalSignin");
                        }
                        // alert($(this).attr("id"));
                    });


                }).fail(function (xhr, state, err) {
                    alert(err);
                })
            }
        }
    }).fail(function (xhr, state, err) {
        alert(err);
    })

    $.ajax({
        method: 'GET',
        url: '/popularplan'
    }).done(function (data2, state, xhr) {
        // console.log(data2);
        let create = "";
        for (let i = 0; i < data2.length; i++) {
            // console.log(data[i].status_share);
            var picplaceInR = data2[i].route;
            // console.log(picplaceInR);
            var picInR = picplaceInR.split(',');
            for (let r = 0; r < picInR.length; r++) {
                if (picInR[r] == "") {
                    // console.log(r);
                    // alert("test");
                    picInR.splice(r, 1);
                }
            }
            console.log(picInR);
            let randompic = Math.floor(Math.random() * picInR.length);
            console.log(randompic);
            $.ajax({
                method: 'POST',
                url: '/someplace',
                data: { idplace: picInR[randompic] }
            }).done(function (data, state, xhr) {
                // let test = data[0];
                // console.log(test);
                let picplaceInR = data[0].pic_place;
                // console.log(picplaceInR);
                let picInR = picplaceInR.split(',');
                for (let r = 0; r < picInR.length; r++) {
                    if (picInR[r] == "") {
                        // console.log(r);
                        // alert("test");
                        picInR.splice(r, 1);
                    }
                }
                // console.log(picInR);
                let randompic = Math.floor(Math.random() * picInR.length);
                // console.log(data[i].placeID);
                create += "<div class='col-lg-12 col-md-9 col-12 m-3'><div class='card-container manual-flip'><div class='card'><div class='front'><div class='cover'><img src='upload/"+ picInR[randompic] +"' /><div class='card-img-overlay p-0 d-flex align-items-end mask flex-center'><button class='btn btn-primary col-12' onclick='rotateCard(this)'>Viewinformation</button></div></div></div><div class='back align-items-end mask flex-center'><div class='content'><div class='main'><h4 class='text-center'>"+ data[0].name_place +"</h4><h4 class='text-center'>ข้อมูลสถานที่</h4><p class='text-center'>"+data[0].info_place+"</p></div></div><footer><button class='btn btn-simple' rel='tooltip' title='Flip Card'onclick='rotateCard(this)' id='hidebtn'>Back</button></footer></div></div></div></div>";
                // console.log(create);
                $("#popularP").html(create);


            }).fail(function (xhr, state, err) {
                alert(err);
            })
        }
    }).fail(function (xhr, state, err) {
        alert(err);
    })

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








