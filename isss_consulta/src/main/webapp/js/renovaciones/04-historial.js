$(document).ready(function() {

    cargaCredenciales();
    cargaPaginaIniciaTarea();
    obtieneNombreCliente($.urlParam('clientesID'));
    obtieneDetallesInstanciaProceso($.urlParam('processid'));



	$('#btnSiguiente').click(botonSiguiente);

	$("#btnTerminar").click(function () {
	    var r = confirm("Esta seguro que desea salir?");
	    if (r === true) {
	        window.location = "../tareas/tareas-pendientes.html";
	    }
	});

});
