$(document).ready(function() {

    var cart;
    var products;
    var total = 0;

    var access_token;
    var apikey = "ttEZGcYQCG19sIJrfD2YVsHgCY60syDe";
    var client_secret = "cJdLLzT2RbfHtNbM";

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
          url: "http://vishal3-trial-test.apigee.net/flowershop/orders?apikey=" + apikey,
          data: order,
          success: orderPlaced
        });
    });
    
    function orderPlaced(data) {
        alert("Successfully Place Order id: " + data);
    }

    $("#palpay").click(function(e) {
        e.preventDefault();
        
        var client_credentials = "client_id=" + apikey + "&client_secret=" + client_secret;

        $.ajax({
            type: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            url: "https://vishal3-trial-test.apigee.net/oauth/client_credential/accesstoken?grant_type=client_credentials",
            data: client_credentials,
            success: gotToken
        });
    });

    function gotToken(data) {
        access_token = data.access_token;

        // now make request for payment details
        $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + access_token
            },
            url: "http://vishal3-trial-test.apigee.net/palpay/payments?apikey=" + apikey + "&first=John&last=Doe",
            success: gotPaymentMethod
        });
    }

    function gotPaymentMethod(data) {

        console.log(data);
        var paymentDetails = JSON.stringify(data, 0, 4);
        alert("Successfully used below payment information to pay for order: \n" + paymentDetails);

        $("#card_number").val(data.cardNumber);
        $("#month").val(data.expMonth);
        $("#year").val(data.expYear);
        $("#cvv").val(data.cvv);
    }

});



