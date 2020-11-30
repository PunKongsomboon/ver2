$(document).ready(function () {
    var rowID;
    var selectCarType = 0;
    var newrunNumbus;
    var newrunNumtaxi;
    
    // display data
    // var car = $.merge($.merge([], bus), taxi);
    // var place = $.merge($.merge($.merge($.merge([], normalTypeplace), template), Entertainment), natural);
    // console.log(car);
    // console.log(place);


    // table.clear();
    // table = $("#myTable").dataTable().fnDestroy();
    // $('#myTable').empty();
    var table = $('#myTable').DataTable({
        data: "",
        columns: [
            { title: "รหัส" },
            { title: "ชื่อรถ" },
            { title: "ราคา" },
            { title: "จุดเริ่มต้น" },
            { title: "จุดปลายทาง" },
            { title: "ความจุ" },
            { title: "ใช้เวลาเดินทาง / นาที" },
            { title: "Action", orderable: false, defaultContent: "<a class='btn btn-warning mx-auto'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }

        ]
    })

    $("#menushowplace").css("display", "none");
    $("#menushowHotel").css("display", "none");
    // $("#menuTable").html("<a class='nav-link px-3' style='cursor: pointer;' id='menuallcar'>ทั้งหมด</a><a class='nav-link px-3' id='menubus' style='border-left: 1px solid #666666; cursor: pointer;'>รถประจำทาง</a><a class='nav-link px-3' id='menutaxi' style='border-left: 1px solid #666666; cursor: pointer;'>รถรับจ้าง</a>");

    // menubar 
    $("#menuallcar").click(function () {
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        table = $('#myTable').DataTable({
            data: "",
            columns: [
                { title: "รหัส" },
                { title: "ชื่อรถ" },
                { title: "ราคา" },
                { title: "จุดเริ่มต้น" },
                { title: "จุดปลายทาง" },
                { title: "ความจุ" },
                { title: "ใช้เวลาเดินทาง / นาที" },
                { title: "Action", orderable: false, defaultContent: "<a class='btn mx-auto btn-warning'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }
            ]
        })
        $("#myTable tbody").on("click", ".btn-warning", function () {
            const currentRow = $(this).parents("tr");
            const tableallCar = table.row(currentRow).data();
            rowID = table.row(currentRow).index();
            // console.log(testdata.idcar + " " + rowID);
            // $("#EdittxtIdcar").val(tableallCar.idcar);
            // $("#EdittxtNamecar").val(tableallCar.namecar);
            // $("#EdittxtPricecar").val(tableallCar.pricecar);
            // $("#EdittxtPointStartcar").val(tableallCar.pointStartcar);
            // $("#EdittxtPointEndcar").val(tableallCar.pointEndcar);
            $("#modelEditcar").modal("show");
        });
        $("#myTable tbody").on("click", ".btn-danger", function () {
            // const currentRow = $(this).parents("tr");
            // let checktableCar = table.row(currentRow).data();
            // rowID = table.row(currentRow).index();
            // Swal.fire({
            //     title: "Warning",
            //     text: "Are you sure to delete ID " + car[rowID].idcar,
            //     icon: "warning",
            //     showCancelButton: true
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         let checkEditcar = checktableCar.idcar[0];
            //         if (checkEditcar == 1) {
            //             for (let i = 0; i < bus.length; i++) {
            //                 if (checktableCar.idcar == bus[i].idcar) {
            //                     bus.splice(i, 1);
            //                     break;
            //                 }
            //             }
            //             console.log(bus);
            //             car = $.merge($.merge([], bus), taxi);
            //             table.row(rowID).remove().draw();

            //         } else if (checkEditcar == 2) {
            //             for (let i = 0; i < taxi.length; i++) {
            //                 if (checktableCar.idcar == taxi[i].idcar) {
            //                     taxi.splice(i, 1);
            //                     break;
            //                 }
            //             }
            //             console.log(taxi);
            //             car = $.merge($.merge([], bus), taxi);
            //             table.row(rowID).remove().draw();
            //         }
            //         Swal.fire({
            //             title: "Deleted!",
            //             text: "The record has been deleted.",
            //             icon: "success"
            //         })
            //     }
            // });
        });
    });
    $("#menubus").click(function () {
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        table = $('#myTable').DataTable({
            data: "",
            columns: [
                { title: "รหัส" },
                { title: "ชื่อรถ" },
                { title: "ราคา" },
                { title: "จุดเริ่มต้น" },
                { title: "จุดปลายทาง" },
                { title: "ความจุ" },
                { title: "ใช้เวลาเดินทาง / นาที" },
                { title: "Action", orderable: false, defaultContent: "<a class='btn mx-auto btn-warning'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }
            ]
        })
        $("#myTable tbody").on("click", ".btn-warning", function () {
            // const currentRow = $(this).parents("tr");
            // const tableallCar = table.row(currentRow).data();
            // rowID = table.row(currentRow).index();
            // // console.log(testdata.idcar + " " + rowID);
            // $("#EdittxtIdcar").val(tableallCar.idcar);
            // $("#EdittxtNamecar").val(tableallCar.namecar);
            // $("#EdittxtPricecar").val(tableallCar.pricecar);
            // $("#EdittxtPointStartcar").val(tableallCar.pointStartcar);
            // $("#EdittxtPointEndcar").val(tableallCar.pointEndcar);
            // $("#modelEditcar").modal("show");
        });
        $("#myTable tbody").on("click", ".btn-danger", function () {
            // const currentRow = $(this).parents("tr");
            // let checktableCar = table.row(currentRow).data();
            // rowID = table.row(currentRow).index();
            // Swal.fire({
            //     title: "Warning",
            //     text: "Are you sure to delete ID " + bus[rowID].idcar,
            //     icon: "warning",
            //     showCancelButton: true
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         for (let i = 0; i < bus.length; i++) {
            //             if (checktableCar.idcar == bus[i].idcar) {
            //                 bus.splice(i, 1);
            //                 break;
            //             }
            //         }
            //         console.log(bus);
            //         car = $.merge($.merge([], bus), taxi);
            //         table.row(rowID).remove().draw();
            //         Swal.fire({
            //             title: "Deleted!",
            //             text: "The record has been deleted.",
            //             icon: "success"
            //         })
            //     }
            // });
        });

    });

    $("#menutaxi").click(function () {
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        table = $('#myTable').DataTable({
            data: "",
            columns: [
                { title: "รหัส" },
                { title: "ชื่อรถ" },
                { title: "ราคา" },
                { title: "จุดเริ่มต้น" },
                { title: "จุดปลายทาง" },
                { title: "ความจุ" },
                { title: "ใช้เวลาเดินทาง / นาที" },
                { title: "Action", orderable: false, defaultContent: "<a class='btn mx-auto btn-warning'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }
            ]
        })
        $("#myTable tbody").on("click", ".btn-warning", function () {
            // const currentRow = $(this).parents("tr");
            // const tableallCar = table.row(currentRow).data();
            // rowID = table.row(currentRow).index();
            // // console.log(testdata.idcar + " " + rowID);
            // $("#EdittxtIdcar").val(tableallCar.idcar);
            // $("#EdittxtNamecar").val(tableallCar.namecar);
            // $("#EdittxtPricecar").val(tableallCar.pricecar);
            // $("#EdittxtPointStartcar").val(tableallCar.pointStartcar);
            // $("#EdittxtPointEndcar").val(tableallCar.pointEndcar);
            // $("#modelEditcar").modal("show");
        });

        $("#myTable tbody").on("click", ".btn-danger", function () {
            // const currentRow = $(this).parents("tr");
            // let checktableCar = table.row(currentRow).data();
            // rowID = table.row(currentRow).index();
            // Swal.fire({
            //     title: "Warning",
            //     text: "Are you sure to delete ID " + taxi[rowID].idcar,
            //     icon: "warning",
            //     showCancelButton: true
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         for (let i = 0; i < taxi.length; i++) {
            //             if (checktableCar.idcar == taxi[i].idcar) {
            //                 taxi.splice(i, 1);
            //                 break;
            //             }
            //         }
            //         console.log(taxi);
            //         car = $.merge($.merge([], bus), taxi);
            //         table.row(rowID).remove().draw();
            //         Swal.fire({
            //             title: "Deleted!",
            //             text: "The record has been deleted.",
            //             icon: "success"
            //         })
            //     }
            // });
        });

    });

    $("#menuallplace").click(function () {
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        table = $('#myTable').DataTable({
            data: "",
            columns: [
                { title: "รหัส" },
                { title: "ชื่อสถานที่" },
                { title: "ข้อมูลสถานที่" },
                { title: "เวลาเปิดทำการ" },
                { title: "เวลาปิดทำการ" },
                { title: "วันปิดทำการ" },
                { title: "ราคาเข้าชม" },
                { title: "เวลาในการเที่ยว / นาที" },
                { title: "Action", orderable: false, defaultContent: "<a class='btn mx-auto btn-warning'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }
            ]
        });

    });

    $("#menunormal").click(function () {
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        table = $('#myTable').DataTable({
            data: "",
            columns: [
                { title: "รหัส" },
                { title: "ชื่อสถานที่" },
                { title: "ข้อมูลสถานที่" },
                { title: "เวลาเปิดทำการ" },
                { title: "เวลาปิดทำการ" },
                { title: "วันปิดทำการ" },
                { title: "ราคาเข้าชม" },
                { title: "เวลาในการเที่ยว / นาที" },
                { orderable: false, defaultContent: "<a class='btn mx-auto btn-warning'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }
            ]
        });
    });

    $("#menutem").click(function () {
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        table = $('#myTable').DataTable({
            data: "",
            columns: [
                { title: "รหัส" },
                { title: "ชื่อสถานที่" },
                { title: "ข้อมูลสถานที่" },
                { title: "เวลาเปิดทำการ" },
                { title: "เวลาปิดทำการ" },
                { title: "วันปิดทำการ" },
                { title: "ราคาเข้าชม" },
                { title: "เวลาในการเที่ยว / นาที" },
                { title: "Action", orderable: false, defaultContent: "<a class='btn mx-auto btn-warning'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }
            ]
        });
    });

    $("#menuen").click(function () {
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        table = $('#myTable').DataTable({
            data: "",
            columns: [
                { title: "รหัส" },
                { title: "ชื่อสถานที่" },
                { title: "ข้อมูลสถานที่" },
                { title: "เวลาเปิดทำการ" },
                { title: "เวลาปิดทำการ" },
                { title: "วันปิดทำการ" },
                { title: "ราคาเข้าชม" },
                { title: "เวลาในการเที่ยว / นาที" },
                { title: "Action", orderable: false, defaultContent: "<a class='btn mx-auto btn-warning'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }
            ]
        });
    });

    $("#menunat").click(function () {
        table.clear();
        table = $("#myTable").dataTable().fnDestroy();
        $('#myTable').empty();
        table = $('#myTable').DataTable({
            data: "",
            columns: [
                { title: "รหัส" },
                { title: "ชื่อสถานที่" },
                { title: "ข้อมูลสถานที่" },
                { title: "เวลาเปิดทำการ" },
                { title: "เวลาปิดทำการ" },
                { title: "วันปิดทำการ" },
                { title: "ราคาเข้าชม" },
                { title: "เวลาในการเที่ยว / นาที" },
                { title: "Action", orderable: false, defaultContent: "<a class='btn mx-auto btn-warning'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }
            ]
        });
    });

    // modal add data
    $("#btnAdd").click(function () {
        // let dropdown = $("#dropdownMenu").val();
        // if (dropdown == 1) {
        //     if (bus.length == 0) {
        //         newrunNumbus = 1;
        //         $("#txtIdcar").val("1" + newrunNumbus);
        //     } else if (bus.length > 0) {
        //         let runNumbus = bus[(bus.length) - 1].idcar;
        //         newrunNumbus = runNumbus.substring(1, runNumbus.length);
        //         newrunNumbus++;

        //     }
        //     if (taxi.length == 0) {
        //         newrunNumtaxi = 1;
        //         $("#txtIdcar").val("2" + newrunNumtaxi);
        //     } else if (bus.length > 0) {
        //         let runNumtaxi = taxi[(taxi.length) - 1].idcar;
        //         newrunNumtaxi = runNumtaxi.substring(1, runNumtaxi.length);
        //         newrunNumtaxi++;

        //     }
        //     if ($("#radioBus").is(":checked")) {
        //         selectCarType = 0;
        //         $("#txtIdcar").val("1" + newrunNumbus);
        //     } else if ($("#radioTaxi").is(":checked")) {
        //         selectCarType = 1;
        //         $("#txtIdcar").val("2" + newrunNumtaxi);

        //     }
        //     $("#modelcar").modal("show");
        // } else if (dropdown == 2) {
        //     $("#modelplace").modal("show");
        // }

    });

    $("#radioBus").click(function () {
        // selectCarType = 0;
        // $("#txtIdcar").val("1" + newrunNumbus);
    });
    $("#radioTaxi").click(function () {
        // selectCarType = 1;
        // $("#txtIdcar").val("2" + newrunNumtaxi);
    });

    $("#btnSaveAddcar").click(function () {
        // let IdCar = $("#txtIdcar").val();
        // let NameCar = $("#txtNamecar").val();
        // let PriceCar = $("#txtPricecar").val();
        // let pstartCar = $("#txtPointStartcar").val();
        // let pEndCar = $("#txtPointEndcar").val();
        // if (selectCarType == 0) {
        //     if (IdCar != "" && NameCar != "") {
        //         if (PriceCar != "" && pstartCar != "") {
        //             if (pEndCar != "") {
        //                 bus.push({ "idcar": IdCar, "namecar": NameCar, "pricecar": PriceCar, "pointStartcar": pstartCar, "pointEndcar": pEndCar });
        //                 console.log(bus);
        //                 car = $.merge($.merge([], bus), taxi);
        //                 table.clear();
        //                 table = $("#myTable").dataTable().fnDestroy();
        //                 $('#myTable').empty();
        //                 table = $('#myTable').DataTable({
        //                     data: car,
        //                     columns: [
        //                         { data: "idcar", title: "รหัส" },
        //                         { data: "namecar", title: "ชื่อรถ" },
        //                         { data: "pricecar", title: "ราคา" },
        //                         { data: "pointStartcar", title: "จุดเริ่มต้น" },
        //                         { data: "pointEndcar", title: "จุดปลายทาง" },
        //                         { data: "Capacity", title: "ความจุ" },
        //                         { data: "timeTravel", title: "ใช้เวลาเดินทาง / นาที" },
        //                         { title: "Action", orderable: false, defaultContent: "<a class='btn mx-auto btn-warning'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }
        //                     ]
        //                 });
        //                 $("#myTable tbody").on("click", ".btn-warning", function () {
        //                     const currentRow = $(this).parents("tr");
        //                     const tableallCar = table.row(currentRow).data();
        //                     rowID = table.row(currentRow).index();
        //                     // console.log(testdata.idcar + " " + rowID);
        //                     $("#EdittxtIdcar").val(tableallCar.idcar);
        //                     $("#EdittxtNamecar").val(tableallCar.namecar);
        //                     $("#EdittxtPricecar").val(tableallCar.pricecar);
        //                     $("#EdittxtPointStartcar").val(tableallCar.pointStartcar);
        //                     $("#EdittxtPointEndcar").val(tableallCar.pointEndcar);
        //                     $("#modelEditcar").modal("show");
        //                 });
        //                 $("#myTable tbody").on("click", ".btn-danger", function () {
        //                     const currentRow = $(this).parents("tr");
        //                     let checktableCar = table.row(currentRow).data();
        //                     rowID = table.row(currentRow).index();
        //                     Swal.fire({
        //                         title: "Warning",
        //                         text: "Are you sure to delete ID " + car[rowID].idcar,
        //                         icon: "warning",
        //                         showCancelButton: true
        //                     }).then((result) => {
        //                         if (result.isConfirmed) {
        //                             let checkEditcar = checktableCar.idcar[0];
        //                             if (checkEditcar == 1) {
        //                                 for (let i = 0; i < bus.length; i++) {
        //                                     if (checktableCar.idcar == bus[i].idcar) {
        //                                         bus.splice(i, 1);
        //                                         break;
        //                                     }
        //                                 }
        //                                 console.log(bus);
        //                                 car = $.merge($.merge([], bus), taxi);
        //                                 table.row(rowID).remove().draw();

        //                             } else if (checkEditcar == 2) {
        //                                 for (let i = 0; i < taxi.length; i++) {
        //                                     if (checktableCar.idcar == taxi[i].idcar) {
        //                                         taxi.splice(i, 1);
        //                                         break;
        //                                     }
        //                                 }
        //                                 console.log(taxi);
        //                                 car = $.merge($.merge([], bus), taxi);
        //                                 table.row(rowID).remove().draw();
        //                             }
        //                             Swal.fire({
        //                                 title: "Deleted!",
        //                                 text: "The record has been deleted.",
        //                                 icon: "success"
        //                             })
        //                         }
        //                     });
        //                 });
        //                 $("#txtNamecar").val("");
        //                 $("#txtPricecar").val("");
        //                 $("#txtPointStartcar").val("");
        //                 $("#txtPointEndcar").val("");
        //                 $("#modelcar").modal("hide");
        //                 // alert(IdCar + " " + NameCar + " " + PriceCar + " " + pstartCar + " " + pEndCar);
        //             } else {
        //                 alert("Please complete your information!");
        //             }
        //         } else {
        //             alert("Please complete your information!");
        //         }
        //     } else {
        //         alert("Please complete your information!");
        //     }
        // } else if (selectCarType == 1) {
        //     if (IdCar != "" && NameCar != "") {
        //         if (PriceCar != "" && pstartCar != "") {
        //             if (pEndCar != "") {
        //                 taxi.push({ "idcar": IdCar, "namecar": NameCar, "pricecar": PriceCar, "pointStartcar": pstartCar, "pointEndcar": pEndCar });
        //                 console.log(taxi);
        //                 car = $.merge($.merge([], bus), taxi);
        //                 table.clear();
        //                 table = $("#myTable").dataTable().fnDestroy();
        //                 $('#myTable').empty();
        //                 table = $('#myTable').DataTable({
        //                     data: car,
        //                     columns: [
        //                         { data: "idcar", title: "รหัส" },
        //                         { data: "namecar", title: "ชื่อรถ" },
        //                         { data: "pricecar", title: "ราคา" },
        //                         { data: "pointStartcar", title: "จุดเริ่มต้น" },
        //                         { data: "pointEndcar", title: "จุดปลายทาง" },
        //                         { data: "Capacity", title: "ความจุ" },
        //                         { data: "timeTravel", title: "ใช้เวลาเดินทาง / นาที" },
        //                         { title: "Action", orderable: false, defaultContent: "<a class='btn mx-auto btn-warning'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }
        //                     ]
        //                 });
        //                 $("#myTable tbody").on("click", ".btn-warning", function () {
        //                     const currentRow = $(this).parents("tr");
        //                     const tableallCar = table.row(currentRow).data();
        //                     rowID = table.row(currentRow).index();
        //                     // console.log(testdata.idcar + " " + rowID);
        //                     $("#EdittxtIdcar").val(tableallCar.idcar);
        //                     $("#EdittxtNamecar").val(tableallCar.namecar);
        //                     $("#EdittxtPricecar").val(tableallCar.pricecar);
        //                     $("#EdittxtPointStartcar").val(tableallCar.pointStartcar);
        //                     $("#EdittxtPointEndcar").val(tableallCar.pointEndcar);
        //                     $("#modelEditcar").modal("show");
        //                 });
        //                 $("#myTable tbody").on("click", ".btn-danger", function () {
        //                     const currentRow = $(this).parents("tr");
        //                     let checktableCar = table.row(currentRow).data();
        //                     rowID = table.row(currentRow).index();
        //                     Swal.fire({
        //                         title: "Warning",
        //                         text: "Are you sure to delete ID " + car[rowID].idcar,
        //                         icon: "warning",
        //                         showCancelButton: true
        //                     }).then((result) => {
        //                         if (result.isConfirmed) {
        //                             let checkEditcar = checktableCar.idcar[0];
        //                             if (checkEditcar == 1) {
        //                                 for (let i = 0; i < bus.length; i++) {
        //                                     if (checktableCar.idcar == bus[i].idcar) {
        //                                         bus.splice(i, 1);
        //                                         break;
        //                                     }
        //                                 }
        //                                 console.log(bus);
        //                                 car = $.merge($.merge([], bus), taxi);
        //                                 table.row(rowID).remove().draw();

        //                             } else if (checkEditcar == 2) {
        //                                 for (let i = 0; i < taxi.length; i++) {
        //                                     if (checktableCar.idcar == taxi[i].idcar) {
        //                                         taxi.splice(i, 1);
        //                                         break;
        //                                     }
        //                                 }
        //                                 console.log(taxi);
        //                                 car = $.merge($.merge([], bus), taxi);
        //                                 table.row(rowID).remove().draw();
        //                             }
        //                             Swal.fire({
        //                                 title: "Deleted!",
        //                                 text: "The record has been deleted.",
        //                                 icon: "success"
        //                             })
        //                         }
        //                     });
        //                 });
        //                 $("#txtNamecar").val("");
        //                 $("#txtPricecar").val("");
        //                 $("#txtPointStartcar").val("");
        //                 $("#txtPointEndcar").val("");
        //                 $("#modelcar").modal("hide");
        //                 // alert(IdCar + " " + NameCar + " " + PriceCar + " " + pstartCar + " " + pEndCar);
        //             } else {
        //                 alert("Please complete your information!");
        //             }
        //         } else {
        //             alert("Please complete your information!");
        //         }
        //     } else {
        //         alert("Please complete your information!");
        //     }

        // }

    });

    $("#btnClosecar").click(function () {
        $("#txtNamecar").val("");
        $("#txtPricecar").val("");
        $("#txtPointStartcar").val("");
        $("#txtPointEndcar").val("");
    });

    $("#btnresetRunnum").click(function () {
        $("#txtNamecar").val("");
        $("#txtPricecar").val("");
        $("#txtPointStartcar").val("");
        $("#txtPointEndcar").val("");
    });

    // select display data
    $("#dropdownMenu").change(function () {
        // let dropdown = $(this).val();
        // if (dropdown == 1) {
        //     $("#menushowplace").css("display", "none");
        //     $("#menushowHotel").css("display", "none");
        //     $("#menushowcar").css("display", "");
        //     // $("#menuTable").html("<a class='nav-link px-3' style='cursor: pointer;' id='menuallcar'>ทั้งหมด</a><a class='nav-link px-3' id='menubus' style='border-left: 1px solid #666666; cursor: pointer;'>รถประจำทาง</a><a class='nav-link px-3' id='menutaxi' style='border-left: 1px solid #666666; cursor: pointer;'>รถรับจ้าง</a>");
        //     table.clear();
        //     table = $("#myTable").dataTable().fnDestroy();
        //     $('#myTable').empty();
        //     table = $('#myTable').DataTable({
        //         data: car,
        //         columns: [
        //             { data: "idcar", title: "รหัส" },
        //             { data: "namecar", title: "ชื่อรถ" },
        //             { data: "pricecar", title: "ราคา" },
        //             { data: "pointStartcar", title: "จุดเริ่มต้น" },
        //             { data: "pointEndcar", title: "จุดปลายทาง" },
        //             { data: "Capacity", title: "ความจุ" },
        //             { data: "timeTravel", title: "ใช้เวลาเดินทาง / นาที" },
        //             { title: "Action", orderable: false, defaultContent: "<a class='btn mx-auto btn-warning'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }
        //         ]
        //     })
        //     $("#myTable tbody").on("click", ".btn-warning", function () {
        //         const currentRow = $(this).parents("tr");
        //         const tableallCar = table.row(currentRow).data();
        //         rowID = table.row(currentRow).index();
        //         // console.log(testdata.idcar + " " + rowID);
        //         $("#EdittxtIdcar").val(tableallCar.idcar);
        //         $("#EdittxtNamecar").val(tableallCar.namecar);
        //         $("#EdittxtPricecar").val(tableallCar.pricecar);
        //         $("#EdittxtPointStartcar").val(tableallCar.pointStartcar);
        //         $("#EdittxtPointEndcar").val(tableallCar.pointEndcar);
        //         $("#modelEditcar").modal("show");
        //     });
        //     $("#myTable tbody").on("click", ".btn-danger", function () {
        //         const currentRow = $(this).parents("tr");
        //         let checktableCar = table.row(currentRow).data();
        //         rowID = table.row(currentRow).index();
        //         Swal.fire({
        //             title: "Warning",
        //             text: "Are you sure to delete ID " + car[rowID].idcar,
        //             icon: "warning",
        //             showCancelButton: true
        //         }).then((result) => {
        //             if (result.isConfirmed) {
        //                 let checkEditcar = checktableCar.idcar[0];
        //                 if (checkEditcar == 1) {
        //                     for (let i = 0; i < bus.length; i++) {
        //                         if (checktableCar.idcar == bus[i].idcar) {
        //                             bus.splice(i, 1);
        //                             break;
        //                         }
        //                     }
        //                     console.log(bus);
        //                     car = $.merge($.merge([], bus), taxi);
        //                     table.row(rowID).remove().draw();

        //                 } else if (checkEditcar == 2) {
        //                     for (let i = 0; i < taxi.length; i++) {
        //                         if (checktableCar.idcar == taxi[i].idcar) {
        //                             taxi.splice(i, 1);
        //                             break;
        //                         }
        //                     }
        //                     console.log(taxi);
        //                     car = $.merge($.merge([], bus), taxi);
        //                     table.row(rowID).remove().draw();
        //                 }
        //                 Swal.fire({
        //                     title: "Deleted!",
        //                     text: "The record has been deleted.",
        //                     icon: "success"
        //                 })
        //             }
        //         });
        //     });

        // } else if (dropdown == 2) {
        //     $("#menushowplace").css("display", "");
        //     $("#menushowcar").css("display", "none");
        //     $("#menushowHotel").css("display", "none");
        //     // $("#menuTable").html("<a class='nav-link px-3' style='cursor: pointer;'>ทั้งหมด</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>ทั่วไป</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>วัด</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>สถานที่บันเทิง</a><a class='nav-link px-3' style='border-left: 1px solid #666666; cursor: pointer;'>ที่ท่องเที่ยวธรรมชาติ</a>");
        //     table.clear();
        //     table = $("#myTable").dataTable().fnDestroy();
        //     $('#myTable').empty();
        //     table = $('#myTable').DataTable({
        //         data: place,
        //         columns: [
        //             { data: "idplace", title: "รหัส" },
        //             { data: "nameplace", title: "ชื่อสถานที่" },
        //             { data: "infoplace", title: "ข้อมูลสถานที่" },
        //             { data: "timeOpen", title: "เวลาเปิดทำการ" },
        //             { data: "timeClose", title: "เวลาปิดทำการ" },
        //             { data: "CloseDay", title: "วันปิดทำการ" },
        //             { data: "priceplace", title: "ราคาเข้าชม" },
        //             { data: "LimitTime", title: "เวลาในการเที่ยว / นาที" },
        //             { title: "Action", orderable: false, defaultContent: "<a class='btn mx-auto btn-warning'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }
        //         ]
        //     });


        // } else if (dropdown == 3) {
        //     $("#menushowplace").css("display", "none");
        //     $("#menushowcar").css("display", "none");
        //     $("#menushowHotel").css("display", "");
        //     table.clear();
        //     table = $("#myTable").dataTable().fnDestroy();
        //     $('#myTable').empty();
        //     table = $('#myTable').DataTable({
        //         data: hotel,
        //         columns: [
        //             { title: "รหัส" },
        //             { title: "ชื่อที่พัก" },
        //             { title: "ราคาต่อคืน / ห้องปกติ" },
        //             { title: "Action", orderable: false, defaultContent: "<a class='btn mx-auto btn-warning'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pen' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/></svg></a><a class='btn mx-3 btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button>" }
        //         ]
        //     });
        // }
    });


    // edit data car
    $("#myTable tbody").on("click", ".btn-warning", function () {
        // const currentRow = $(this).parents("tr");
        // const tableallCar = table.row(currentRow).data();
        // rowID = table.row(currentRow).index();
        // // console.log(testdata.idcar + " " + rowID);
        // $("#EdittxtIdcar").val(tableallCar.idcar);
        // $("#EdittxtNamecar").val(tableallCar.namecar);
        // $("#EdittxtPricecar").val(tableallCar.pricecar);
        // $("#EdittxtPointStartcar").val(tableallCar.pointStartcar);
        // $("#EdittxtPointEndcar").val(tableallCar.pointEndcar);
        // $("#modelEditcar").modal("show");
    });

    $("#myTable tbody").on("click", ".btn-danger", function () {
        // const currentRow = $(this).parents("tr");
        // let checktableCar = table.row(currentRow).data();
        // rowID = table.row(currentRow).index();
        // Swal.fire({
        //     title: "Warning",
        //     text: "Are you sure to delete ID " + car[rowID].idcar,
        //     icon: "warning",
        //     showCancelButton: true
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         let checkEditcar = checktableCar.idcar[0];
        //         if (checkEditcar == 1) {
        //             for (let i = 0; i < bus.length; i++) {
        //                 if (checktableCar.idcar == bus[i].idcar) {
        //                     bus.splice(i, 1);
        //                     break;
        //                 }
        //             }
        //             console.log(bus);
        //             car = $.merge($.merge([], bus), taxi);
        //             table.row(rowID).remove().draw();

        //         } else if (checkEditcar == 2) {
        //             for (let i = 0; i < taxi.length; i++) {
        //                 if (checktableCar.idcar == taxi[i].idcar) {
        //                     taxi.splice(i, 1);
        //                     break;
        //                 }
        //             }
        //             console.log(taxi);
        //             car = $.merge($.merge([], bus), taxi);
        //             table.row(rowID).remove().draw();
        //         }
        //         Swal.fire({
        //             title: "Deleted!",
        //             text: "The record has been deleted.",
        //             icon: "success"
        //         })
        //     }
        // });
    });

    $("#btnSaveEditcar").click(function () {
        // const editidcar = $("#EdittxtIdcar").val();
        // const editnamecar = $("#EdittxtNamecar").val();
        // const editpricecar = $("#EdittxtPricecar").val();
        // const editstartcar = $("#EdittxtPointStartcar").val();
        // const editendcar = $("#EdittxtPointEndcar").val();
        // // alert(editidcar + editnamecar + editpricecar + editstartcar + editendcar);
        // let checkEditcar = editidcar[0];
        // if (checkEditcar == 1) {
        //     for (let i = 0; i < bus.length; i++) {
        //         if (editidcar == bus[i].idcar) {
        //             bus[i].namecar = editnamecar;
        //             bus[i].pricecar = editpricecar;
        //             bus[i].pointStartcar = editstartcar;
        //             bus[i].pointEndcar = editendcar;

        //             let temp = table.row(rowID).data();
        //             temp.namecar = editnamecar;
        //             temp.pricecar = editpricecar;
        //             temp.pointStartcar = editstartcar;
        //             temp.pointEndcar = editendcar;
        //             table.row(rowID).data(temp).invalidate();
        //             $("#modelEditcar").modal("hide");
        //             break;
        //         }
        //     }
        //     console.log(bus);
        // } else if (checkEditcar == 2) {
        //     for (let i = 0; i < taxi.length; i++) {
        //         if (editidcar == taxi[i].idcar) {
        //             taxi[i].namecar = editnamecar;
        //             taxi[i].pricecar = editpricecar;
        //             taxi[i].pointStartcar = editstartcar;
        //             taxi[i].pointEndcar = editendcar;

        //             let temp = table.row(rowID).data();
        //             temp.namecar = editnamecar;
        //             temp.pricecar = editpricecar;
        //             temp.pointStartcar = editstartcar;
        //             temp.pointEndcar = editendcar;
        //             table.row(rowID).data(temp).invalidate();
        //             $("#modelEditcar").modal("hide");
        //             break;
        //         }
        //     }
        // }

    });



    // navbar menu sign out
    $("#Adminlogout").click(function () {
        localStorage.id = 0;
        window.location.replace("/");
    });


});