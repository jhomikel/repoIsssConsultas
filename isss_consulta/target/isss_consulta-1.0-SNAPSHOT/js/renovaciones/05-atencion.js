$(document).ready(function(){

    //cargaCredenciales();
    //cargaPaginaIniciaTarea();
    //obtieneNombreCliente(codigoCliente);
    //obtieneDetallesInstanciaProceso($.urlParam('processid'));

	var numAfiliacion = $.urlParam('clientesID');
        var codProceso = $.urlParam('processid');
        
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.atencion/" + codProceso,
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "cache-control": "no-cache",
              "postman-token": "d5d9f457-2a1c-dbd1-7d9f-022cfe93b4be"
            },
            "processData": false,
            "data": ""
          }

          $.ajax(settings).done(function (datos) {
            console.log("Proceso: " + codProceso)
            html = '<h3>Medico: ' + datos.codcita.codmedico.codmedico + ' | ' + datos.codcita.codmedico.nombres + ' ' + datos.codcita.codmedico.apellidos + '</h3>';
            html += '<div class="panel panel-default">';
            html += '<div class="panel-body">';
            html += 'Codigo de afiliaci&oacute;n: <b>' + datos.codcita.numafiliacion.numafiliacion + '</b><br>';
            html += 'Tipo de afiliado: <b>' + datos.codcita.tipo + '</b><br>';
            html += 'Ocupaci&oacute;n del afiliado: <b>' + datos.codcita.numafiliacion.ocupacion + '</b><br>';            
            html += 'Tipo de consulta: <b>' + datos.codcita.codmedico.codespecialidad.nombespecialidad + '</b><br>';
            html += '</div>';
            html += '</div>';
            document.getElementById('atencion').innerHTML = html;          
          });
          
          

	$("#btnSiguiente").click(botonSiguientePaso4);
	$("#btnTerminar").click($.botonTerminar);

});
