$(document).ready(function(){

    cargaCredenciales();
    cargaPaginaIniciaTarea();
    obtieneNombreCliente(codigoCliente);
    obtieneDetallesInstanciaProceso($.urlParam('processid'));

	var urlExterno = $("#direccion_url").val();
	var varsFrecuentes = "?processid=" + processid + "&clientesID=" + codigoCliente;
	var iframeUrl = urlExterno + varsFrecuentes;

	$("#myIframe").attr('src',iframeUrl);

	$("#btnSiguiente").click(botonSiguientePaso4);
	$("#btnTerminar").click($.botonTerminar);

});
