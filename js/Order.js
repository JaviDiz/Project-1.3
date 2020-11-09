// Guardar una orden de usuario en el almacenamiento de objetos 
export function saveOrderInStorage() {

	let postId = document.querySelector("#order_id").value;
	let postName = document.querySelector("#order_name").innerHTML;
	let postQuantity = document.querySelector("#order_quantity") .value;
	let postPrice = document.querySelector("#order_price").value;

	// Un orden de objeto simple
	let order = {
		"id": postId,
		"posterName": postName,
		"quantity": postQuantity,
		"price": postPrice,
		"size": document.querySelector("input[name='order_size']:checked").value
	};

	// Ocultar la ventana modal
	$('#pedido').modal('hide');

	// El pedido es un objeto JSON, pero debemos guardarlo como una cadena en el almacenamiento local.
	localStorage.setItem("order", JSON.stringify(order));

	console.info("Comanda desada correctament:" + order);
	window.location.href = "order.html";

}