$(document).ready(function () {
    console.log(localStorage.id)
    if (localStorage.id == 0 || localStorage == undefined) {
        window.location.replace("/");
    }
    var rowID;
    var table;
    var checkEditmodecar = 0;
    var checkEditmodeplace = 0;
    var numberAddplaceinR = "";
    var numberEditplaceinR = "";
    $("#showplace").text(numberAddplaceinR);
    $("#showplace").text(numberEditplaceinR);
    $.ajax({
        method: 'GET',
        url: '/typecar',
    }).done(function (data, state, xhr) {
        let createOption = "";
        for (let i = 0; i < data.length; i++) {
            createOption += "<option value='" + data[i].TypecarID + "'>" + data[i].nameType_car + "</option>";
        }
        $("#EditTypecar").html(createOption);
        $("#AddTypecar").html(createOption);
    }).fail(function (xhr, state) {
        alert(xhr.responeText);
    });

    $.ajax({
        method: 'GET',
        url: '/typeplace',
    }).done(function (data, state, xhr) {
        let createOption = "";
        for (let i = 0; i < data.length; i++) {
            createOption += "<option value='" + data[i].TypeplaceID + "'>" + data[i].nametype_place + "</option>";
        }
        $("#AddTypeplace").html(createOption);
        $("#EditTypeplace").html(createOption);
    }).fail(function (xhr, state) {
        alert(xhr.responeText);
    });

    $.ajax({
        method: 'POST',
        url: '/DataCar',
    }).done(function (data, state, xhr) {
        let createOption = "";
        for (let i = 0; i < data.length; i++) {
            createOption += "<option value='" + data[i].carID + "'>" + ("ชื่อ " + data[i].name_car + " ความจุ " + data[i].capacity) + "</option>";
        }
        $("#Route_carid").html(createOption);
        // $("#EditTypeplace").html(createOption);
    }).fail(function (xhr, state) {
        alert(xhr.responeText);
    });

    $.ajax({
        method: 'POST',
        url: '/DataPlace',
    }).done(function (data, state, xhr) {
        let createOption = "";
        for (let i = 0; i < data.length; i++) {
            createOption += "<option value='" + data[i].placeID + "'>" + data[i].name_place + "</option>";
        }
        $("#Route_Origin").html(createOption);
        $("#Route_Destination").html(createOption);
        $("#Route_place").html(createOption);
        $("#EditRoute_place").html(createOption);
        // $("#EditTypeplace").html(createOption);
    }).fail(function (xhr, state) {
        alert(xhr.responeText);
    });



    $("#addplaceRoute").click(function () {
        let valplace = $("#Route_place").children(":selected").attr("value");
        numberAddplaceinR += valplace + ",";
        $("#showplace").text(numberAddplaceinR);
    });

    $("#EditaddplaceRoute").click(function () {
        let valplace = $("#EditRoute_place").children(":selected").attr("value");
        numberEditplaceinR += valplace + ",";
        $("#Editshowplace").text(numberEditplaceinR);
    });

    $("#clear_placeRoute").click(function () {
        numberAddplaceinR = "";
        $("#showplace").text(numberAddplaceinR);
    });

    $("#Editclear_placeRoute").click(function () {
        numberEditplaceinR = "";
        $("#Editshowplace").text(numberEditplaceinR);
    });

    $("#Route_Origin").change(function () {
        // alert("test");
        // alert($(this).children(":selected").attr("value"))
        let valplace1 = $("#Route_Origin").children(":selected").attr("value");
        let valplace2 = $("#Route_Destination").children(":selected").attr("value");
        // $("#Route_Destination[value='"+ valplace +"']").remove();
        // alert(valplace);
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
                $("#Route_Destination").html(createOption);
            }).fail(function (xhr, state) {
                alert(xhr.responeText);
            })
        }
    });

    $("#Route_Destination").change(function () {
        // alert("test");
        // alert($(this).children(":selected").attr("value"))
        let valplace1 = $("#Route_Origin").children(":selected").attr("value");
        let valplace2 = $("#Route_Destination").children(":selected").attr("value");
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
                $("#Route_Origin").html(createOption);
            }).fail(function (xhr, state) {
                alert(xhr.responeText);
            })
        }
    });

    // table.clear();
    // table = $("#myTable").dataTable().fnDestroy();
    // $('#myTable').empty();

    table = $('#myTable').DataTable({
        responsive: true,
        ajax: {
            method: 'POST',
            url: "/DataCar",
            dataSrc: function (data) {
                for (let row = 0; row < data.length; row++) {
                    if (data[row].TypecarID == 1) {
                        data[row].TypecarID = "รถประจำทาง";
                    } else {
                        data[row].TypecarID = "รถรับจ้าง";
                    }
                }
                return data;
            }
        },
        columns: [
            { data: "carID", title: "รหัส" },
            { data: "name_car", title: "ชื่อ" },
            { data: "capacity", title: "ความจุ" },
            { data: "TypecarID", title: "ประเทภรถ" },
            { title: "Action", defaultContent: "<button class='btn btn-danger btnDeletecar mr-2'>Delete</button><button class='btn btn-warning btnEditcar mr-2'>Edit</button>" }
        ]
    })

    $("#menushowplace").css("display", "none");
    $("#menushowHotel").css("display", "none");
    $("#menushowRoute").css("display", "none");
    // $("#menuTable").html("<a class='nav-link px-3' style='cursor: pointer;' id='menuallcar'>ทั้งหมด</a><a class='nav-link px-3' id='menubus' style='border-left: 1px solid #666666; cursor: pointer;'>รถประจำทาง</a><a class='nav-link px-3' id='menutaxi' style='border-left: 1px solid #666666; cursor: pointer;'>รถรับจ้าง</a>");

    // menubar 
    $("#menuallcar").click(function () {
        checkEditmodecar = 0;
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        table = $('#myTable').DataTable({
            responsive: true,
            ajax: {
                method: 'POST',
                url: "/DataCar",
                dataSrc: function (data) {
                    for (let row = 0; row < data.length; row++) {
                        if (data[row].TypecarID == 1) {
                            data[row].TypecarID = "รถประจำทาง";
                        } else {
                            data[row].TypecarID = "รถรับจ้าง";
                        }
                    }
                    return data;
                }
            },
            columns: [
                { data: "carID", title: "รหัส" },
                { data: "name_car", title: "ชื่อ" },
                { data: "capacity", title: "ความจุ" },
                { data: "TypecarID", title: "ประเทภรถ" },
                { title: "Action", defaultContent: "<button class='btn btn-danger btnDeletecar mr-2'>Delete</button><button class='btn btn-warning btnEditcar mr-2'>Edit</button>" }
            ]
        })
        $("#myTable tbody").on("click", ".btnEditcar", function () {
            const currentRow = $(this).parents("tr");
            const tableallCar = table.row(currentRow).data();
            rowID = table.row(currentRow).index();
            console.log(tableallCar.carID + " " + rowID);
            $("#EdittxtIdcar").val(tableallCar.carID);
            $("#EdittxtNamecar").val(tableallCar.name_car);
            // $("#EdittxtPricecar").val(tableallCar.price_car);
            $("#EdittxtCapacity").val(tableallCar.capacity);
            $("#modelEditcar").modal("show");
        });
        $("#myTable tbody").on("click", ".btnDeletecar", function () {
            const currentRow = $(this).parents("tr");
            let checktableCar = table.row(currentRow).data();
            rowID = table.row(currentRow).index();
            Swal.fire({
                title: "Warning",
                text: "Are you sure to delete ID " + checktableCar.carID,
                icon: "warning",
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        method: 'POST',
                        url: '/Deletecar',
                        data: { IDcar: checktableCar.carID }
                    }).done(function (data, state, xhr) {
                        table.row(rowID).remove().draw();
                        Swal.fire({
                            title: "Deleted!",
                            text: "The record has been deleted.",
                            icon: "success"
                        })
                    }).fail(function (xhr, state) {
                        Swal.fire({
                            title: "Delete error!",
                            text: "It's has something wrong.",
                            icon: "error"
                        })
                    })

                }
            });
        });
    });
    $("#menubus").click(function () {
        checkEditmodecar = 1;
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        $.ajax({
            method: 'POST',
            url: '/DataCar',
            data: { type: 1 }
        }).done(function (data, state, xhr) {
            table = $('#myTable').DataTable({
                responsive: true,
                data: data,
                columns: [
                    { data: "carID", title: "รหัส" },
                    { data: "name_car", title: "ชื่อ" },
                    { data: "capacity", title: "ความจุ" },
                    { data: "nameType_car", title: "ประเภทรถ" },
                    { title: "Action", defaultContent: "<button class='btn btn-danger btnDeletecar mr-2'>Delete</button><button class='btn btn-warning btnEditcar mr-2'>Edit</button>" }
                ]
            })
            $("#myTable tbody").on("click", ".btnEditcar", function () {
                const currentRow = $(this).parents("tr");
                const tableallCar = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                console.log(tableallCar.carID + " " + rowID);
                $("#EdittxtIdcar").val(tableallCar.carID);
                $("#EdittxtNamecar").val(tableallCar.name_car);
                // $("#EdittxtPricecar").val(tableallCar.price_car);
                $("#EdittxtCapacity").val(tableallCar.capacity);
                $("#modelEditcar").modal("show");
            });
            $("#myTable tbody").on("click", ".btnDeletecar", function () {
                const currentRow = $(this).parents("tr");
                let checktableCar = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                Swal.fire({
                    title: "Warning",
                    text: "Are you sure to delete ID " + checktableCar.carID,
                    icon: "warning",
                    showCancelButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            method: 'POST',
                            url: '/Deletecar',
                            data: { IDcar: checktableCar.carID }
                        }).done(function (data, state, xhr) {
                            table.row(rowID).remove().draw();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The record has been deleted.",
                                icon: "success"
                            })
                        }).fail(function (xhr, state) {
                            Swal.fire({
                                title: "Delete error!",
                                text: "It's has something wrong.",
                                icon: "error"
                            })
                        })

                    }
                });
            });

        }).fail(function (xhr, state) {
            alert(xhr.responeText);
        });
    });

    $("#menutaxi").click(function () {
        checkEditmodecar = 2;
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        $.ajax({
            method: 'POST',
            url: '/DataCar',
            data: { type: 2 }
        }).done(function (data, state, xhr) {
            table = $('#myTable').DataTable({
                responsive: true,
                data: data,
                columns: [
                    { data: "carID", title: "รหัส" },
                    { data: "name_car", title: "ชื่อ" },
                    { data: "capacity", title: "ความจุ" },
                    { data: "nameType_car", title: "ประเภทรถ" },
                    { title: "Action", defaultContent: "<button class='btn btn-danger btnDeletecar mr-2'>Delete</button><button class='btn btn-warning btnEditcar mr-2'>Edit</button>" }
                ]
            })
            $("#myTable tbody").on("click", ".btnEditcar", function () {
                const currentRow = $(this).parents("tr");
                const tableallCar = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                console.log(tableallCar.carID + " " + rowID);
                $("#EdittxtIdcar").val(tableallCar.carID);
                $("#EdittxtNamecar").val(tableallCar.name_car);
                // $("#EdittxtPricecar").val(tableallCar.price_car);
                $("#EdittxtCapacity").val(tableallCar.capacity);
                $("#modelEditcar").modal("show");
            });

            $("#myTable tbody").on("click", ".btnDeletecar", function () {
                const currentRow = $(this).parents("tr");
                let checktableCar = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                Swal.fire({
                    title: "Warning",
                    text: "Are you sure to delete ID " + checktableCar.carID,
                    icon: "warning",
                    showCancelButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            method: 'POST',
                            url: '/Deletecar',
                            data: { IDcar: checktableCar.carID }
                        }).done(function (data, state, xhr) {
                            table.row(rowID).remove().draw();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The record has been deleted.",
                                icon: "success"
                            })
                        }).fail(function (xhr, state) {
                            Swal.fire({
                                title: "Delete error!",
                                text: "It's has something wrong.",
                                icon: "error"
                            })
                        })

                    }
                });
            });
        }).fail(function (xhr, state) {
            alert(xhr.responeText);
        });


    });

    $("#menuallplace").click(function () {
        checkEditmodeplace = 0;
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        table = $('#myTable').DataTable({
            responsive: true,
            ajax: {
                method: 'POST',
                url: "/DataPlace",
                dataSrc: function (data) {
                    for (let row = 0; row < data.length; row++) {
                        if (data[row].typeplaceID == 1) {
                            data[row].typeplaceID = "ทั่วไป";
                        } else if (data[row].typeplaceID == 2) {
                            data[row].typeplaceID = "วัด";
                        } else if (data[row].typeplaceID == 3) {
                            data[row].typeplaceID = "สถานบันเทิง";
                        } else if (data[row].typeplaceID == 4) {
                            data[row].typeplaceID = "ที่ท่องเที่ยวธรรมชาติ";
                        }
                    }
                    return data;
                }
            },
            columns: [
                { data: "placeID", title: "รหัส" },
                { data: "name_place", title: "ชื่อสถานที่" },
                { data: "pic_place", title: "รูป" },
                { data: "info_place", title: "ข้อมูล" },
                { data: "price_place", title: "ราคาเข้าชม" },
                { data: "timeopen_place", title: "เวลาเปิด" },
                { data: "timeclose_place", title: "เวลาปิด" },
                { data: "CloseDay", title: "วันปิดทำการ" },
                { data: "typeplaceID", title: "ประเทภสถานที่" },
                { title: "Action", defaultContent: "<button class='btn btn-danger btnDeleteplace mr-2'>Delete</button><button class='btn btn-warning btnEditplace mr-2'>Edit</button>" }
            ]
        });
        $("#myTable tbody").on("click", ".btnEditplace", function () {
            const currentRow = $(this).parents("tr");
            const tableallplace = table.row(currentRow).data();
            rowID = table.row(currentRow).index();
            console.log(tableallplace.placeID + " " + rowID);
            console.log(tableallplace);
            $("#EdittxtIDplace").val(tableallplace.placeID);
            $("#EdittxtNameplace").val(tableallplace.name_place);
            $("#EdittxtInfoplace").val(tableallplace.info_place);
            $("#EditTimeOpen").val(tableallplace.timeopen_place);
            $("#EditTimeClose").val(tableallplace.timeclose_place);
            $("#EdittxtPriceplace").val(tableallplace.price_place);
            $("#modelEditplace").modal("show");
        });
        $("#myTable tbody").on("click", ".btnDeleteplace", function () {
            const currentRow = $(this).parents("tr");
            let checktableplace = table.row(currentRow).data();
            rowID = table.row(currentRow).index();
            Swal.fire({
                title: "Warning",
                text: "Are you sure to delete ID " + checktableplace.placeID,
                icon: "warning",
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        method: 'POST',
                        url: '/Deleteplace',
                        data: { placeID: checktableplace.placeID }
                    }).done(function (data, state, xhr) {
                        table.row(rowID).remove().draw();
                        Swal.fire({
                            title: "Deleted!",
                            text: "The record has been deleted.",
                            icon: "success"
                        })
                    }).fail(function (xhr, state) {
                        Swal.fire({
                            title: "Delete error!",
                            text: "It's has something wrong.",
                            icon: "error"
                        })
                    })

                }
            });
        });

    });

    $("#menunormal").click(function () {
        checkEditmodeplace = 1;
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        $.ajax({
            method: 'POST',
            url: '/DataPlace',
            data: { type: 1 }
        }).done(function (data, state, xhr) {
            table = $('#myTable').DataTable({
                responsive: true,
                data: data,
                columns: [
                    { data: "placeID", title: "รหัส" },
                    { data: "name_place", title: "ชื่อสถานที่" },
                    { data: "pic_place", title: "รูป" },
                    { data: "info_place", title: "ข้อมูล" },
                    { data: "price_place", title: "ราคาเข้าชม" },
                    { data: "timeopen_place", title: "เวลาเปิด" },
                    { data: "timeclose_place", title: "เวลาปิด" },
                    { data: "CloseDay", title: "วันปิดทำการ" },
                    { data: "nametype_place", title: "ประเทภสถานที่" },
                    { title: "Action", defaultContent: "<button class='btn btn-danger btnDeleteplace mr-2'>Delete</button><button class='btn btn-warning btnEditplace mr-2'>Edit</button>" }
                ]
            })
            $("#myTable tbody").on("click", ".btnEditplace", function () {
                const currentRow = $(this).parents("tr");
                const tableallplace = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                console.log(tableallplace.placeID + " " + rowID);
                console.log(tableallplace);
                $("#EdittxtIDplace").val(tableallplace.placeID);
                $("#EdittxtNameplace").val(tableallplace.name_place);
                $("#EdittxtInfoplace").val(tableallplace.info_place);
                $("#EditTimeOpen").val(tableallplace.timeopen_place);
                $("#EditTimeClose").val(tableallplace.timeclose_place);
                $("#EdittxtPriceplace").val(tableallplace.price_place);
                $("#modelEditplace").modal("show");
            });

            $("#myTable tbody").on("click", ".btnDeleteplace", function () {
                const currentRow = $(this).parents("tr");
                let checktableplace = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                Swal.fire({
                    title: "Warning",
                    text: "Are you sure to delete ID " + checktableplace.placeID,
                    icon: "warning",
                    showCancelButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            method: 'POST',
                            url: '/Deleteplace',
                            data: { placeID: checktableplace.placeID }
                        }).done(function (data, state, xhr) {
                            table.row(rowID).remove().draw();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The record has been deleted.",
                                icon: "success"
                            })
                        }).fail(function (xhr, state) {
                            Swal.fire({
                                title: "Delete error!",
                                text: "It's has something wrong.",
                                icon: "error"
                            })
                        })

                    }
                });
            });
        }).fail(function (xhr, state) {
            alert(xhr.responeText);
        });
    });

    $("#menutem").click(function () {
        checkEditmodeplace = 2;
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        $.ajax({
            method: 'POST',
            url: '/DataPlace',
            data: { type: 2 }
        }).done(function (data, state, xhr) {
            table = $('#myTable').DataTable({
                responsive: true,
                data: data,
                columns: [
                    { data: "placeID", title: "รหัส" },
                    { data: "name_place", title: "ชื่อสถานที่" },
                    { data: "pic_place", title: "รูป" },
                    { data: "info_place", title: "ข้อมูล" },
                    { data: "price_place", title: "ราคาเข้าชม" },
                    { data: "timeopen_place", title: "เวลาเปิด" },
                    { data: "timeclose_place", title: "เวลาปิด" },
                    { data: "CloseDay", title: "วันปิดทำการ" },
                    { data: "nametype_place", title: "ประเทภสถานที่" },
                    { title: "Action", defaultContent: "<button class='btn btn-danger btnDeleteplace mr-2'>Delete</button><button class='btn btn-warning btnEditplace mr-2'>Edit</button>" }
                ]
            })
            $("#myTable tbody").on("click", ".btnEditplace", function () {
                const currentRow = $(this).parents("tr");
                const tableallplace = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                console.log(tableallplace.placeID + " " + rowID);
                console.log(tableallplace);
                $("#EdittxtIDplace").val(tableallplace.placeID);
                $("#EdittxtNameplace").val(tableallplace.name_place);
                $("#EdittxtInfoplace").val(tableallplace.info_place);
                $("#EditTimeOpen").val(tableallplace.timeopen_place);
                $("#EditTimeClose").val(tableallplace.timeclose_place);
                $("#EdittxtPriceplace").val(tableallplace.price_place);
                $("#modelEditplace").modal("show");
            });

            $("#myTable tbody").on("click", ".btnDeleteplace", function () {
                const currentRow = $(this).parents("tr");
                let checktableplace = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                Swal.fire({
                    title: "Warning",
                    text: "Are you sure to delete ID " + checktableplace.placeID,
                    icon: "warning",
                    showCancelButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            method: 'POST',
                            url: '/Deleteplace',
                            data: { placeID: checktableplace.placeID }
                        }).done(function (data, state, xhr) {
                            table.row(rowID).remove().draw();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The record has been deleted.",
                                icon: "success"
                            })
                        }).fail(function (xhr, state) {
                            Swal.fire({
                                title: "Delete error!",
                                text: "It's has something wrong.",
                                icon: "error"
                            })
                        })

                    }
                });
            });
        }).fail(function (xhr, state) {
            alert(xhr.responeText);
        });

    });

    $("#menuen").click(function () {
        checkEditmodeplace = 3;
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        $.ajax({
            method: 'POST',
            url: '/DataPlace',
            data: { type: 3 }
        }).done(function (data, state, xhr) {
            table = $('#myTable').DataTable({
                responsive: true,
                data: data,
                columns: [
                    { data: "placeID", title: "รหัส" },
                    { data: "name_place", title: "ชื่อสถานที่" },
                    { data: "pic_place", title: "รูป" },
                    { data: "info_place", title: "ข้อมูล" },
                    { data: "price_place", title: "ราคาเข้าชม" },
                    { data: "timeopen_place", title: "เวลาเปิด" },
                    { data: "timeclose_place", title: "เวลาปิด" },
                    { data: "CloseDay", title: "วันปิดทำการ" },
                    { data: "nametype_place", title: "ประเทภสถานที่" },
                    { title: "Action", defaultContent: "<button class='btn btn-danger btnDeleteplace mr-2'>Delete</button><button class='btn btn-warning btnEditplace mr-2'>Edit</button>" }
                ]
            })
            $("#myTable tbody").on("click", ".btnEditplace", function () {
                const currentRow = $(this).parents("tr");
                const tableallplace = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                console.log(tableallplace.placeID + " " + rowID);
                console.log(tableallplace);
                $("#EdittxtIDplace").val(tableallplace.placeID);
                $("#EdittxtNameplace").val(tableallplace.name_place);
                $("#EdittxtInfoplace").val(tableallplace.info_place);
                $("#EditTimeOpen").val(tableallplace.timeopen_place);
                $("#EditTimeClose").val(tableallplace.timeclose_place);
                $("#EdittxtPriceplace").val(tableallplace.price_place);
                $("#modelEditplace").modal("show");
            });

            $("#myTable tbody").on("click", ".btnDeleteplace", function () {
                const currentRow = $(this).parents("tr");
                let checktableplace = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                Swal.fire({
                    title: "Warning",
                    text: "Are you sure to delete ID " + checktableplace.placeID,
                    icon: "warning",
                    showCancelButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            method: 'POST',
                            url: '/Deleteplace',
                            data: { placeID: checktableplace.placeID }
                        }).done(function (data, state, xhr) {
                            table.row(rowID).remove().draw();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The record has been deleted.",
                                icon: "success"
                            })
                        }).fail(function (xhr, state) {
                            Swal.fire({
                                title: "Delete error!",
                                text: "It's has something wrong.",
                                icon: "error"
                            })
                        })

                    }
                });
            });
        }).fail(function (xhr, state) {
            alert(xhr.responeText);
        });
    });

    $("#menunat").click(function () {
        checkEditmodeplace = 4;
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        $.ajax({
            method: 'POST',
            url: '/DataPlace',
            data: { type: 4 }
        }).done(function (data, state, xhr) {
            table = $('#myTable').DataTable({
                responsive: true,
                data: data,
                columns: [
                    { data: "placeID", title: "รหัส" },
                    { data: "name_place", title: "ชื่อสถานที่" },
                    { data: "pic_place", title: "รูป" },
                    { data: "info_place", title: "ข้อมูล" },
                    { data: "price_place", title: "ราคาเข้าชม" },
                    { data: "timeopen_place", title: "เวลาเปิด" },
                    { data: "timeclose_place", title: "เวลาปิด" },
                    { data: "CloseDay", title: "วันปิดทำการ" },
                    { data: "nametype_place", title: "ประเทภสถานที่" },
                    { title: "Action", defaultContent: "<button class='btn btn-danger btnDeleteplace mr-2'>Delete</button><button class='btn btn-warning btnEditplace mr-2'>Edit</button>" }
                ]
            })
            $("#myTable tbody").on("click", ".btnEditplace", function () {
                const currentRow = $(this).parents("tr");
                const tableallplace = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                console.log(tableallplace.placeID + " " + rowID);
                console.log(tableallplace);
                $("#EdittxtIDplace").val(tableallplace.placeID);
                $("#EdittxtNameplace").val(tableallplace.name_place);
                $("#EdittxtInfoplace").val(tableallplace.info_place);
                $("#EditTimeOpen").val(tableallplace.timeopen_place);
                $("#EditTimeClose").val(tableallplace.timeclose_place);
                $("#EdittxtPriceplace").val(tableallplace.price_place);
                $("#modelEditplace").modal("show");
            });

            $("#myTable tbody").on("click", ".btnDeleteplace", function () {
                const currentRow = $(this).parents("tr");
                let checktableplace = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                Swal.fire({
                    title: "Warning",
                    text: "Are you sure to delete ID " + checktableplace.placeID,
                    icon: "warning",
                    showCancelButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            method: 'POST',
                            url: '/Deleteplace',
                            data: { placeID: checktableplace.placeID }
                        }).done(function (data, state, xhr) {
                            table.row(rowID).remove().draw();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The record has been deleted.",
                                icon: "success"
                            })
                        }).fail(function (xhr, state) {
                            Swal.fire({
                                title: "Delete error!",
                                text: "It's has something wrong.",
                                icon: "error"
                            })
                        })

                    }
                });
            });
        }).fail(function (xhr, state) {
            alert(xhr.responeText);
        });
    });

    $("#menuallRoute").click(function () {
        // alert("test");
        checkEditmodecar = 0;
        checkEditmodeplace = 0;
        $("#menushowplace").css("display", "none");
        $("#menushowcar").css("display", "none");
        $("#menushowHotel").css("display", "none");
        $("#menushowRoute").css("display", "");
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        $.ajax({
            method: 'GET',
            url: '/Routes'
        }).done(function (data, state, xhr) {
            console.log(data);
            table = $('#myTable').DataTable({
                responsive: true,
                data: data,
                columns: [
                    { data: "Route_ID", title: "รหัส" },
                    { data: "Origin", title: "ต้นทาง" },
                    { data: "Destination", title: "ปลายทาง" },
                    { data: "name_car", title: "ประเภทรถ" },
                    { data: "price_route", title: "ราคาต่อการเดินทาง" },
                    { data: "time_route", title: "เวลาที่ใช้ในการเดินทาง" },
                    { data: "place_in_route", title: "สถานที่ระหว่างทาง" },
                    { title: "Action", defaultContent: "<button class='btn btn-danger mr-2 btnDeleteRoute'>Delete</button><button class='btn btn-warning btnEditroute mr-2'>Edit</button>" }
                ]

            });

            $("#myTable tbody").on("click", ".btnEditroute", function () {
                const currentRow = $(this).parents("tr");
                const tableallroute = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                console.log(tableallroute.Route_ID + " " + rowID);
                console.log(tableallroute);
                $.ajax({
                    method: 'POST',
                    url: '/DataCar',
                }).done(function (data, state, xhr) {
                    let createOption = "";
                    for (let i = 0; i < data.length; i++) {
                        createOption += "<option value='" + data[i].carID + "'>" + ("ชื่อ " + data[i].name_car + " ความจุ " + data[i].capacity) + "</option>";
                    }
                    $("#EditRoute_carid").html(createOption);
                    $("#EditRoute_carid").val(tableallroute.carID);
                    // $("#EditTypeplace").html(createOption);
                }).fail(function (xhr, state) {
                    alert(xhr.responeText);
                });

                $.ajax({
                    method: 'POST',
                    url: '/DataPlace',
                }).done(function (data, state, xhr) {
                    let createOption = "";
                    for (let i = 0; i < data.length; i++) {
                        createOption += "<option value='" + data[i].placeID + "'>" + data[i].name_place + "</option>";
                    }
                    $("#EditRoute_Origin").html(createOption);
                    $("#EditRoute_Destination").html(createOption);
                    $("#EditRoute_Origin").val(tableallroute.IDorigin);
                    $("#EditRoute_Destination").val(tableallroute.IDdestination);
                    // $("#EditTypeplace").html(createOption);
                }).fail(function (xhr, state) {
                    alert(xhr.responeText);
                });
                $("#EditRouteID").val(tableallroute.Route_ID);
                $("#Editprice_route").val(tableallroute.price_route);
                $("#Edittime_route").val(tableallroute.time_route);
                $("#Editshowplace").text(numberEditplaceinR);
                $("#modelEditRoute").modal("show");
            });

            $("#myTable tbody").on("click", ".btnDeleteRoute", function () {
                const currentRow = $(this).parents("tr");
                let checktableRoute = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                Swal.fire({
                    title: "Warning",
                    text: "Are you sure to delete ID " + checktableRoute.Route_ID,
                    icon: "warning",
                    showCancelButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            method: 'POST',
                            url: '/DeleteRoute',
                            data: { Route_ID: checktableRoute.Route_ID }
                        }).done(function (data, state, xhr) {
                            table.row(rowID).remove().draw();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The record has been deleted.",
                                icon: "success"
                            })
                        }).fail(function (xhr, state) {
                            Swal.fire({
                                title: "Delete error!",
                                text: "It's has something wrong.",
                                icon: "error"
                            })
                        })

                    }
                });
            });

        }).fail(function (xhr, state) {
            alert(xhr.responeText);
        })
        numberAddplaceinR = "";
        $("#showplace").text(numberAddplaceinR);
    });

    // modal add data
    $("#btnAdd").click(function () {
        let dropdown = $("#dropdownMenu").val();
        if (dropdown == 1) {
            $("#modelcar").modal("show");
        } else if (dropdown == 2) {
            $("#modelplace").modal("show");
        } else if (dropdown == 3) {
            $("#modelAddhotel").modal("show");
        } else if (dropdown == 4) {
            $("#modelAddRoute").modal("show");
        }

    });

    $("#formAddplace").submit(function (e) {
        e.preventDefault();
        const dataForm = new FormData(this);

        $.ajax({
            method: 'POST',
            url: '/Addplace',
            data: dataForm,
            contentType: false,
            processData: false,
            success: function (response) {
                // alert(response);
                checkEditmodecar = 0;
                checkEditmodeplace = 0;
                $("#menushowplace").css("display", "");
                $("#menushowcar").css("display", "none");
                $("#menushowHotel").css("display", "none");
                // $("#menuTable").html("<a class='nav-link px-3' style='cursor: pointer;'>ทั้งหมด</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>ทั่วไป</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>วัด</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>สถานที่บันเทิง</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>ที่ท่องเที่ยวธรรมชาติ</a>");
                table.clear();
                table = $("#myTable").dataTable().fnDestroy();
                $('#myTable').empty();
                table = $('#myTable').DataTable({
                    responsive: true,
                    ajax: {
                        method: 'POST',
                        url: "/DataPlace",
                        dataSrc: function (data) {
                            for (let row = 0; row < data.length; row++) {
                                if (data[row].typeplaceID == 1) {
                                    data[row].typeplaceID = "ทั่วไป";
                                } else if (data[row].typeplaceID == 2) {
                                    data[row].typeplaceID = "วัด";
                                } else if (data[row].typeplaceID == 3) {
                                    data[row].typeplaceID = "สถานบันเทิง";
                                } else if (data[row].typeplaceID == 4) {
                                    data[row].typeplaceID = "ที่ท่องเที่ยวธรรมชาติ";
                                }
                            }
                            return data;
                        }
                    },
                    columns: [
                        { data: "placeID", title: "รหัส" },
                        { data: "name_place", title: "ชื่อสถานที่" },
                        { data: "pic_place", title: "รูป" },
                        { data: "info_place", title: "ข้อมูล" },
                        { data: "price_place", title: "ราคาเข้าชม" },
                        { data: "timeopen_place", title: "เวลาเปิด" },
                        { data: "timeclose_place", title: "เวลาปิด" },
                        { data: "CloseDay", title: "วันปิดทำการ" },
                        { data: "typeplaceID", title: "ประเทภสถานที่" },
                        { title: "Action", defaultContent: "<button class='btn btn-danger mr-2 btnDeleteplace'>Delete</button><button class='btn btn-warning btnEditplace mr-2'>Edit</button>" }
                    ]

                });

                $("#myTable tbody").on("click", ".btnEditplace", function () {
                    const currentRow = $(this).parents("tr");
                    const tableallplace = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    console.log(tableallplace.placeID + " " + rowID);
                    console.log(tableallplace);
                    $("#EdittxtIDplace").val(tableallplace.placeID);
                    $("#EdittxtNameplace").val(tableallplace.name_place);
                    $("#EdittxtInfoplace").val(tableallplace.info_place);
                    $("#EditTimeOpen").val(tableallplace.timeopen_place);
                    $("#EditTimeClose").val(tableallplace.timeclose_place);
                    $("#EdittxtPriceplace").val(tableallplace.price_place);
                    $("#modelEditplace").modal("show");
                });

                $("#myTable tbody").on("click", ".btnDeleteplace", function () {
                    const currentRow = $(this).parents("tr");
                    let checktableplace = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    Swal.fire({
                        title: "Warning",
                        text: "Are you sure to delete ID " + checktableplace.placeID,
                        icon: "warning",
                        showCancelButton: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $.ajax({
                                method: 'POST',
                                url: '/Deleteplace',
                                data: { placeID: checktableplace.placeID }
                            }).done(function (data, state, xhr) {
                                table.row(rowID).remove().draw();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The record has been deleted.",
                                    icon: "success"
                                })
                            }).fail(function (xhr, state) {
                                Swal.fire({
                                    title: "Delete error!",
                                    text: "It's has something wrong.",
                                    icon: "error"
                                })
                            })

                        }
                    });
                });
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });

        $.ajax({
            method: 'POST',
            url: '/DataPlace',
        }).done(function (data, state, xhr) {
            let createOption = "";
            for (let i = 0; i < data.length; i++) {
                createOption += "<option value='" + data[i].placeID + "'>" + data[i].name_place + "</option>";
            }
            $("#Route_Origin").html(createOption);
            $("#Route_Destination").html(createOption);
            // $("#EditTypeplace").html(createOption);
        }).fail(function (xhr, state) {
            alert(xhr.responeText);
        });

        $("#txtNameplace").val("");
        $("#txtInfoplace").val("");
        $("#txtInfoplace").val("");
        $("#selectTimeOpen").val("");
        $("#selectTimeClose").val("");
        $("#txtPriceplace").val("");
        $("#gallery-photo-add").val('');
        $(".gallery img:last-child").remove();
        $("#modelplace").modal("hide");
    });

    $("#btnSaveAddcar").click(function () {
        let typecar = $("#AddTypecar").val();
        let NameCar = $("#txtNamecar").val();
        // let PriceCar = $("#txtPricecar").val();
        let Capa = $("#txtCapacity").val();
        // alert(typecar+" "+NameCar+" "+PriceCar+" "+Capa);
        if (Capa != "" && NameCar != "") {
            $.ajax({
                method: 'POST',
                url: '/Addcar',
                data: { name_car: NameCar, capacity: Capa, TypecarID: typecar }
            }).done(function (err, result) {
                // table.clear();
                table = $("#myTable").dataTable().fnDestroy();
                $('#myTable').empty();
                table = $('#myTable').DataTable({
                    responsive: true,
                    ajax: {
                        method: 'POST',
                        url: "/DataCar",
                        dataSrc: function (data) {
                            for (let row = 0; row < data.length; row++) {
                                if (data[row].TypecarID == 1) {
                                    data[row].TypecarID = "รถประจำทาง";
                                } else {
                                    data[row].TypecarID = "รถรับจ้าง";
                                }
                            }
                            return data;
                        }
                    },
                    columns: [
                        { data: "carID", title: "รหัส" },
                        { data: "name_car", title: "ชื่อ" },
                        { data: "capacity", title: "ความจุ" },
                        { data: "TypecarID", title: "ประเทภรถ" },
                        { title: "Action", defaultContent: "<button class='btn btn-danger btnDeletecar mr-2'>Delete</button><button class='btn btn-warning btnEditcar mr-2'>Edit</button>" }
                    ]
                })
                $("#myTable tbody").on("click", ".btnEditcar", function () {
                    const currentRow = $(this).parents("tr");
                    const tableallCar = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    console.log(tableallCar.carID + " " + rowID);
                    $("#EdittxtIdcar").val(tableallCar.carID);
                    $("#EdittxtNamecar").val(tableallCar.name_car);
                    // $("#EdittxtPricecar").val(tableallCar.price_car);
                    $("#EdittxtCapacity").val(tableallCar.capacity);
                    $("#modelEditcar").modal("show");
                });

                $("#myTable tbody").on("click", ".btnDeletecar", function () {
                    const currentRow = $(this).parents("tr");
                    let checktableCar = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    Swal.fire({
                        title: "Warning",
                        text: "Are you sure to delete ID " + checktableCar.carID,
                        icon: "warning",
                        showCancelButton: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $.ajax({
                                method: 'POST',
                                url: '/Deletecar',
                                data: { IDcar: checktableCar.carID }
                            }).done(function (data, state, xhr) {
                                table.row(rowID).remove().draw();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The record has been deleted.",
                                    icon: "success"
                                })
                            }).fail(function (xhr, state) {
                                Swal.fire({
                                    title: "Delete error!",
                                    text: "It's has something wrong.",
                                    icon: "error"
                                })
                            })

                        }
                    });
                });
                Swal.fire({
                    title: "Add Success!",
                    text: "The Data has been Added.",
                    icon: "success"
                })
                $("#txtNamecar").val("");
                // $("#txtPricecar").val("");
                $("#txtCapacity").val("");
                $("#modelcar").modal("hide");
            }).fail(function (err, result) {
                Swal.fire({
                    title: "Add error!",
                    text: "It's has something wrong.",
                    icon: "error"
                })
            });
        }

        $.ajax({
            method: 'POST',
            url: '/DataCar',
        }).done(function (data, state, xhr) {
            let createOption = "";
            for (let i = 0; i < data.length; i++) {
                createOption += "<option value='" + data[i].carID + "'>" + ("ชื่อ " + data[i].name_car + " ความจุ " + data[i].capacity) + "</option>";
            }
            $("#Route_carid").html(createOption);
            // $("#EditTypeplace").html(createOption);
        }).fail(function (xhr, state) {
            alert(xhr.responeText);
        });


    });

    $("#btnClosecar").click(function () {
        $("#txtNamecar").val("");
        // $("#txtPricecar").val("");
        $("#txtCapacity").val("");
    });

    $("#btnresetRunnum").click(function () {
        $("#txtNamecar").val("");
        // $("#txtPricecar").val("");
        $("#txtPointStartcar").val("");
        $("#txtPointEndcar").val("");
    });

    // select display data
    $("#dropdownMenu").change(function () {
        let dropdown = $(this).val();
        if (dropdown == 1) {
            checkEditmodecar = 0;
            checkEditmodeplace = 0;
            $("#menushowplace").css("display", "none");
            $("#menushowHotel").css("display", "none");
            $("#menushowcar").css("display", "");
            $("#menushowRoute").css("display", "none");
            // $("#menuTable").html("<a class='nav-link px-3' style='cursor: pointer;' id='menuallcar'>ทั้งหมด</a><a class='nav-link px-3' id='menubus' style='border-left: 1px solid #666666; cursor: pointer;'>รถประจำทาง</a><a class='nav-link px-3' id='menutaxi' style='border-left: 1px solid #666666; cursor: pointer;'>รถรับจ้าง</a>");
            table.clear();
            table = $("#myTable").dataTable().fnDestroy();
            $('#myTable').empty();
            table = $('#myTable').DataTable({
                responsive: true,
                ajax: {
                    method: 'POST',
                    url: "/DataCar",
                    dataSrc: function (data) {
                        for (let row = 0; row < data.length; row++) {
                            if (data[row].TypecarID == 1) {
                                data[row].TypecarID = "รถประจำทาง";
                            } else {
                                data[row].TypecarID = "รถรับจ้าง";
                            }
                        }
                        return data;
                    }
                },
                columns: [
                    { data: "carID", title: "รหัส" },
                    { data: "name_car", title: "ชื่อ" },
                    { data: "capacity", title: "ความจุ" },
                    { data: "TypecarID", title: "ประเทภรถ" },
                    { title: "Action", defaultContent: "<button class='btn btn-danger btnDeletecar mr-2'>Delete</button><button class='btn btn-warning btnEditcar mr-2'>Edit</button>" }
                ]
            })
            $("#myTable tbody").on("click", ".btnEditcar", function () {
                const currentRow = $(this).parents("tr");
                const tableallCar = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                console.log(tableallCar.carID + " " + rowID);
                $("#EdittxtIdcar").val(tableallCar.carID);
                $("#EdittxtNamecar").val(tableallCar.name_car);
                // $("#EdittxtPricecar").val(tableallCar.price_car);
                $("#EdittxtCapacity").val(tableallCar.capacity);
                $("#modelEditcar").modal("show");
            });
            $("#myTable tbody").on("click", ".btnDeletecar", function () {
                const currentRow = $(this).parents("tr");
                let checktableCar = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                Swal.fire({
                    title: "Warning",
                    text: "Are you sure to delete ID " + checktableCar.carID,
                    icon: "warning",
                    showCancelButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            method: 'POST',
                            url: '/Deletecar',
                            data: { IDcar: checktableCar.carID }
                        }).done(function (data, state, xhr) {
                            table.row(rowID).remove().draw();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The record has been deleted.",
                                icon: "success"
                            })
                        }).fail(function (xhr, state) {
                            Swal.fire({
                                title: "Delete error!",
                                text: "It's has something wrong.",
                                icon: "error"
                            })
                        })

                    }
                });
            });

        } else if (dropdown == 2) {
            checkEditmodecar = 0;
            checkEditmodeplace = 0;
            $("#menushowplace").css("display", "");
            $("#menushowcar").css("display", "none");
            $("#menushowHotel").css("display", "none");
            $("#menushowRoute").css("display", "none");
            // $("#menuTable").html("<a class='nav-link px-3' style='cursor: pointer;'>ทั้งหมด</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>ทั่วไป</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>วัด</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>สถานที่บันเทิง</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>ที่ท่องเที่ยวธรรมชาติ</a>");
            table.clear();
            table = $("#myTable").dataTable().fnDestroy();
            $('#myTable').empty();
            table = $('#myTable').DataTable({
                responsive: true,
                ajax: {
                    method: 'POST',
                    url: "/DataPlace",
                    dataSrc: function (data) {
                        for (let row = 0; row < data.length; row++) {
                            if (data[row].typeplaceID == 1) {
                                data[row].typeplaceID = "ทั่วไป";
                            } else if (data[row].typeplaceID == 2) {
                                data[row].typeplaceID = "วัด";
                            } else if (data[row].typeplaceID == 3) {
                                data[row].typeplaceID = "สถานบันเทิง";
                            } else if (data[row].typeplaceID == 4) {
                                data[row].typeplaceID = "ที่ท่องเที่ยวธรรมชาติ";
                            }
                        }
                        return data;
                    }
                },
                columns: [
                    { data: "placeID", title: "รหัส" },
                    { data: "name_place", title: "ชื่อสถานที่" },
                    { data: "pic_place", title: "รูป" },
                    { data: "info_place", title: "ข้อมูล" },
                    { data: "price_place", title: "ราคาเข้าชม" },
                    { data: "timeopen_place", title: "เวลาเปิด" },
                    { data: "timeclose_place", title: "เวลาปิด" },
                    { data: "CloseDay", title: "วันปิดทำการ" },
                    { data: "typeplaceID", title: "ประเทภสถานที่" },
                    { title: "Action", defaultContent: "<button class='btn btn-danger mr-2 btnDeleteplace'>Delete</button><button class='btn btn-warning btnEditplace mr-2'>Edit</button>" }
                ]

            });

            $("#myTable tbody").on("click", ".btnEditplace", function () {
                const currentRow = $(this).parents("tr");
                const tableallplace = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                console.log(tableallplace.placeID + " " + rowID);
                console.log(tableallplace);
                $("#EdittxtIDplace").val(tableallplace.placeID);
                $("#EdittxtNameplace").val(tableallplace.name_place);
                $("#EdittxtInfoplace").val(tableallplace.info_place);
                $("#EditTimeOpen").val(tableallplace.timeopen_place);
                $("#EditTimeClose").val(tableallplace.timeclose_place);
                $("#EdittxtPriceplace").val(tableallplace.price_place);
                $("#modelEditplace").modal("show");
            });

            $("#myTable tbody").on("click", ".btnDeleteplace", function () {
                const currentRow = $(this).parents("tr");
                let checktableplace = table.row(currentRow).data();
                rowID = table.row(currentRow).index();
                Swal.fire({
                    title: "Warning",
                    text: "Are you sure to delete ID " + checktableplace.placeID,
                    icon: "warning",
                    showCancelButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            method: 'POST',
                            url: '/Deleteplace',
                            data: { placeID: checktableplace.placeID }
                        }).done(function (data, state, xhr) {
                            table.row(rowID).remove().draw();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The record has been deleted.",
                                icon: "success"
                            })
                        }).fail(function (xhr, state) {
                            Swal.fire({
                                title: "Delete error!",
                                text: "It's has something wrong.",
                                icon: "error"
                            })
                        })

                    }
                });
            });


        } else if (dropdown == 3) {
            checkEditmodecar = 0;
            checkEditmodeplace = 0;
            $("#menushowplace").css("display", "none");
            $("#menushowcar").css("display", "none");
            $("#menushowHotel").css("display", "");
            $("#menushowRoute").css("display", "none");
            table.clear();
            table = $("#myTable").dataTable().fnDestroy();
            $('#myTable').empty();
            $.ajax({
                method: 'GET',
                url: '/DataHotel'
            }).done(function (data, state, xhr) {
                console.log(data);
                table = $('#myTable').DataTable({
                    responsive: true,
                    data: data,
                    columns: [
                        { data: "hotelID", title: "รหัส" },
                        { data: "name_hotel", title: "ชื่อที่พัก" },
                        { data: "pic_hotel", title: "รูป" },
                        { data: "price_per_day", title: "ราคา" },
                        { title: "Action", defaultContent: "<button class='btn btn-danger mr-2 btnDeletehotel'>Delete</button><button class='btn btn-warning btnEdithotel mr-2'>Edit</button>" }
                    ]

                });

                $("#myTable tbody").on("click", ".btnEdithotel", function () {
                    const currentRow = $(this).parents("tr");
                    const tableallhotel = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    console.log(tableallhotel.hotelID + " " + rowID);
                    console.log(tableallhotel);
                    $("#EdittxtIDhotel").val(tableallhotel.hotelID);
                    $("#EdittxtNamehotel").val(tableallhotel.name_hotel);
                    $("#EdittxtPricehotel").val(tableallhotel.price_per_day);
                    $("#modelEdithotel").modal("show");
                });

                $("#myTable tbody").on("click", ".btnDeletehotel", function () {
                    const currentRow = $(this).parents("tr");
                    let checktablehotel = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    Swal.fire({
                        title: "Warning",
                        text: "Are you sure to delete ID " + checktablehotel.hotelID,
                        icon: "warning",
                        showCancelButton: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $.ajax({
                                method: 'POST',
                                url: '/Deletehotel',
                                data: { hotelID: checktablehotel.hotelID }
                            }).done(function (data, state, xhr) {
                                table.row(rowID).remove().draw();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The record has been deleted.",
                                    icon: "success"
                                })
                            }).fail(function (xhr, state) {
                                Swal.fire({
                                    title: "Delete error!",
                                    text: "It's has something wrong.",
                                    icon: "error"
                                })
                            })

                        }
                    });
                });

            }).fail(function (xhr, state) {
                alert(xhr.responeText);
            })

        } else if (dropdown == 4) {
            checkEditmodecar = 0;
            checkEditmodeplace = 0;
            $("#menushowplace").css("display", "none");
            $("#menushowcar").css("display", "none");
            $("#menushowHotel").css("display", "none");
            $("#menushowRoute").css("display", "");
            table.clear();
            table = $("#myTable").dataTable().fnDestroy();
            $('#myTable').empty();
            $.ajax({
                method: 'GET',
                url: '/Routes'
            }).done(function (data, state, xhr) {
                console.log(data);
                table = $('#myTable').DataTable({
                    responsive: true,
                    data: data,
                    columns: [
                        { data: "Route_ID", title: "รหัส" },
                        { data: "Origin", title: "ต้นทาง" },
                        { data: "Destination", title: "ปลายทาง" },
                        { data: "name_car", title: "ประเภทรถ" },
                        { data: "price_route", title: "ราคาต่อการเดินทาง" },
                        { data: "time_route", title: "เวลาที่ใช้ในการเดินทาง" },
                        { data: "place_in_route", title: "สถานที่ระหว่างทาง" },
                        { title: "Action", defaultContent: "<button class='btn btn-danger mr-2 btnDeleteRoute'>Delete</button><button class='btn btn-warning btnEditroute mr-2'>Edit</button>" }
                    ]

                });

                $("#myTable tbody").on("click", ".btnEditroute", function () {
                    const currentRow = $(this).parents("tr");
                    const tableallroute = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    console.log(tableallroute.Route_ID + " " + rowID);
                    console.log(tableallroute);
                    $.ajax({
                        method: 'POST',
                        url: '/DataCar',
                    }).done(function (data, state, xhr) {
                        let createOption = "";
                        for (let i = 0; i < data.length; i++) {
                            createOption += "<option value='" + data[i].carID + "'>" + ("ชื่อ " + data[i].name_car + " ความจุ " + data[i].capacity) + "</option>";
                        }
                        $("#EditRoute_carid").html(createOption);
                        $("#EditRoute_carid").val(tableallroute.carID);
                        // $("#EditTypeplace").html(createOption);
                    }).fail(function (xhr, state) {
                        alert(xhr.responeText);
                    });

                    $.ajax({
                        method: 'POST',
                        url: '/DataPlace',
                    }).done(function (data, state, xhr) {
                        let createOption = "";
                        for (let i = 0; i < data.length; i++) {
                            createOption += "<option value='" + data[i].placeID + "'>" + data[i].name_place + "</option>";
                        }
                        $("#EditRoute_Origin").html(createOption);
                        $("#EditRoute_Destination").html(createOption);
                        $("#EditRoute_Origin").val(tableallroute.IDorigin);
                        $("#EditRoute_Destination").val(tableallroute.IDdestination);
                        // $("#EditTypeplace").html(createOption);
                    }).fail(function (xhr, state) {
                        alert(xhr.responeText);
                    });
                    $("#EditRouteID").val(tableallroute.Route_ID);
                    $("#Editprice_route").val(tableallroute.price_route);
                    $("#Edittime_route").val(tableallroute.time_route);
                    $("#Editshowplace").text(numberEditplaceinR);
                    $("#modelEditRoute").modal("show");
                });

                $("#myTable tbody").on("click", ".btnDeleteRoute", function () {
                    const currentRow = $(this).parents("tr");
                    let checktableRoute = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    Swal.fire({
                        title: "Warning",
                        text: "Are you sure to delete ID " + checktableRoute.Route_ID,
                        icon: "warning",
                        showCancelButton: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $.ajax({
                                method: 'POST',
                                url: '/DeleteRoute',
                                data: { Route_ID: checktableRoute.Route_ID }
                            }).done(function (data, state, xhr) {
                                table.row(rowID).remove().draw();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The record has been deleted.",
                                    icon: "success"
                                })
                            }).fail(function (xhr, state) {
                                Swal.fire({
                                    title: "Delete error!",
                                    text: "It's has something wrong.",
                                    icon: "error"
                                })
                            })

                        }
                    });
                });

            }).fail(function (xhr, state) {
                alert(xhr.responeText);
            })
            numberAddplaceinR = "";
            $("#showplace").text(numberAddplaceinR);
        }
    });

    $("#btnSaveEdithotel").click(function () {
        // alert("test");
        let edithotelID = $("#EdittxtIDhotel").val();
        let editNamehotel = $("#EdittxtNamehotel").val();
        let editPricehotel = $("#EdittxtPricehotel").val();
        // alert(hotelID+" "+Namehotel+" "+Pricehotel);
        $.ajax({
            method: 'POST',
            url: '/Edithotel',
            data: { hotelID: edithotelID, name_hotel: editNamehotel, price_per_day: editPricehotel }
        }).done(function (data, state, xhr) {
            table.clear();
            table = $("#myTable").dataTable().fnDestroy();
            $('#myTable').empty();
            $.ajax({
                method: 'GET',
                url: '/DataHotel'
            }).done(function (data, state, xhr) {
                table = $('#myTable').DataTable({
                    responsive: true,
                    data: data,
                    columns: [
                        { data: "hotelID", title: "รหัส" },
                        { data: "name_hotel", title: "ชื่อที่พัก" },
                        { data: "pic_hotel", title: "รูป" },
                        { data: "price_per_day", title: "ราคา" },
                        { title: "Action", defaultContent: "<button class='btn btn-danger mr-2 btnDeletehotel'>Delete</button><button class='btn btn-warning btnEdithotel mr-2'>Edit</button>" }
                    ]
                })
                $("#myTable tbody").on("click", ".btnEdithotel", function () {
                    const currentRow = $(this).parents("tr");
                    const tableallhotel = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    console.log(tableallhotel.hotelID + " " + rowID);
                    console.log(tableallhotel);
                    $("#EdittxtIDhotel").val(tableallhotel.hotelID);
                    $("#EdittxtNamehotel").val(tableallhotel.name_hotel);
                    $("#EdittxtPricehotel").val(tableallhotel.price_per_day);
                    $("#modelEdithotel").modal("show");
                });

                $("#myTable tbody").on("click", ".btnDeletehotel", function () {
                    const currentRow = $(this).parents("tr");
                    let checktablehotel = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    Swal.fire({
                        title: "Warning",
                        text: "Are you sure to delete ID " + checktablehotel.hotelID,
                        icon: "warning",
                        showCancelButton: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $.ajax({
                                method: 'POST',
                                url: '/Deletehotel',
                                data: { hotelID: checktablehotel.hotelID }
                            }).done(function (data, state, xhr) {
                                table.row(rowID).remove().draw();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The record has been deleted.",
                                    icon: "success"
                                })
                            }).fail(function (xhr, state) {
                                Swal.fire({
                                    title: "Delete error!",
                                    text: "It's has something wrong.",
                                    icon: "error"
                                })
                            })

                        }
                    });
                });

            }).fail(function (xhr, state) {
                alert(xhr.responeText);
            });

        }).fail(function (xhr, state) {
            alert(xhr.responeText);
        });
        $("#modelEdithotel").modal("hide");
    });



    // edit data car
    $("#myTable tbody").on("click", ".btnEditcar", function () {
        const currentRow = $(this).parents("tr");
        const tableallCar = table.row(currentRow).data();
        rowID = table.row(currentRow).index();
        console.log(tableallCar.carID + " " + rowID);
        $("#EdittxtIdcar").val(tableallCar.carID);
        $("#EdittxtNamecar").val(tableallCar.name_car);
        // $("#EdittxtPricecar").val(tableallCar.price_car);
        $("#EdittxtCapacity").val(tableallCar.capacity);
        $("#modelEditcar").modal("show");
    });

    $("#myTable tbody").on("click", ".btnDeletecar", function () {
        const currentRow = $(this).parents("tr");
        let checktableCar = table.row(currentRow).data();
        rowID = table.row(currentRow).index();
        Swal.fire({
            title: "Warning",
            text: "Are you sure to delete ID " + checktableCar.carID,
            icon: "warning",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    method: 'POST',
                    url: '/Deletecar',
                    data: { IDcar: checktableCar.carID }
                }).done(function (data, state, xhr) {
                    table.row(rowID).remove().draw();
                    Swal.fire({
                        title: "Deleted!",
                        text: "The record has been deleted.",
                        icon: "success"
                    })
                }).fail(function (xhr, state) {
                    alert(xhr.responeText);
                })

            }
        });
    });

    $("#btnSaveEditcar").click(function () {
        const editIDcar = $("#EdittxtIdcar").val();
        const editnamecar = $("#EdittxtNamecar").val();
        // const editpricecar = $("#EdittxtPricecar").val();
        const editCapacity = $("#EdittxtCapacity").val();
        const editTypecar = $("#EditTypecar").val();
        // alert(editIDcar+" "+editnamecar+" "+editpricecar+" "+editCapacity+" "+editTypecar);
        $.ajax({
            method: 'POST',
            url: '/Editcar',
            data: { carID: editIDcar, name_car: editnamecar, capacity: editCapacity, TypecarID: editTypecar }
        }).done(function (data, state, xhr) {
            if (checkEditmodecar == 0) {
                table.clear();
                table = $("#myTable").dataTable().fnDestroy();
                $('#myTable').empty();
                table = $('#myTable').DataTable({
                    responsive: true,
                    ajax: {
                        method: 'POST',
                        url: "/DataCar",
                        dataSrc: function (data) {
                            for (let row = 0; row < data.length; row++) {
                                if (data[row].TypecarID == 1) {
                                    data[row].TypecarID = "รถประจำทาง";
                                } else {
                                    data[row].TypecarID = "รถรับจ้าง";
                                }
                            }
                            return data;
                        }
                    },
                    columns: [
                        { data: "carID", title: "รหัส" },
                        { data: "name_car", title: "ชื่อ" },
                        { data: "capacity", title: "ความจุ" },
                        { data: "TypecarID", title: "ประเทภรถ" },
                        { title: "Action", defaultContent: "<button class='btn btn-danger btnDeletecar mr-2'>Delete</button><button class='btn btn-warning btnEditcar mr-2'>Edit</button>" }
                    ]
                })
                $("#myTable tbody").on("click", ".btnEditcar", function () {
                    const currentRow = $(this).parents("tr");
                    const tableallCar = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    console.log(tableallCar.carID + " " + rowID);
                    $("#EdittxtIdcar").val(tableallCar.carID);
                    $("#EdittxtNamecar").val(tableallCar.name_car);
                    // $("#EdittxtPricecar").val(tableallCar.price_car);
                    $("#EdittxtCapacity").val(tableallCar.capacity);
                    $("#modelEditcar").modal("show");
                });
                $("#myTable tbody").on("click", ".btnDeletecar", function () {
                    const currentRow = $(this).parents("tr");
                    let checktableCar = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    Swal.fire({
                        title: "Warning",
                        text: "Are you sure to delete ID " + checktableCar.carID,
                        icon: "warning",
                        showCancelButton: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $.ajax({
                                method: 'POST',
                                url: '/Deletecar',
                                data: { IDcar: checktableCar.carID }
                            }).done(function (data, state, xhr) {
                                table.row(rowID).remove().draw();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The record has been deleted.",
                                    icon: "success"
                                })
                            }).fail(function (xhr, state) {
                                Swal.fire({
                                    title: "Delete error!",
                                    text: "It's has something wrong.",
                                    icon: "error"
                                })
                            })

                        }
                    });
                });
            } else if (checkEditmodecar == 1) {
                table.clear();
                table = $("#myTable").dataTable().fnDestroy();
                $('#myTable').empty();
                $.ajax({
                    method: 'POST',
                    url: '/DataCar',
                    data: { type: 1 }
                }).done(function (data, state, xhr) {
                    table = $('#myTable').DataTable({
                        responsive: true,
                        data: data,
                        columns: [
                            { data: "carID", title: "รหัส" },
                            { data: "name_car", title: "ชื่อ" },
                            { data: "capacity", title: "ความจุ" },
                            { data: "nameType_car", title: "ประเภทรถ" },
                            { title: "Action", defaultContent: "<button class='btn btn-danger btnDeletecar mr-2'>Delete</button><button class='btn btn-warning btnEditcar mr-2'>Edit</button>" }
                        ]
                    })
                    $("#myTable tbody").on("click", ".btnEditcar", function () {
                        const currentRow = $(this).parents("tr");
                        const tableallCar = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        console.log(tableallCar.carID + " " + rowID);
                        $("#EdittxtIdcar").val(tableallCar.carID);
                        $("#EdittxtNamecar").val(tableallCar.name_car);
                        // $("#EdittxtPricecar").val(tableallCar.price_car);
                        $("#EdittxtCapacity").val(tableallCar.capacity);
                        $("#modelEditcar").modal("show");
                    });
                    $("#myTable tbody").on("click", ".btnDeletecar", function () {
                        const currentRow = $(this).parents("tr");
                        let checktableCar = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        Swal.fire({
                            title: "Warning",
                            text: "Are you sure to delete ID " + checktableCar.carID,
                            icon: "warning",
                            showCancelButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.ajax({
                                    method: 'POST',
                                    url: '/Deletecar',
                                    data: { IDcar: checktableCar.carID }
                                }).done(function (data, state, xhr) {
                                    table.row(rowID).remove().draw();
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "The record has been deleted.",
                                        icon: "success"
                                    })
                                }).fail(function (xhr, state) {
                                    Swal.fire({
                                        title: "Delete error!",
                                        text: "It's has something wrong.",
                                        icon: "error"
                                    })
                                })

                            }
                        });
                    });

                }).fail(function (xhr, state) {
                    alert(xhr.responeText);
                });
            } else if (checkEditmodecar == 2) {
                table.clear();
                table = $("#myTable").dataTable().fnDestroy();
                $('#myTable').empty();
                $.ajax({
                    method: 'POST',
                    url: '/DataCar',
                    data: { type: 2 }
                }).done(function (data, state, xhr) {
                    table = $('#myTable').DataTable({
                        responsive: true,
                        data: data,
                        columns: [
                            { data: "carID", title: "รหัส" },
                            { data: "name_car", title: "ชื่อ" },
                            { data: "capacity", title: "ความจุ" },
                            { data: "nameType_car", title: "ประเภทรถ" },
                            { title: "Action", defaultContent: "<button class='btn btn-danger btnDeletecar mr-2'>Delete</button><button class='btn btn-warning btnEditcar mr-2'>Edit</button>" }
                        ]
                    })
                    $("#myTable tbody").on("click", ".btnEditcar", function () {
                        const currentRow = $(this).parents("tr");
                        const tableallCar = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        console.log(tableallCar.carID + " " + rowID);
                        $("#EdittxtIdcar").val(tableallCar.carID);
                        $("#EdittxtNamecar").val(tableallCar.name_car);
                        // $("#EdittxtPricecar").val(tableallCar.price_car);
                        $("#EdittxtCapacity").val(tableallCar.capacity);
                        $("#modelEditcar").modal("show");
                    });
                    $("#myTable tbody").on("click", ".btnDeletecar", function () {
                        const currentRow = $(this).parents("tr");
                        let checktableCar = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        Swal.fire({
                            title: "Warning",
                            text: "Are you sure to delete ID " + checktableCar.carID,
                            icon: "warning",
                            showCancelButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.ajax({
                                    method: 'POST',
                                    url: '/Deletecar',
                                    data: { IDcar: checktableCar.carID }
                                }).done(function (data, state, xhr) {
                                    table.row(rowID).remove().draw();
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "The record has been deleted.",
                                        icon: "success"
                                    })
                                }).fail(function (xhr, state) {
                                    Swal.fire({
                                        title: "Delete error!",
                                        text: "It's has something wrong.",
                                        icon: "error"
                                    })
                                })

                            }
                        });
                    });

                }).fail(function (xhr, state) {
                    alert(xhr.responeText);
                });
            }
            $("#modelEditcar").modal("hide");
        }).fail(function (xhr, state) {
            Swal.fire({
                title: "Edit error!",
                text: "It's has something wrong.",
                icon: "error"
            })
        });
    });

    $("#btnSaveEditplace").click(function () {
        // alert("test");
        const editTypeplace = $("#EditTypeplace").val();
        const editIDplace = $("#EdittxtIDplace").val();
        const editnameplace = $("#EdittxtNameplace").val();
        const editinfoplace = $("#EdittxtInfoplace").val();
        const editTimeopen = $("#EditTimeOpen").val();
        const editTimeclose = $("#EditTimeClose").val();
        const editDayclose = $("#EditDayclose").val();
        const editpriceplace = $("#EdittxtPriceplace").val();
        if (checkEditmodeplace == 0) {
            $.ajax({
                method: 'POST',
                url: '/Editplace',
                data: { placeID: editIDplace, name_place: editnameplace, info_place: editinfoplace, price_place: editpriceplace, timeopen_place: editTimeopen, timeclose_place: editTimeclose, CloseDay: editDayclose, typeplaceID: editTypeplace }
            }).done(function (data, state, xhr) {
                // alert(data);
                table.clear();
                table = $("#myTable").dataTable().fnDestroy();
                $('#myTable').empty();
                table = $('#myTable').DataTable({
                    responsive: true,
                    ajax: {
                        method: 'POST',
                        url: "/DataPlace",
                        dataSrc: function (data) {
                            for (let row = 0; row < data.length; row++) {
                                if (data[row].typeplaceID == 1) {
                                    data[row].typeplaceID = "ทั่วไป";
                                } else if (data[row].typeplaceID == 2) {
                                    data[row].typeplaceID = "วัด";
                                } else if (data[row].typeplaceID == 3) {
                                    data[row].typeplaceID = "สถานบันเทิง";
                                } else if (data[row].typeplaceID == 4) {
                                    data[row].typeplaceID = "ที่ท่องเที่ยวธรรมชาติ";
                                }
                            }
                            return data;
                        }
                    },
                    columns: [
                        { data: "placeID", title: "รหัส" },
                        { data: "name_place", title: "ชื่อสถานที่" },
                        { data: "pic_place", title: "รูป" },
                        { data: "info_place", title: "ข้อมูล" },
                        { data: "price_place", title: "ราคาเข้าชม" },
                        { data: "timeopen_place", title: "เวลาเปิด" },
                        { data: "timeclose_place", title: "เวลาปิด" },
                        { data: "CloseDay", title: "วันปิดทำการ" },
                        { data: "typeplaceID", title: "ประเทภสถานที่" },
                        { title: "Action", defaultContent: "<button class='btn btn-danger mr-2 btnDeleteplace'>Delete</button><button class='btn btn-warning btnEditplace mr-2'>Edit</button>" }
                    ]

                });

                $("#myTable tbody").on("click", ".btnEditplace", function () {
                    const currentRow = $(this).parents("tr");
                    const tableallplace = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    console.log(tableallplace.placeID + " " + rowID);
                    console.log(tableallplace);
                    $("#EdittxtIDplace").val(tableallplace.placeID);
                    $("#EdittxtNameplace").val(tableallplace.name_place);
                    $("#EdittxtInfoplace").val(tableallplace.info_place);
                    $("#EditTimeOpen").val(tableallplace.timeopen_place);
                    $("#EditTimeClose").val(tableallplace.timeclose_place);
                    $("#EdittxtPriceplace").val(tableallplace.price_place);
                    $("#modelEditplace").modal("show");
                });

                $("#myTable tbody").on("click", ".btnDeleteplace", function () {
                    const currentRow = $(this).parents("tr");
                    let checktableplace = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    Swal.fire({
                        title: "Warning",
                        text: "Are you sure to delete ID " + checktableplace.placeID,
                        icon: "warning",
                        showCancelButton: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $.ajax({
                                method: 'POST',
                                url: '/Deleteplace',
                                data: { placeID: checktableplace.placeID }
                            }).done(function (data, state, xhr) {
                                table.row(rowID).remove().draw();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The record has been deleted.",
                                    icon: "success"
                                })
                            }).fail(function (xhr, state) {
                                Swal.fire({
                                    title: "Delete error!",
                                    text: "It's has something wrong.",
                                    icon: "error"
                                })
                            })

                        }
                    });
                });
                $("#modelEditplace").modal("hide");
            }).fail(function (xhr, state) {
                alert(xhr.responeText);
            });
        } else if (checkEditmodeplace == 1) {
            $.ajax({
                method: 'POST',
                url: '/Editplace',
                data: { placeID: editIDplace, name_place: editnameplace, info_place: editinfoplace, price_place: editpriceplace, timeopen_place: editTimeopen, timeclose_place: editTimeclose, CloseDay: editDayclose, typeplaceID: editTypeplace }
            }).done(function (data, state, xhr) {
                // alert(data);
                $.ajax({
                    method: 'POST',
                    url: '/DataPlace',
                    data: { type: 1 }
                }).done(function (data, state, xhr) {
                    // alert(data);
                    table.clear();
                    table = $("#myTable").dataTable().fnDestroy();
                    $('#myTable').empty();
                    table = $('#myTable').DataTable({
                        responsive: true,
                        data: data,
                        columns: [
                            { data: "placeID", title: "รหัส" },
                            { data: "name_place", title: "ชื่อสถานที่" },
                            { data: "pic_place", title: "รูป" },
                            { data: "info_place", title: "ข้อมูล" },
                            { data: "price_place", title: "ราคาเข้าชม" },
                            { data: "timeopen_place", title: "เวลาเปิด" },
                            { data: "timeclose_place", title: "เวลาปิด" },
                            { data: "CloseDay", title: "วันปิดทำการ" },
                            { data: "nametype_place", title: "ประเทภสถานที่" },
                            { title: "Action", defaultContent: "<button class='btn btn-danger btnDeleteplace mr-2'>Delete</button><button class='btn btn-warning btnEditplace mr-2'>Edit</button>" }
                        ]
                    })
                    $("#myTable tbody").on("click", ".btnEditplace", function () {
                        const currentRow = $(this).parents("tr");
                        const tableallplace = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        console.log(tableallplace.placeID + " " + rowID);
                        console.log(tableallplace);
                        $("#EdittxtIDplace").val(tableallplace.placeID);
                        $("#EdittxtNameplace").val(tableallplace.name_place);
                        $("#EdittxtInfoplace").val(tableallplace.info_place);
                        $("#EditTimeOpen").val(tableallplace.timeopen_place);
                        $("#EditTimeClose").val(tableallplace.timeclose_place);
                        $("#EdittxtPriceplace").val(tableallplace.price_place);
                        $("#modelEditplace").modal("show");
                    });

                    $("#myTable tbody").on("click", ".btnDeleteplace", function () {
                        const currentRow = $(this).parents("tr");
                        let checktableplace = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        Swal.fire({
                            title: "Warning",
                            text: "Are you sure to delete ID " + checktableplace.placeID,
                            icon: "warning",
                            showCancelButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.ajax({
                                    method: 'POST',
                                    url: '/Deleteplace',
                                    data: { placeID: checktableplace.placeID }
                                }).done(function (data, state, xhr) {
                                    table.row(rowID).remove().draw();
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "The record has been deleted.",
                                        icon: "success"
                                    })
                                }).fail(function (xhr, state) {
                                    Swal.fire({
                                        title: "Delete error!",
                                        text: "It's has something wrong.",
                                        icon: "error"
                                    })
                                })

                            }
                        });
                        $("#modelEditplace").modal("hide");
                    });
                }).fail(function (xhr, state) {
                    alert(xhr.responeText);
                });
                $("#modelEditplace").modal("hide");
            }).fail(function (xhr, state) {
                alert(xhr.responeText);
            });
        } else if (checkEditmodeplace == 2) {
            $.ajax({
                method: 'POST',
                url: '/Editplace',
                data: { placeID: editIDplace, name_place: editnameplace, info_place: editinfoplace, price_place: editpriceplace, timeopen_place: editTimeopen, timeclose_place: editTimeclose, CloseDay: editDayclose, typeplaceID: editTypeplace }
            }).done(function (data, state, xhr) {
                // alert(data);
                $.ajax({
                    method: 'POST',
                    url: '/DataPlace',
                    data: { type: 2 }
                }).done(function (data, state, xhr) {
                    // alert(data);
                    table.clear();
                    table = $("#myTable").dataTable().fnDestroy();
                    $('#myTable').empty();
                    table = $('#myTable').DataTable({
                        responsive: true,
                        data: data,
                        columns: [
                            { data: "placeID", title: "รหัส" },
                            { data: "name_place", title: "ชื่อสถานที่" },
                            { data: "pic_place", title: "รูป" },
                            { data: "info_place", title: "ข้อมูล" },
                            { data: "price_place", title: "ราคาเข้าชม" },
                            { data: "timeopen_place", title: "เวลาเปิด" },
                            { data: "timeclose_place", title: "เวลาปิด" },
                            { data: "CloseDay", title: "วันปิดทำการ" },
                            { data: "nametype_place", title: "ประเทภสถานที่" },
                            { title: "Action", defaultContent: "<button class='btn btn-danger btnDeleteplace mr-2'>Delete</button><button class='btn btn-warning btnEditplace mr-2'>Edit</button>" }
                        ]
                    })
                    $("#myTable tbody").on("click", ".btnEditplace", function () {
                        const currentRow = $(this).parents("tr");
                        const tableallplace = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        console.log(tableallplace.placeID + " " + rowID);
                        console.log(tableallplace);
                        $("#EdittxtIDplace").val(tableallplace.placeID);
                        $("#EdittxtNameplace").val(tableallplace.name_place);
                        $("#EdittxtInfoplace").val(tableallplace.info_place);
                        $("#EditTimeOpen").val(tableallplace.timeopen_place);
                        $("#EditTimeClose").val(tableallplace.timeclose_place);
                        $("#EdittxtPriceplace").val(tableallplace.price_place);
                        $("#modelEditplace").modal("show");
                    });

                    $("#myTable tbody").on("click", ".btnDeleteplace", function () {
                        const currentRow = $(this).parents("tr");
                        let checktableplace = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        Swal.fire({
                            title: "Warning",
                            text: "Are you sure to delete ID " + checktableplace.placeID,
                            icon: "warning",
                            showCancelButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.ajax({
                                    method: 'POST',
                                    url: '/Deleteplace',
                                    data: { placeID: checktableplace.placeID }
                                }).done(function (data, state, xhr) {
                                    table.row(rowID).remove().draw();
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "The record has been deleted.",
                                        icon: "success"
                                    })
                                }).fail(function (xhr, state) {
                                    Swal.fire({
                                        title: "Delete error!",
                                        text: "It's has something wrong.",
                                        icon: "error"
                                    })
                                })

                            }
                        });
                        $("#modelEditplace").modal("hide");
                    });
                }).fail(function (xhr, state) {
                    alert(xhr.responeText);
                });
                $("#modelEditplace").modal("hide");

            }).fail(function (xhr, state) {
                alert(xhr.responeText);
            });
        } else if (checkEditmodeplace == 3) {
            $.ajax({
                method: 'POST',
                url: '/Editplace',
                data: { placeID: editIDplace, name_place: editnameplace, info_place: editinfoplace, price_place: editpriceplace, timeopen_place: editTimeopen, timeclose_place: editTimeclose, CloseDay: editDayclose, typeplaceID: editTypeplace }
            }).done(function (data, state, xhr) {
                // alert(data);
                $.ajax({
                    method: 'POST',
                    url: '/DataPlace',
                    data: { type: 3 }
                }).done(function (data, state, xhr) {
                    // alert(data);
                    table.clear();
                    table = $("#myTable").dataTable().fnDestroy();
                    $('#myTable').empty();
                    table = $('#myTable').DataTable({
                        responsive: true,
                        data: data,
                        columns: [
                            { data: "placeID", title: "รหัส" },
                            { data: "name_place", title: "ชื่อสถานที่" },
                            { data: "pic_place", title: "รูป" },
                            { data: "info_place", title: "ข้อมูล" },
                            { data: "price_place", title: "ราคาเข้าชม" },
                            { data: "timeopen_place", title: "เวลาเปิด" },
                            { data: "timeclose_place", title: "เวลาปิด" },
                            { data: "CloseDay", title: "วันปิดทำการ" },
                            { data: "nametype_place", title: "ประเทภสถานที่" },
                            { title: "Action", defaultContent: "<button class='btn btn-danger btnDeleteplace mr-2'>Delete</button><button class='btn btn-warning btnEditplace mr-2'>Edit</button>" }
                        ]
                    })
                    $("#myTable tbody").on("click", ".btnEditplace", function () {
                        const currentRow = $(this).parents("tr");
                        const tableallplace = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        console.log(tableallplace.placeID + " " + rowID);
                        console.log(tableallplace);
                        $("#EdittxtIDplace").val(tableallplace.placeID);
                        $("#EdittxtNameplace").val(tableallplace.name_place);
                        $("#EdittxtInfoplace").val(tableallplace.info_place);
                        $("#EditTimeOpen").val(tableallplace.timeopen_place);
                        $("#EditTimeClose").val(tableallplace.timeclose_place);
                        $("#EdittxtPriceplace").val(tableallplace.price_place);
                        $("#modelEditplace").modal("show");
                    });

                    $("#myTable tbody").on("click", ".btnDeleteplace", function () {
                        const currentRow = $(this).parents("tr");
                        let checktableplace = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        Swal.fire({
                            title: "Warning",
                            text: "Are you sure to delete ID " + checktableplace.placeID,
                            icon: "warning",
                            showCancelButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.ajax({
                                    method: 'POST',
                                    url: '/Deleteplace',
                                    data: { placeID: checktableplace.placeID }
                                }).done(function (data, state, xhr) {
                                    table.row(rowID).remove().draw();
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "The record has been deleted.",
                                        icon: "success"
                                    })
                                }).fail(function (xhr, state) {
                                    Swal.fire({
                                        title: "Delete error!",
                                        text: "It's has something wrong.",
                                        icon: "error"
                                    })
                                })

                            }
                        });
                        $("#modelEditplace").modal("hide");
                    });
                }).fail(function (xhr, state) {
                    alert(xhr.responeText);
                });
                $("#modelEditplace").modal("hide");
            }).fail(function (xhr, state) {
                alert(xhr.responeText);
            });
        } else if (checkEditmodeplace == 4) {
            $.ajax({
                method: 'POST',
                url: '/Editplace',
                data: { placeID: editIDplace, name_place: editnameplace, info_place: editinfoplace, price_place: editpriceplace, timeopen_place: editTimeopen, timeclose_place: editTimeclose, CloseDay: editDayclose, typeplaceID: editTypeplace }
            }).done(function (data, state, xhr) {
                // alert(data);
                $.ajax({
                    method: 'POST',
                    url: '/DataPlace',
                    data: { type: 4 }
                }).done(function (data, state, xhr) {
                    // alert(data);
                    table.clear();
                    table = $("#myTable").dataTable().fnDestroy();
                    $('#myTable').empty();
                    table = $('#myTable').DataTable({
                        responsive: true,
                        data: data,
                        columns: [
                            { data: "placeID", title: "รหัส" },
                            { data: "name_place", title: "ชื่อสถานที่" },
                            { data: "pic_place", title: "รูป" },
                            { data: "info_place", title: "ข้อมูล" },
                            { data: "price_place", title: "ราคาเข้าชม" },
                            { data: "timeopen_place", title: "เวลาเปิด" },
                            { data: "timeclose_place", title: "เวลาปิด" },
                            { data: "CloseDay", title: "วันปิดทำการ" },
                            { data: "nametype_place", title: "ประเทภสถานที่" },
                            { title: "Action", defaultContent: "<button class='btn btn-danger btnDeleteplace mr-2'>Delete</button><button class='btn btn-warning btnEditplace mr-2'>Edit</button>" }
                        ]
                    })
                    $("#myTable tbody").on("click", ".btnEditplace", function () {
                        const currentRow = $(this).parents("tr");
                        const tableallplace = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        console.log(tableallplace.placeID + " " + rowID);
                        console.log(tableallplace);
                        $("#EdittxtIDplace").val(tableallplace.placeID);
                        $("#EdittxtNameplace").val(tableallplace.name_place);
                        $("#EdittxtInfoplace").val(tableallplace.info_place);
                        $("#EditTimeOpen").val(tableallplace.timeopen_place);
                        $("#EditTimeClose").val(tableallplace.timeclose_place);
                        $("#EdittxtPriceplace").val(tableallplace.price_place);
                        $("#modelEditplace").modal("show");
                    });

                    $("#myTable tbody").on("click", ".btnDeleteplace", function () {
                        const currentRow = $(this).parents("tr");
                        let checktableplace = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        Swal.fire({
                            title: "Warning",
                            text: "Are you sure to delete ID " + checktableplace.placeID,
                            icon: "warning",
                            showCancelButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.ajax({
                                    method: 'POST',
                                    url: '/Deleteplace',
                                    data: { placeID: checktableplace.placeID }
                                }).done(function (data, state, xhr) {
                                    table.row(rowID).remove().draw();
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "The record has been deleted.",
                                        icon: "success"
                                    })
                                }).fail(function (xhr, state) {
                                    Swal.fire({
                                        title: "Delete error!",
                                        text: "It's has something wrong.",
                                        icon: "error"
                                    })
                                })

                            }
                        });
                        $("#modelEditplace").modal("hide");
                    });
                }).fail(function (xhr, state) {
                    alert(xhr.responeText);
                });
                $("#modelEditplace").modal("hide");
            }).fail(function (xhr, state) {
                alert(xhr.responeText);
            });
        }
    });

    $("#formAddhotel").submit(function (e) {
        e.preventDefault();
        const dataForm = new FormData(this);

        $.ajax({
            method: 'POST',
            url: '/Addhotel',
            data: dataForm,
            contentType: false,
            processData: false,
            success: function (response) {
                // alert(response);
                checkEditmodecar = 0;
                checkEditmodeplace = 0;
                table.clear();
                table = $("#myTable").dataTable().fnDestroy();
                $('#myTable').empty();
                $.ajax({
                    method: 'GET',
                    url: '/DataHotel'
                }).done(function (data, state, xhr) {
                    table = $('#myTable').DataTable({
                        responsive: true,
                        data: data,
                        columns: [
                            { data: "hotelID", title: "รหัส" },
                            { data: "name_hotel", title: "ชื่อ" },
                            { data: "pic_hotel", title: "รูป" },
                            { data: "price_per_day", title: "ราคาต่อวัน" },
                            { title: "Action", defaultContent: "<button class='btn btn-danger btnDeleteHotel mr-2'>Delete</button><button class='btn btn-warning btnEditHotel mr-2'>Edit</button>" }
                        ]

                    });

                    $("#myTable tbody").on("click", ".btnEdithotel", function () {
                        const currentRow = $(this).parents("tr");
                        const tableallhotel = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        console.log(tableallhotel.hotelID + " " + rowID);
                        console.log(tableallhotel);
                        $("#EdittxtIDhotel").val(tableallhotel.hotelID);
                        $("#EdittxtNamehotel").val(tableallhotel.name_hotel);
                        $("#EdittxtPricehotel").val(tableallhotel.price_per_day);
                        $("#modelEdithotel").modal("show");
                    });

                    $("#myTable tbody").on("click", ".btnDeletehotel", function () {
                        const currentRow = $(this).parents("tr");
                        let checktablehotel = table.row(currentRow).data();
                        rowID = table.row(currentRow).index();
                        Swal.fire({
                            title: "Warning",
                            text: "Are you sure to delete ID " + checktablehotel.hotelID,
                            icon: "warning",
                            showCancelButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.ajax({
                                    method: 'POST',
                                    url: '/Deletehotel',
                                    data: { hotelID: checktablehotel.hotelID }
                                }).done(function (data, state, xhr) {
                                    table.row(rowID).remove().draw();
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "The record has been deleted.",
                                        icon: "success"
                                    })
                                }).fail(function (xhr, state) {
                                    Swal.fire({
                                        title: "Delete error!",
                                        text: "It's has something wrong.",
                                        icon: "error"
                                    })
                                })

                            }
                        });
                    });

                }).fail(function (xhr, state) {

                })
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
        $("#txtNamehotel").val("");
        $("#txtPricehotel").val("");
        $("#gallery-hotel-add").val('');
        $(".galleryhotel img:last-child").remove();
        $("#modelAddhotel").modal("hide");

    });


    $("#btnSaveAddRoute").click(function () {
        // alert("test");
        let origin = $("#Route_Origin").val();
        let destination = $("#Route_Destination").val();
        let route_carid = $("#Route_carid").val();
        let price_route = $("#price_route").val();
        let time_route = $("#time_route").val();
        // alert(origin+" "+destination+" "+route_carid+" "+price_route+" "+time_route);
        if (origin == destination) {
            alert("Please don't select origin and destination in the same place!");
        } else {
            if (price_route == "") {
                alert("Please insert price of route!");
            } else {
                if (time_route == "") {
                    alert("Please insert time that use in this route!");
                } else {
                    $.ajax({
                        method: 'POST',
                        url: '/AddRoute',
                        data: { Origin: origin, Destination: destination, carID: route_carid, price_route: price_route, time_route: time_route, place_in_route: numberAddplaceinR }
                    }).done(function (data, state, xhr) {
                        // alert(data);
                        checkEditmodecar = 0;
                        checkEditmodeplace = 0;
                        $("#menushowplace").css("display", "none");
                        $("#menushowcar").css("display", "none");
                        $("#menushowHotel").css("display", "none");
                        $("#menushowRoute").css("display", "");
                        table.clear();
                        table = $("#myTable").dataTable().fnDestroy();
                        $('#myTable').empty();
                        $.ajax({
                            method: 'GET',
                            url: '/Routes'
                        }).done(function (data, state, xhr) {
                            console.log(data);
                            table = $('#myTable').DataTable({
                                responsive: true,
                                data: data,
                                columns: [
                                    { data: "Route_ID", title: "รหัส" },
                                    { data: "Origin", title: "ต้นทาง" },
                                    { data: "Destination", title: "ปลายทาง" },
                                    { data: "name_car", title: "ประเภทรถ" },
                                    { data: "price_route", title: "ราคาต่อการเดินทาง" },
                                    { data: "time_route", title: "เวลาที่ใช้ในการเดินทาง" },
                                    { data: "place_in_route", title: "สถานที่ระหว่างทาง" },
                                    { title: "Action", defaultContent: "<button class='btn btn-danger mr-2 btnDeleteRoute'>Delete</button><button class='btn btn-warning btnEditroute mr-2'>Edit</button>" }
                                ]

                            });

                            $("#myTable tbody").on("click", ".btnEditroute", function () {
                                const currentRow = $(this).parents("tr");
                                const tableallroute = table.row(currentRow).data();
                                rowID = table.row(currentRow).index();
                                console.log(tableallroute.Route_ID + " " + rowID);
                                console.log(tableallroute);
                                $.ajax({
                                    method: 'POST',
                                    url: '/DataCar',
                                }).done(function (data, state, xhr) {
                                    let createOption = "";
                                    for (let i = 0; i < data.length; i++) {
                                        createOption += "<option value='" + data[i].carID + "'>" + ("ชื่อ " + data[i].name_car + " ความจุ " + data[i].capacity) + "</option>";
                                    }
                                    $("#EditRoute_carid").html(createOption);
                                    $("#EditRoute_carid").val(tableallroute.carID);
                                    // $("#EditTypeplace").html(createOption);
                                }).fail(function (xhr, state) {
                                    alert(xhr.responeText);
                                });

                                $.ajax({
                                    method: 'POST',
                                    url: '/DataPlace',
                                }).done(function (data, state, xhr) {
                                    let createOption = "";
                                    for (let i = 0; i < data.length; i++) {
                                        createOption += "<option value='" + data[i].placeID + "'>" + data[i].name_place + "</option>";
                                    }
                                    $("#EditRoute_Origin").html(createOption);
                                    $("#EditRoute_Destination").html(createOption);
                                    $("#EditRoute_Origin").val(tableallroute.IDorigin);
                                    $("#EditRoute_Destination").val(tableallroute.IDdestination);
                                    // $("#EditTypeplace").html(createOption);
                                }).fail(function (xhr, state) {
                                    alert(xhr.responeText);
                                });
                                $("#EditRouteID").val(tableallroute.Route_ID);
                                $("#Editprice_route").val(tableallroute.price_route);
                                $("#Edittime_route").val(tableallroute.time_route);
                                $("#Editshowplace").text(numberEditplaceinR);
                                $("#modelEditRoute").modal("show");
                            });

                            $("#myTable tbody").on("click", ".btnDeleteRoute", function () {
                                const currentRow = $(this).parents("tr");
                                let checktableRoute = table.row(currentRow).data();
                                rowID = table.row(currentRow).index();
                                Swal.fire({
                                    title: "Warning",
                                    text: "Are you sure to delete ID " + checktableRoute.Route_ID,
                                    icon: "warning",
                                    showCancelButton: true
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        $.ajax({
                                            method: 'POST',
                                            url: '/DeleteRoute',
                                            data: { Route_ID: checktableRoute.Route_ID }
                                        }).done(function (data, state, xhr) {
                                            table.row(rowID).remove().draw();
                                            Swal.fire({
                                                title: "Deleted!",
                                                text: "The record has been deleted.",
                                                icon: "success"
                                            })
                                        }).fail(function (xhr, state) {
                                            Swal.fire({
                                                title: "Delete error!",
                                                text: "It's has something wrong.",
                                                icon: "error"
                                            })
                                        })

                                    }
                                });
                            });

                        }).fail(function (xhr, state) {
                            alert(xhr.responeText);
                        })
                        numberAddplaceinR = "";
                        $("#showplace").text(numberAddplaceinR);
                        $("#price_route").val("");
                        $("#time_route").val("");
                        $("#modelAddRoute").modal("hide");
                    }).fail(function (xhr, state) {
                        alert(xhr.responeText);
                    });
                }
            }
        }

    });

    $("#btnSaveEditRoute").click(function () {
        // alert("test");
        let route_id = $("#EditRouteID").val();
        let origin = $("#EditRoute_Origin").val();
        let destination = $("#EditRoute_Destination").val();
        let route_carid = $("#EditRoute_carid").val();
        let price_route = $("#Editprice_route").val();
        let time_route = $("#Edittime_route").val();
        // alert(route_id+" "+origin+" "+destination+" "+route_carid+" "+price_route+" "+time_route+" "+numberplaceinR);
        $.ajax({
            method: 'POST',
            url: '/EditRoute',
            data: { Route_ID: route_id, Origin: origin, Destination: destination, carID: route_carid, price_route: price_route, time_route: time_route, place_in_route: numberEditplaceinR }
        }).done(function (data, state, xhr) {
            table.clear();
            table = $("#myTable").dataTable().fnDestroy();
            $('#myTable').empty();
            $.ajax({
                method: 'GET',
                url: '/Routes'
            }).done(function (data, state, xhr) {
                console.log(data);
                table = $('#myTable').DataTable({
                    responsive: true,
                    data: data,
                    columns: [
                        { data: "Route_ID", title: "รหัส" },
                        { data: "Origin", title: "ต้นทาง" },
                        { data: "Destination", title: "ปลายทาง" },
                        { data: "name_car", title: "ประเภทรถ" },
                        { data: "price_route", title: "ราคาต่อการเดินทาง" },
                        { data: "time_route", title: "เวลาที่ใช้ในการเดินทาง" },
                        { data: "place_in_route", title: "สถานที่ระหว่างทาง" },
                        { title: "Action", defaultContent: "<button class='btn btn-danger mr-2 btnDeleteRoute'>Delete</button><button class='btn btn-warning btnEditroute mr-2'>Edit</button>" }
                    ]

                });

                $("#myTable tbody").on("click", ".btnEditroute", function () {
                    const currentRow = $(this).parents("tr");
                    const tableallroute = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    console.log(tableallroute.Route_ID + " " + rowID);
                    console.log(tableallroute);
                    $.ajax({
                        method: 'POST',
                        url: '/DataCar',
                    }).done(function (data, state, xhr) {
                        let createOption = "";
                        for (let i = 0; i < data.length; i++) {
                            createOption += "<option value='" + data[i].carID + "'>" + ("ชื่อ " + data[i].name_car + " ความจุ " + data[i].capacity) + "</option>";
                        }
                        $("#EditRoute_carid").html(createOption);
                        $("#EditRoute_carid").val(tableallroute.carID);
                        // $("#EditTypeplace").html(createOption);
                    }).fail(function (xhr, state) {
                        alert(xhr.responeText);
                    });

                    $.ajax({
                        method: 'POST',
                        url: '/DataPlace',
                    }).done(function (data, state, xhr) {
                        let createOption = "";
                        for (let i = 0; i < data.length; i++) {
                            createOption += "<option value='" + data[i].placeID + "'>" + data[i].name_place + "</option>";
                        }
                        $("#EditRoute_Origin").html(createOption);
                        $("#EditRoute_Destination").html(createOption);
                        $("#EditRoute_Origin").val(tableallroute.IDorigin);
                        $("#EditRoute_Destination").val(tableallroute.IDdestination);
                        // $("#EditTypeplace").html(createOption);
                    }).fail(function (xhr, state) {
                        alert(xhr.responeText);
                    });
                    $("#EditRouteID").val(tableallroute.Route_ID);
                    $("#Editprice_route").val(tableallroute.price_route);
                    $("#Edittime_route").val(tableallroute.time_route);
                    $("#Editshowplace").text(numberEditplaceinR);
                    $("#modelEditRoute").modal("show");
                });

                $("#myTable tbody").on("click", ".btnDeleteRoute", function () {
                    const currentRow = $(this).parents("tr");
                    let checktableRoute = table.row(currentRow).data();
                    rowID = table.row(currentRow).index();
                    Swal.fire({
                        title: "Warning",
                        text: "Are you sure to delete ID " + checktableRoute.Route_ID,
                        icon: "warning",
                        showCancelButton: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $.ajax({
                                method: 'POST',
                                url: '/DeleteRoute',
                                data: { Route_ID: checktableRoute.Route_ID }
                            }).done(function (data, state, xhr) {
                                table.row(rowID).remove().draw();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The record has been deleted.",
                                    icon: "success"
                                })
                            }).fail(function (xhr, state) {
                                Swal.fire({
                                    title: "Delete error!",
                                    text: "It's has something wrong.",
                                    icon: "error"
                                })
                            })

                        }
                    });
                });

                $("#modelEditRoute").modal("hide");

            }).fail(function (xhr, state) {
                alert(xhr.responeText);
            })
        }).fail(function (xhr, state, err) {
            alert(err);
        });
    });

    // navbar menu sign out
    $("#Adminlogout").click(function () {
        localStorage.id = 0;
        localStorage.role = 0;
        window.location.replace("/");
    });

    $("#btnCloseAddRoute").click(function () {
        $("#price_route").val("");
        $("#time_route").val("");
    })

    $("#btnCloseRoute").click(function () {
        $("#price_route").val("");
        $("#time_route").val("");
    })


    $("#btnCloseAddplace").click(function () {
        $("#gallery-photo-add").val('');
        $(".gallery img:last-child").remove();
    });

    $("#btnClosemodalplace").click(function () {
        // alert("test");
        $("#gallery-photo-add").val('');
        $(".gallery img:last-child").remove();
    });

    $("#btnCloseAddhotel").click(function () {
        $("#gallery-hotel-add").val('');
        $(".galleryhotel img:last-child").remove();
    });

    $("#btnClosemodalhotel").click(function () {
        // alert("test");
        $("#gallery-hotel-add").val('');
        $(".galleryhotel img:last-child").remove();
    });

});

$(function () {
    // Multiple images preview in browser
    var imagesPreview = function (input, placeToInsertImagePreview) {

        if (input.files) {
            var filesAmount = input.files.length;

            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = function (event) {
                    $($.parseHTML('<img class="col-12 rounded shadow m-3 p-0">')).attr('src', event.target.result).appendTo(placeToInsertImagePreview);
                }

                reader.readAsDataURL(input.files[i]);
            }
        }

    };

    $('#gallery-photo-add').on('change', function () {
        imagesPreview(this, 'div.gallery');
    });

});



$(function () {
    // Multiple images preview in browser
    var imagesPreview = function (input, placeToInsertImagePreview) {

        if (input.files) {
            var filesAmount = input.files.length;

            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = function (event) {
                    $($.parseHTML('<img class="col-12 rounded shadow m-3 p-0 Imageinput">')).attr('src', event.target.result).appendTo(placeToInsertImagePreview);
                }

                reader.readAsDataURL(input.files[i]);
            }
        }

    };

    $('#gallery-hotel-add').on('change', function () {
        imagesPreview(this, 'div.galleryhotel');
    });
});