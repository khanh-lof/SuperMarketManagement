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
//    }
    if (!alert("Scan successfully!!!")) {
        window.location.reload();
    }
    else {
        
    }
}

var html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        {formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
            fps: 10, qrbox: {width: 250, height: 200}});
html5QrcodeScanner.render(onScanSuccess);
