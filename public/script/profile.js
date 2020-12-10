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


    $.ajax({
        method: 'POST',
        url: '/getuser',
        data: { user_ID: localStorage.id }
    }).done(function (data, state, xhr) {
        // console.log(data);
        $.ajax({
            method: 'POST',
            url: '/Dataplan',
            data: { iduser: localStorage.id }
        }).done(function (data, state, xhr) {
            // console.log(data);
            for (let io = 0; io < data.length; io++) {
                let planid = data[io].planID
                if (data[io].status == 0) {
                    var amountplan0 = 0;
                    for (let s = 0; s < data.length; s++) {
                        if (data[s].status == 0) {
                            amountplan0++;
                        }
                    }
                    console.log(amountplan0);
                    let create = "";
                    for (let i = 0; i < amountplan0; i++) {
                        var picplaceInR = data[i].route;
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
                            // console.log(data);
                            let picplaceInR = data[i].pic_place;
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

                            // console.log(data[0].planID);
                            create += "<div class='card col-12 mx-auto p-0 shadow rounded'><div class='row no-gutters'><div class='col-sm-5 col-xs-12'><img src='upload/" + picInR[randompic] + "' class='card-img-top'></div><div class='col-sm-6 col-xs-12 text-center m-auto'><button class='btn btn-danger m-3 ' id='" + planid + "'>ยกเลิก</button><button class='btn btn-secondary m-3'>ดูรายละเอียด</button><button class='btn btn-success m-3' id='" + planid + "'>เสร็จสิ้น</button><button class='btn btn-warning m-3' id='" + planid + "'>แชร์</button></div></div>";
                            $(".Acitve-now").html(create);
                            $(".btn-secondary").click(function () {
                                $("#modelDetailplan").modal("show");
                            });
                            $(".btn-danger").click(function () {
                                let btnidplan = $(this).attr('id');
                                // alert(test);
                                $.ajax({
                                    method: 'POST',
                                    url: '/Deleteplan',
                                    data: { planid: btnidplan }
                                }).done(function (data, state, xhr) {
                                    window.location.reload();
                                }).fail(function (xhr, state, err) {
                                    alert(xhr.responeText);
                                });
                            });
                            $(".btn-warning").click(function () {
                                // alert($(this).attr('id'));
                                let btnidplan = $(this).attr('id');
                                $.ajax({
                                    method: 'POST',
                                    url: '/updateplanstatusshare',
                                    data: { planid: btnidplan }
                                }).done(function (data, state, xhr) {
                                    window.location.reload();
                                }).fail(function (xhr, state, err) {
                                    alert(xhr.responeText);
                                })
                            })
                            $(".btn-success").click(function () {
                                // alert($(this).attr('id'));
                                let btnidplan = $(this).attr('id');
                                $.ajax({
                                    method: 'POST',
                                    url: '/updateplanstatus',
                                    data: { planid: btnidplan }
                                }).done(function (data, state, xhr) {
                                    window.location.reload();
                                }).fail(function (xhr, state, err) {
                                    alert(err);
                                })
                            });

                        }).fail(function (xhr, state, err) {
                            alert(err);
                        })
                        // console.log(create);

                        // console.log(randompic);

                    }

                } if (data[io].status == 1) {
                    var amountplan1 = 0;
                    for (let s = 0; s < data.length; s++) {
                        if (data[s].status == 1) {
                            amountplan1++;
                        }
                    }
                    // console.log(amountplan1);
                    let create = "";
                    for (let i = 0; i < amountplan1; i++) {
                        var picplaceInR = data[i].route;
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

                            // console.log(data[0].planID);
                            create += "<div class='card col-12 mx-auto p-0 shadow rounded my-3'><div class='row no-gutters'><div class='col-sm-5 col-xs-12'><img src='upload/" + picInR[randompic] + "' class='card-img-top'></div><div class='col-sm-4 col-xs-12'><div class='card-body'><h5 class='card-title text-dark'>เที่ยว " + lengthroute + " ที่</h5><p class='card-text'>" + data[0].info_place + "</p></div></div><div class='col-sm-3 col-xs-12 text-center my-auto'><button class='btn btn-secondary my-3'>ดูรายละเอียด</button></div></div></div>";
                            $(".history-activity").html(create);
                            $(".btn-secondary").click(function () {
                                $("#modelDetailplan").modal("show");
                            });

                        }).fail(function (xhr, state, err) {
                            alert(err);
                        })
                        // console.log(create);

                        // console.log(randompic);

                    }
                }
            }
        }).fail(function (xhr, state, err) {
            alert(err);
        });
        $("#txtusername").text(data[0].user_name);
        $("#txtemail").text(data[0].user_Email);

    }).fail(function (xhr, state, err) {
        alert(err);
    });

    $("#btnEditpass").click(function () {
        const newpass = $("#newpassword").val();
        const confirmp = $("#comfirmpass").val();

        if (newpass == confirmp) {
            $.ajax({
                method: 'POST',
                url: '/updateuser',
                data: { iduser: localStorage.id, passwordnew: confirmp }
            }).done(function (data, state, xhr) {
                alert(data)
            }).fail(function (xhr, state, err) {
                alert(err);
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'New confirm password do not match with new password!',
                text: 'Try again!'
            })
        }
    });

    $("#btnChange-password").click(function () {
        $("#modelChange-password").modal("show");
    });

    $("#logout").click(function () {
        localStorage.id = 0;
        window.location.replace("/");
    });

});