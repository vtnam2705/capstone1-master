getID = (id) => document.getElementById(id);


getID("nav-icon").onclick = () => {
    getID("cart-list").style.display = "block";
}

getID("close").onclick = () => {
    getID("cart-list").style.display = "none";
}

// ------------------------------------------------------
var service = new Services();

var productList = [];
var cartList = [];

function getEle(id) {
    return document.getElementById(id);
}

function getListProducts() {
    var promise = service.getListProductApi();
    return promise
        .then(function (result) {
            renderListProducts(result.data);
            productList = result.data;
            // cartList = result.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

getListProducts();

async function onRenderCart (){
    await getListProducts();
    renderListCarts(cartList);
}

onRenderCart();

async function onChangeProduct(obj) {
    await getListProducts();
    var phoneType = obj.value;
    var resultPhoneType = [];

    if (phoneType === "all") {
        renderListProducts(productList);
    } else {
        for (var i = 0; i < productList.length; i++) {
            if (productList[i].type === phoneType) {
                resultPhoneType.push(productList[i]);
            }
        }

        renderListProducts(resultPhoneType);
    }

}


function renderListProducts(data) {
    var contentHTML = "";

    data.forEach(function (product) {
        contentHTML += `
        <div class="card">
                        <div class="top-bar">
                            <i class="fab fa-apple"></i>
                            <em class="stocks">In Stock</em>
                        </div>
                        <div class="img-container">
                            <img class="product-img" src="${product.img}" alt="">
                        </div>
                        <div class="details">
                            <div class="name-fav">
                                <strong class="product-name">${product.name}</strong>
                                <button class="heart">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                            <div class="wrapper">
                                <p>${product.desc}</p>
                            </div>
                            <div class="purchase">
                                <p class="product-price">${product.price}$</p>
                                <span class="btn-add">
                                    <div>
                                        <button onclick="addItem(this)" class="add-btn">Add <i
                                                class="fas fa-chevron-right"></i>
                                        </button>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
        `
    });


    getEle("listProducts").innerHTML = contentHTML;
}

//------------------------------------------------------------------------------------------

function addItem(e) {
    let t = e.parentElement.parentElement.parentElement.parentElement.parentElement;

    let productName = t.getElementsByClassName("product-name")[0].innerText;

	let	productPrice = parseFloat(t.getElementsByClassName("product-price")[0].innerText.replace("$ ", ""));

    let	productImg = t.getElementsByClassName("product-img")[0].src;

    let inputCart = {
        name: productName,
        price: productPrice,
        img: productImg,
        qty: 1
    };

    // Function
    cartList.push(inputCart);
    renderListCarts(cartList);
    cartTotal() ;
    loop();

}
//-----------------------------------------------------------
// Add item into cart

//-----------------------------------------------------------
function renderListCarts(data) {
    var contentHTML = "";

    data.forEach(function (product) {
        contentHTML += `
                        <div class="cart-item">
                            <div class="cart-img">
                                <img src="${product.img}"
                                    alt="">
                            </div>
                            <strong class="name">${product.name}</strong>
                            <span class="qty-change">
                                <div>
                                    <button class="btn-qty" onclick="qtyChange(this,'sub')">
                                        <
                                    </button>
                                    <p class="qty">1</p>
                                    <button class="btn-qty" onclick="qtyChange(this,'add')">
                                        >
                                    </button>
                                </div>
                            </span>
                            <p class="price">
                                <span>
                                    ${product.price}
                                </span>
                                $
                            </p>
                            <button onclick="removeItem(this)" class="btn-dlt"><i class="fas fa-trash"></i></button>
                        </div>
        `
    });

    getEle("cartItems").innerHTML = contentHTML;
}
// onclick="removeItem(this)

// ----------------------------------
function loop() {
    let loopName = document.getElementsByClassName("product-name").innerText;

    let cartItem = document.querySelectorAll(".cart-items .cart-item");

    for(let i = 0; i < cartItem.length; i++) {
        let pName = document.querySelectorAll(".name");
        if(pName[i].innerHTML == loopName) {
            alert("Sản phẩm của bạn đã có trong giỏ hàng")
            return
        }
    }
}


// -----------------------------------------------------------------
// Delete item cart
function removeItem() {

}


// -------------------------------------------------------------------
// Total price
function cartTotal() {
    let cartItem = document.querySelectorAll(".cart-items .cart-item");

    let totalProduct = 0;

    for (let i = 0; i < cartItem.length; i++) {
        let inputValue = cartItem[i].querySelector(".qty").innerText;

        let productPrice = cartItem[i].querySelector(".price span").innerText;

        let total = inputValue * productPrice;

        totalProduct += total;
    }

    let displayPrice = document.querySelector(".total");
    displayPrice.innerHTML = totalProduct;
}

// --------------------------------------------------------------------
// Delete cart
function removeItem(x) {
    // let cartItem = document.querySelectorAll(".cart-items .cart-item");

    // for(let i = 0; i < cartItem.length; i++) {
    //     let deleteBtn = document.querySelectorAll(".btn-dlt")
    //     deleteBtn[i].addEventListener("click", function(event) {
    //         let cartDelete = event.target;
    //         let cartDeleted = cartDelete.parentElement.parentElement;
    //         cartDeleted.remove();
    //         cartTotal();
    //     })
    // }

    let item = x.parentElement;
    item.remove();
    cartTotal()
}


// --------------------------------------------------------------------
// Delete all
// function deleteAll() {
//     let cartAllItem = document.querySelectorAll(".cart-items");
//     console.log(cartAllItem);
//     cartAllItem.remove();
// }