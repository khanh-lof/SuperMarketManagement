/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function subQuantity() {
    let input = document.getElementById("quantity-input");
    if (input.value === "0") {
        input.disabled = true;
    } else
        input.value = (parseInt(input.value) - 1).toString();
}

function addQuantity() {
    let input = document.getElementById("quantity-input");
    input.value = (parseInt(input.value) + 1).toString();
}

function loadProduct() {
    let productID = document.getElementById("product_id").value;
    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'productID': productID}),
    }).then(
            function (response) {
                response.json().then(data => {
                    document.getElementById("imgProduct").src = data['imageLink'];
                    document.getElementById("price").innerHTML = data['sellprice'] + "₫";
                    document.getElementById("description").innerHTML = data['description'];
                });
            }
    );
}