$(document).ready(function() {
    
	var productId = window.location.hash.substring(1);

	$.ajax({
		url: "http://vishal3-trial-test.apigee.net/flowershop/products?apikey=ttEZGcYQCG19sIJrfD2YVsHgCY60syDe&id=" +  productId
    }).then(function(data) {

    	var product = data;

    	$("#product-title").text(product.title);
    	$("#product-image").attr("src", "../img/" + product.image).attr("height", "100%").attr("width", "100%");
		$("#product-price").text(product.price);
		$("#product-sku").text("SKU " + product.sku);
    	$("#product-description").text(product.description);

    	$("#order-product").on("click", function(e) {
    		e.preventDefault();

    		if (typeof(Storage) !== "undefined") {
    			
    			// create a cart and product array and see if a cart already exists
    			var cart = [];
                var products = [];

    			if (localStorage.getItem("cart") != null) {
					cart = JSON.parse(localStorage.getItem("cart"));
                    products = JSON.parse(localStorage.getItem("products"));
    			}

    			// add the item to the cart then localstorage
                cart.push(product);
                products.push(product.id);

    			localStorage.setItem("cart", JSON.stringify(cart));
                localStorage.setItem("products", JSON.stringify(products));

                window.location.href = "cart.html";

			} else {
				console.log("local storage not supported!");
			}
    	});
    });

});