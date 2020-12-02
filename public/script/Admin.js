$(document).ready(function () {
    var rowID;
    var table;
    var checkEditmodecar = 0;
    var checkEditmodeplace = 0;
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

    // table.clear();
    // table = $("#myTable").dataTable().fnDestroy();
    // $('#myTable').empty();

    table = $('#myTable').DataTable({
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
            { data: "price_car", title: "ราคา" },
            { data: "capacity", title: "ความจุ" },
            { data: "TypecarID", title: "ประเทภรถ" },
            { title: "Action", defaultContent: "<button class='btn btn-danger btnDeletecar mr-2'>Delete</button><button class='btn btn-warning btnEditcar mr-2'>Edit</button>" }
        ]
    })

    $("#menushowplace").css("display", "none");
    $("#menushowHotel").css("display", "none");
    // $("#menuTable").html("<a class='nav-link px-3' style='cursor: pointer;' id='menuallcar'>ทั้งหมด</a><a class='nav-link px-3' id='menubus' style='border-left: 1px solid #666666; cursor: pointer;'>รถประจำทาง</a><a class='nav-link px-3' id='menutaxi' style='border-left: 1px solid #666666; cursor: pointer;'>รถรับจ้าง</a>");

    // menubar 
    $("#menuallcar").click(function () {
        checkEditmodecar = 0;
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        table = $('#myTable').DataTable({
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
                { data: "price_car", title: "ราคา" },
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
            $("#EdittxtPricecar").val(tableallCar.price_car);
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
                data: data,
                columns: [
                    { data: "carID", title: "รหัส" },
                    { data: "name_car", title: "ชื่อ" },
                    { data: "price_car", title: "ราคา" },
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
                $("#EdittxtPricecar").val(tableallCar.price_car);
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
                data: data,
                columns: [
                    { data: "carID", title: "รหัส" },
                    { data: "name_car", title: "ชื่อ" },
                    { data: "price_car", title: "ราคา" },
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
                $("#EdittxtPricecar").val(tableallCar.price_car);
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

    // modal add data
    $("#btnAdd").click(function () {
        let dropdown = $("#dropdownMenu").val();
        if (dropdown == 1) {
            $("#modelcar").modal("show");
        } else if (dropdown == 2) {
            $("#modelplace").modal("show");
        } else if (dropdown == 3) {
            $("#modelAddhotel").modal("show");
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
        $("#modelplace").modal("hide");
    });

    $("#btnSaveAddcar").click(function () {
        let typecar = $("#AddTypecar").val();
        let NameCar = $("#txtNamecar").val();
        let PriceCar = $("#txtPricecar").val();
        let Capa = $("#txtCapacity").val();
        // alert(typecar+" "+NameCar+" "+PriceCar+" "+Capa);
        if (NameCar != "" && PriceCar != "") {
            if (Capa != "" && NameCar != "") {
                $.ajax({
                    method: 'POST',
                    url: '/Addcar',
                    data: { name_car: NameCar, price_car: PriceCar, capacity: Capa, TypecarID: typecar }
                }).done(function (err, result) {
                    // table.clear();
                    table = $("#myTable").dataTable().fnDestroy();
                    $('#myTable').empty();
                    table = $('#myTable').DataTable({
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
                            { data: "price_car", title: "ราคา" },
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
                        $("#EdittxtPricecar").val(tableallCar.price_car);
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
                    $("#modelcar").modal("hide");
                }).fail(function (err, result) {
                    Swal.fire({
                        title: "Add error!",
                        text: "It's has something wrong.",
                        icon: "error"
                    })
                });
            }
        }


    });

    $("#btnClosecar").click(function () {
        $("#txtNamecar").val("");
        $("#txtPricecar").val("");
        $("#txtCapacity").val("");
    });

    $("#btnresetRunnum").click(function () {
        $("#txtNamecar").val("");
        $("#txtPricecar").val("");
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
            // $("#menuTable").html("<a class='nav-link px-3' style='cursor: pointer;' id='menuallcar'>ทั้งหมด</a><a class='nav-link px-3' id='menubus' style='border-left: 1px solid #666666; cursor: pointer;'>รถประจำทาง</a><a class='nav-link px-3' id='menutaxi' style='border-left: 1px solid #666666; cursor: pointer;'>รถรับจ้าง</a>");
            table.clear();
            table = $("#myTable").dataTable().fnDestroy();
            $('#myTable').empty();
            table = $('#myTable').DataTable({
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
                    { data: "price_car", title: "ราคา" },
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
                $("#EdittxtPricecar").val(tableallCar.price_car);
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
            // $("#menuTable").html("<a class='nav-link px-3' style='cursor: pointer;'>ทั้งหมด</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>ทั่วไป</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>วัด</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>สถานที่บันเทิง</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>ที่ท่องเที่ยวธรรมชาติ</a>");
            table.clear();
            table = $("#myTable").dataTable().fnDestroy();
            $('#myTable').empty();
            table = $('#myTable').DataTable({
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


        } 
        // else if (dropdown == 3) {
        //     checkEditmodecar = 0;
        //     checkEditmodeplace = 0;
        //     $("#menushowplace").css("display", "none");
        //     $("#menushowcar").css("display", "none");
        //     $("#menushowHotel").css("display", "");
        //     table.clear();
        //     table = $("#myTable").dataTable().fnDestroy();
        //     $('#myTable').empty();
            
        // }
    });



    // edit data car
    $("#myTable tbody").on("click", ".btnEditcar", function () {
        const currentRow = $(this).parents("tr");
        const tableallCar = table.row(currentRow).data();
        rowID = table.row(currentRow).index();
        console.log(tableallCar.carID + " " + rowID);
        $("#EdittxtIdcar").val(tableallCar.carID);
        $("#EdittxtNamecar").val(tableallCar.name_car);
        $("#EdittxtPricecar").val(tableallCar.price_car);
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
        const editpricecar = $("#EdittxtPricecar").val();
        const editCapacity = $("#EdittxtCapacity").val();
        const editTypecar = $("#EditTypecar").val();
        // alert(editIDcar+" "+editnamecar+" "+editpricecar+" "+editCapacity+" "+editTypecar);
        $.ajax({
            method: 'POST',
            url: '/Editcar',
            data: { carID: editIDcar, name_car: editnamecar, price_car: editpricecar, capacity: editCapacity, TypecarID: editTypecar }
        }).done(function (data, state, xhr) {
            if (checkEditmodecar == 0) {
                table.clear();
                table = $("#myTable").dataTable().fnDestroy();
                $('#myTable').empty();
                table = $('#myTable').DataTable({
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
                        { data: "price_car", title: "ราคา" },
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
                    $("#EdittxtPricecar").val(tableallCar.price_car);
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
                        data: data,
                        columns: [
                            { data: "carID", title: "รหัส" },
                            { data: "name_car", title: "ชื่อ" },
                            { data: "price_car", title: "ราคา" },
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
                        $("#EdittxtPricecar").val(tableallCar.price_car);
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
                        data: data,
                        columns: [
                            { data: "carID", title: "รหัส" },
                            { data: "name_car", title: "ชื่อ" },
                            { data: "price_car", title: "ราคา" },
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
                        $("#EdittxtPricecar").val(tableallCar.price_car);
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

    // $("#formAddhotel").submit(function (e) {
    //     e.preventDefault();
    //     const dataForm = new FormData(this);

    //     $.ajax({
    //         method: 'POST',
    //         url: '/Addhotel',
    //         data: dataForm,
    //         contentType: false,
    //         processData: false,
    //         success: function (response) {
    //             alert(response);
    //             // checkEditmodecar = 0;
    //             // checkEditmodeplace = 0;
    //             // table.clear();
    //             // table = $("#myTable").dataTable().fnDestroy();
    //             // $('#myTable').empty();
    //             // table = $('#myTable').DataTable({
    //             //     ajax: {
    //             //         method: 'GET',
    //             //         url: "/DataHotel"
    //             //     },
    //                 // columns: [
    //                 //     { data: "hotelID", title: "รหัส" },
    //                 //     { data: "name_hotel", title: "ชื่อ" },
    //                 //     { data: "pic_hotel", title: "รูป" },
    //                 //     { data: "price_per_day", title: "ราคาต่อวัน" },
    //                 //     { title: "Action", defaultContent: "<button class='btn btn-danger btnDeleteHotel mr-2'>Delete</button><button class='btn btn-warning btnEditHotel mr-2'>Edit</button>" }
    //                 // ]

    //             // });

    //             // $("#myTable tbody").on("click", ".btnEditplace", function () {
    //             //     const currentRow = $(this).parents("tr");
    //             //     const tableallplace = table.row(currentRow).data();
    //             //     rowID = table.row(currentRow).index();
    //             //     console.log(tableallplace.placeID + " " + rowID);
    //             //     console.log(tableallplace);
    //             //     $("#EdittxtIDplace").val(tableallplace.placeID);
    //             //     $("#EdittxtNameplace").val(tableallplace.name_place);
    //             //     $("#EdittxtInfoplace").val(tableallplace.info_place);
    //             //     $("#EditTimeOpen").val(tableallplace.timeopen_place);
    //             //     $("#EditTimeClose").val(tableallplace.timeclose_place);
    //             //     $("#EdittxtPriceplace").val(tableallplace.price_place);
    //             //     $("#modelEditplace").modal("show");
    //             // });

    //             // $("#myTable tbody").on("click", ".btnDeleteplace", function () {
    //             //     const currentRow = $(this).parents("tr");
    //             //     let checktableplace = table.row(currentRow).data();
    //             //     rowID = table.row(currentRow).index();
    //             //     Swal.fire({
    //             //         title: "Warning",
    //             //         text: "Are you sure to delete ID " + checktableplace.placeID,
    //             //         icon: "warning",
    //             //         showCancelButton: true
    //             //     }).then((result) => {
    //             //         if (result.isConfirmed) {
    //             //             $.ajax({
    //             //                 method: 'POST',
    //             //                 url: '/Deleteplace',
    //             //                 data: { placeID: checktableplace.placeID }
    //             //             }).done(function (data, state, xhr) {
    //             //                 table.row(rowID).remove().draw();
    //             //                 Swal.fire({
    //             //                     title: "Deleted!",
    //             //                     text: "The record has been deleted.",
    //             //                     icon: "success"
    //             //                 })
    //             //             }).fail(function (xhr, state) {
    //             //                 Swal.fire({
    //             //                     title: "Delete error!",
    //             //                     text: "It's has something wrong.",
    //             //                     icon: "error"
    //             //                 })
    //             //             })

    //             //         }
    //             //     });
    //             // });
    //         },
    //         error: function (xhr) {
    //             alert(xhr.responseText);
    //         }
    //     });
    //     $("#modelAddhotel").modal("hide");

    // });

    // navbar menu sign out
    $("#Adminlogout").click(function () {
        localStorage.id = 0;
        window.location.replace("/");
    });


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