/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function onScanSuccess(qrCodeMessage) {
//    let y = document.getElementById(qrCodeMessage);
//    if (y == null) {
//        let x = document.getElementById('content');
//        x.innerHTML =
//                `<div class="alert alert-success row justify-content-center" id="${qrCodeMessage}">Scan successfully!!!!</div>`
//                + x.innerHTML;
    var x = document.createElement("input");
    x.type = "hidden";
    x.value = qrCodeMessage;
    x.id = "qrcode";
    document.body.appendChild(x);
    $('#confirmModal').modal('show');
}

function reload() {
     window.location.reload();
}

function action() {
    var x = document.getElementById("qrcode").value;
    fetch("api/order/updateStatus", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"txtOrderId" : x, "txtStatus" : "3"})
    }).then((response) => {
        $('#success').modal('show');
    });
}

var html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        {formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
            fps: 10, qrbox: {width: 250, height: 200}});
html5QrcodeScanner.render(onScanSuccess);
$(document).on("click", "#confirm", action);
$(document).on("click", "#reload", reload);