var orderDetails = [];
var isFirstConfirm = true;
var pizzaData = [
    {
        id: 1,
        name: "Focaccia",
        price: 149,
        photoName: "focaccia.jpg",
        order: false,
    },
    {
        id: 2,
        name: "Pizza Margherita",
        price: 300,
        photoName: "margherita.jpg",
        order: false,
    },
    {
        id: 3,
        name: "Pizza Spinaci",
        price: 330,
        photoName: "spinaci.jpg",
        order: false,
    },
    {
        id: 4,
        name: "Pizza Funghi",
        price: 499,
        photoName: "funghi.jpg",
        order: false,
    },
    {
        id: 5,
        name: "Pizza Salamino",
        price: 449,
        photoName: "salamino.jpg",
        order: false,
    },
    {
        id: 6,
        name: "Pizza Prosciutto",
        price: 525,
        photoName: "prosciutto.jpg",
        order: false,
    },
];

var htmlCode = "";
pizzaData.map(function (pizzaObject) {
    htmlCode += `
        <div class="boxes" id="${pizzaObject.id}">
            <div class="box-content">
                <img src="images/${pizzaObject.photoName}" id="img" >
                <div class="namePrice">
                    <h4>${pizzaObject.name}</h4>
                    <h3 class="red">${pizzaObject.price}</h3>
                </div>
                <div class="Order_btn">
                    <input type="button" class="order" onclick="orderFunction(${pizzaObject.id})" value="Order Now">
                </div>
                <div class="confirmDiv">
                    <div class="quantity">
                        <div class="increment-count">
                            <input type="button" class="increDecreBtn" value="-" onclick="handleDecrement(${pizzaObject.id})">
                        </div>
                        <div class="total-count">1</div>
                        <div class="decrement-count">
                            <input type="button" class="increDecreBtn" value="+" onclick="handleIncrement(${pizzaObject.id})">
                        </div>
                    </div>
                    <div class="confirmOrder">
                        <input type="button" class="confirm-btn" value="Confirm" onclick="confirmFunction(${pizzaObject.id})">
                    </div>
                </div>
            </div>
        </div>
    `;
});

var pizzaCards = document.getElementById("container");
pizzaCards.innerHTML = htmlCode;

function orderFunction(id) {

    document.getElementById(id).querySelector(".Order_btn").style.display = "none";
    document.getElementById(id).querySelector(".confirmDiv").style.display = "block";
}

function handleIncrement(id) {
    var selectedPizza = pizzaData.find(pizza => {
        return pizza.id == id;
    });

    if (selectedPizza) {
        var totalCountElement = document.getElementById(id).querySelector(".total-count");
        var totalCount = parseInt(totalCountElement.innerHTML);
        totalCount = totalCount + 1;
        totalCountElement.innerHTML = totalCount;
        updatePrice(selectedPizza, totalCount);
    }
}

function handleDecrement(id) {
    var selectedPizza = pizzaData.find(function (pizza) {
        return pizza.id == id;
    });

    if (selectedPizza) {
        var totalCountElement = document.getElementById(id).querySelector(".total-count");
        var totalCount = parseInt(totalCountElement.innerHTML);
        if (totalCount > 1) {
            totalCount = totalCount - 1;
            totalCountElement.innerHTML = totalCount;
            updatePrice(selectedPizza, totalCount);
        }
    }
}

function updatePrice(pizza, count) {
    var selectedPizza = pizzaData.find(function (selectedPizza) {
        return selectedPizza.id == pizza.id;
    });

    if (selectedPizza) {
        var ogPrice = selectedPizza.price
        var newPrice = ogPrice * count;
        document.getElementById(pizza.id).querySelector(".red").innerHTML = newPrice;
    }
}

