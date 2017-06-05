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
            var $cartItemDescDiv = $("<div/>", { class: "col-md-8", text: cart[key].description });
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

        total = new String(total);

        var $cartItemRowDiv = $("<div/>", { class: "cart-footer row" }).css({ "padding-top": "20px"});
        var $totalTextDiv = $("<div/>", { class: "col-md-9", text: "Total:" }).css({"text-align": "right", "font-weight": "bold" });
        var $totalDiv = $("<div/>", { class: "col-md-3", text: "$" + total.substring(0,5) }).css({"font-weight": "bold" });

        $totalTextDiv.appendTo($cartItemRowDiv);
        $totalDiv.appendTo($cartItemRowDiv);

        $cartItemRowDiv.appendTo($cart);
    }

    var total;
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

});