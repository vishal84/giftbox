$(document).ready(function() {
    
	$.ajax({
		url: "http://vishal3-trial-test.apigee.net/flowershop/products?apikey=ttEZGcYQCG19sIJrfD2YVsHgCY60syDe"
    }).then(function(data) {

    	var products = data;
    	console.log(products);

    	var $productsDiv = $("#products");
    	for (var key in products) {


    		var $outerDiv = $("<div/>", { id: products[key].id, class: "col-md-4" });
    		var $thumbDiv = $("<div/>", { class: "thumbnail" });
    		var $imgDiv = $("<img/>", { src: "../img/" + products[key].image });

    		// create thumbnail and attach to product div
    		$imgDiv.appendTo($thumbDiv);
    		$thumbDiv.appendTo($outerDiv);

    		// create header and attach to product div
    		var $titleDiv = $("<h2/>", { class: "product-title", text: products[key].title });
    		$titleDiv.appendTo($outerDiv);

    		// create description and attach to product div
    		var $descDiv = $("<p/>", { text: products[key].description });
    		$descDiv.appendTo($outerDiv);

    		// create price and view buttom and append to product div
    		var $rowDiv = $("<div/>", { class: "row" });
    		var $priceDiv = $("<div/>", { class: "col-md-12 prodcut-price", text: products[key].price });
    		var $btnDiv = $("<a/>", { class: "col-md-offset-3 col-md-6 btn btn-primary", href: "product.html#" + products[key].id, role: "button", text: "Order" });
    		
    		$priceDiv.appendTo($rowDiv);
    		$btnDiv.appendTo($rowDiv);
    		$rowDiv.appendTo($outerDiv);

			$outerDiv.appendTo($productsDiv);

    	}
    });

});