function confirmFunction(id) {
    document.getElementById("hide").style.display = "block";
    var selectedPizza = pizzaData.find(function (pizza) {
        return pizza.id == id;
    });

    if (selectedPizza) {
        var totalCountElement = document.getElementById(id).querySelector(".total-count");
        var totalCount = parseInt(totalCountElement.innerHTML);

        var existingOrder = orderDetails.find(function (order) {
            return order.id == selectedPizza.id;
        });

        if (existingOrder) {
            // Order already exists, update quantity and price
            existingOrder.quantity += totalCount;
            existingOrder.price = selectedPizza.price * existingOrder.quantity;
            var existingRow = document.getElementById("orderRow_" + selectedPizza.id);
            existingRow.querySelector(".quantityy").innerHTML = existingOrder.quantity;
            existingRow.querySelector(".changePrice").innerHTML = existingOrder.price;
        } else {
            // New order, add it to orderDetails array
            var orderTableBody = document.getElementById("orderTableBody");

            if (isFirstConfirm) {
                var tableHeaders = `
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th><input type="button" value="Clear" class="clr_btn" onclick="clearFunction(${selectedPizza.id})"></th>
                    </tr>
                  </thead>
                `;
                orderTableBody.innerHTML = tableHeaders;
                isFirstConfirm = false; // Set flag to false after adding headers
            }

            var tableRow = `
                <tr class="fetch" id="orderRow_${selectedPizza.id}">
                    <td class="center">
                        <input type="button" value="x" class="cancel" onclick="cancelFunction(${selectedPizza.id})">
                        <img src="images/${selectedPizza.photoName}" class="hw">
                    </td>
                    <td class="center">${selectedPizza.name}</td>
                    <td class="center quantityy" >
                        <div class="flexMargin" >
                            <div class="checkCancel" id="decre_${selectedPizza.id}">
                                 <input type="button" class="increDecreBtn none" value="-" onclick="handleDecre(${selectedPizza.id})">
                            </div>
                            <div id="count_${selectedPizza.id}">
                                ${totalCount}
                            </div>
                            <div class="checkCancel" id="incre_${selectedPizza.id}">
                                <input type="button" class="increDecreBtn none" value="+" onclick="handleIncre(${selectedPizza.id})">
                            </div>
                        </div>
                    </td>
                    <td id="changePrice${selectedPizza.id}" class="center changePrice">${selectedPizza.price * totalCount}</td>
                    <td class="center edit">
                    <div class="checkCancel" id="checkCancel_${selectedPizza.id}">
                    <input type="button" class="edit_btn" value="Edit" onclick="editFunction(${selectedPizza.id})">
                        <div class="check" onclick="editConfirm(${selectedPizza.id})"><i class="fa-solid fa-check"></i></div>
                        <div class="canceled" onclick="editCancel(${selectedPizza.id})"><i class="fa-solid fa-xmark"></i></div>
                    </div>
                    </td>
                </tr>
                
            `;
            orderTableBody.innerHTML += tableRow;

            existingOrder = {
                id: selectedPizza.id,
                quantity: totalCount,
                price: selectedPizza.price * totalCount
            };
            orderDetails.push(existingOrder);
        }

        selectedPizza.order = false;
        totalCountElement.innerHTML = 1;
        pri = document.getElementById(selectedPizza.id).querySelector(".red");
        pri.innerHTML = selectedPizza.price;
        document.getElementById(id).querySelector(".Order_btn").style.display = "block";
        document.getElementById(id).querySelector(".confirmDiv").style.display = "none";

        var totalPrice = calculateTotalPrice();
        document.getElementById("totalPrice").innerHTML = totalPrice;

        var totalPriceElement = document.getElementById("totalHide");
        totalPriceElement.style.display = "block";
    }
}


function calculateTotalPrice() {
    var orderTableBody = document.getElementById("orderTableBody");
    var totalPrice = 0;

    var rows = orderTableBody.getElementsByClassName("fetch");
    for (var i = 0; i < rows.length; i++) {
        var priceCell = rows[i].getElementsByTagName("td")[3];
        var price = parseInt(priceCell.innerHTML);
        totalPrice += price;
    }
    return totalPrice;
}

function cancelFunction(id) {
    orderDetails = orderDetails.filter(function (order) {
        return order.id !== id;
    });

    var existingRow = document.getElementById("orderRow_" + id);
    if (existingRow) {
        existingRow.remove();
    }

    var totalPrice = calculateTotalPrice();
    document.getElementById("totalPrice").innerHTML = totalPrice;
}


