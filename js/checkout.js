$(document).ready(function() {

    var cart;
    var products;
    var total = 0;

    var $cart = $("#cart-items");
    if (localStorage.getItem("cart") != null) {
        cart = JSON.parse(localStorage.getItem("cart"));
        products = JSON.parse(localStorage.getItem("products"));
    }

    if (cart != null && products != null) {

        for (var key in cart) {

            var $cartItemRowDiv = $("<div/>", { id: cart[key].id, class: "cart-item row" });
            var $cartItemQtyDiv = $("<div/>", { class: "col-md-1", text: 1 });
            var $cartItemDescDiv = $("<div/>", { class: "col-md-6", text: cart[key].description });
            var $cartItemPriceDiv = $("<div/>", { class: "col-md-2", text: cart[key].price });
            var $cartItemRemoveDiv = $("<div/>", { class: "col-md-1", text: "X" });

            // get the total price
            total += parseFloat(cart[key].price.substring(1, cart[key].price.length));

            $cartItemQtyDiv.appendTo($cartItemRowDiv);
            $cartItemDescDiv.appendTo($cartItemRowDiv);
            $cartItemPriceDiv.appendTo($cartItemRowDiv);
            $cartItemRemoveDiv.appendTo($cartItemRowDiv);

            $cartItemRowDiv.appendTo($cart);

        }
    }

    total = new String(total);
    var subtotal = new Number(total.substring(0,5));
    var taxes = .07 * total;
    var shipping = 5.99;

    total = subtotal + taxes + shipping;

    taxes = new String(taxes).substring(0,5);
    shipping = new String(shipping).substring(0,5);
    total = new String(total).substring(0,5);

    $("#cart-subtotal").text("$" + subtotal);
    $("#cart-taxes").text("$" + taxes.substring(0,5));
    $("#cart-shipping").text("$" + shipping.substring(0,5));
    $("#cart-total").text("$" + total.substring(0,5));

    // order model..
    var order = {
        cart: {
            products: []
        },
        customer: {
            email: "",
            first: "",
            last: "",
            shipping: {
                city: "",
                state: "",
                street: "",
                zip: "",
            }
        },
        id: "",
        payment: {
            palpay: false,
            cardNumber: "",
            cvv: "",
            month: "",
            year: ""
        },
        state: "placed",
        tracking: ""
    };


    $("#place_order").click(function(e) {
        e.preventDefault();

        order.cart.products = JSON.parse(localStorage.getItem("products"));
        order.customer.email = $("#email").val();
        order.customer.first = $("#first").val();
        order.customer.last = $("#last").val();
        order.customer.shipping.city = $("#city").val();
        order.customer.shipping.state = $("#state").val();
        order.customer.shipping.street = $("#street").val();
        order.customer.shipping.zip = $("#zip").val();
        order.payment.cardNumber = $("#card_number").val();
        order.payment.cvv = $("#cvv").val();
        order.payment.month = $("#month").val();
        order.payment.year = $("#year").val();

        $.ajax({
          type: "POST",
          url: "http://vishal3-trial-test.apigee.net/flowershop/orders?apikey=ttEZGcYQCG19sIJrfD2YVsHgCY60syDe",
          data: order,
          success: success
        });
    });
    
    function success(data) {
        alert("Successfully Place Order id: " + data);
    }
    

});