function clearFunction() {
    orderDetails = [];

    var orderTableBody = document.getElementById("orderTableBody");
    orderTableBody.innerHTML = '';


    var totalPrice = calculateTotalPrice();
    document.getElementById("totalPrice").innerHTML = totalPrice;

    var totalPriceElement = document.getElementById("totalHide");
    totalPriceElement.style.display = "none";

    isFirstConfirm = true;
}

function editFunction(id) {
    var totalCountElement = document.getElementById("count_" + id);
    var totalCount = parseInt(totalCountElement.innerHTML);

    // Store the original value as a custom property on the HTML element
    totalCountElement.originalValue = totalCount;

    var priceElement = document.getElementById("changePrice" + id);
    var totalPrice = parseInt(priceElement.innerHTML)

    priceElement.originalValue = totalPrice;

    var grandTotalElement = document.getElementById("totalPrice");
    var grandPrice = parseInt(grandTotalElement.innerHTML);
    grandTotalElement.originalValue = grandPrice;

    var checkCancelDiv = document.getElementById("checkCancel_" + id);
    checkCancelDiv.querySelector(".check").style.display = "block";
    checkCancelDiv.querySelector(".canceled").style.display = "block";
    checkCancelDiv.querySelector(".edit_btn").style.display = "none";

    var checkEditDecre = document.getElementById("decre_" + id);
    checkEditDecre.querySelector(".none").style.display = "block";

    var checkEditIncre = document.getElementById("incre_" + id);
    checkEditIncre.querySelector(".none").style.display = "block";
}

function handleDecre(id) {
    var totalCountElement = document.getElementById("count_" + id);
    var totalCount = parseInt(totalCountElement.innerHTML);

    if (totalCount > 1) {
        totalCount = totalCount - 1;
        totalCountElement.innerHTML = totalCount;
        updatedPrice(id, totalCount);
    }
}

function handleIncre(id) {
    var totalCountElement = document.getElementById("count_" + id);
    var totalCount = parseInt(totalCountElement.innerHTML);

    totalCount = totalCount + 1;
    totalCountElement.innerHTML = totalCount;
    updatedPrice(id, totalCount);
}

function updatedPrice(id, count) {
    var selectedPizza = pizzaData.find(function (pizza) {
        return pizza.id == id;
    });

    if (selectedPizza) {
        var newPrice = selectedPizza.price * count;
        document.getElementById("changePrice" + id).innerHTML = newPrice;
    }
    var totalPrice = calculateTotalPrice();
    document.getElementById("totalPrice").innerHTML = totalPrice;
}

function editConfirm(id) {
    var selectedPizza = pizzaData.find(function (pizza) {
        return pizza.id == id;
    });
    if (selectedPizza) {
        var checkCancelDiv = document.getElementById("checkCancel_" + id);
        checkCancelDiv.querySelector(".check").style.display = "none";
        checkCancelDiv.querySelector(".canceled").style.display = "none";
        checkCancelDiv.querySelector(".edit_btn").style.display = "block";


        var checkEditDecre = document.getElementById("decre_" + id);
        checkEditDecre.querySelector(".none").style.display = "none";

        var checkEditIncre = document.getElementById("incre_" + id);
        checkEditIncre.querySelector(".none").style.display = "none";
    }
}

function editCancel(id) {
    var totalCountElement = document.getElementById("count_" + id);

    // Retrieve the original value from the custom property
    var originalValue = totalCountElement.originalValue;
    totalCountElement.innerHTML = originalValue;

    var priceElement = document.getElementById("changePrice" + id);

    var originalPrice = priceElement.originalValue;
    priceElement.innerHTML = originalPrice;

    var grandTotalElement = document.getElementById("totalPrice");

    var grandPrice = grandTotalElement.originalValue;
    grandTotalElement.innerHTML = grandPrice;

    var checkCancelDiv = document.getElementById("checkCancel_" + id);
    checkCancelDiv.querySelector(".check").style.display = "none";
    checkCancelDiv.querySelector(".canceled").style.display = "none";
    checkCancelDiv.querySelector(".edit_btn").style.display = "block";

    var checkEditDecre = document.getElementById("decre_" + id);
    checkEditDecre.querySelector(".none").style.display = "none";

    var checkEditIncre = document.getElementById("incre_" + id);
    checkEditIncre.querySelector(".none").style.display = "none";
}
