$(document).ready(function(){

    cargaCredenciales();
    cargaPaginaIniciaTarea();
    obtieneNombreCliente(codigoCliente);
    obtieneDetallesInstanciaProceso($.urlParam('processid'));

    var selected_value = "";
    function mostrarHistorial(datos){
        html = '<div class="table-responsive"><table class="tablasJSON table table-striped">';
        html += '<caption class=encabezado><h2>HISTORICO PAGOS</h2></caption>';
        $.each(datos, function(i, value){
            html += '<tr><td>Id</td><td>' + datos[i].clientesId + '</td></tr>';
            html += '<tr><td>Nombre</td><td>' + datos[i].nombreCliente + '</td></tr>';
            html += '<tr><td>NIT</td><td>' + datos[i].nit + '</td></tr>';
            html += '<tr><td>Limite de credito</td><td>' + datos[i].limiteCredito + '</td></tr>';
            html += '<tr><td>Lineas para renovaci&oacute;n</td><td>' + datos[i].lineasParaRenovacion + '</td></tr>';
            html += '<tr><tr><td>Cantidad de lineas</td><td>' + datos[i].cantidadLineas + '</td></tr>';
            html += '<tr><td>Total facturaci&oacute;n</td><td>' + datos[i].totalFecturacion + '</td></tr>';
        });
        html += '</table></div>';
        document.getElementById('historial').innerHTML=html;
    }

    function mostrarDatos(datos){
        html = '<div class="table-responsive"><table class="tablasJSON table table-striped">';
        html += '<caption class=encabezado><h2>APROBACION TEMPRANA</h2></caption>';
        html += '<th>ID</th>';
        html += '<th>NUMERO</th>';
        html += '<th>BAN</th>';
        html += '<th class=thEncabezado>FECHA INICIO</th>';
        html += '<th>FECHA FIN</th>';
        html += '<th>MESES PENDIENTES</th>';
        html += '<th>PLAN</th>';
        html += '<th>TERMINAL</th></tr>';
        $.each(datos, function(i, value){
            html += '<td class=tdCelda>' + datos[i].lineascuentaid + '</td>';
            selected_value += selected_value + datos[i].lineascuentaid + ",";
            html += '<td>' + datos[i].msisdn + '</td>';
            html += '<td>' + datos[i].ban + '</td>';
            html += '<td>' + datos[i].fechaInicio + '</td>';
            html += '<td>' + datos[i].fechaFin + '</td>';
            html += '<td>' + datos[i].mesesPendientes + '</td>';
            html += '<td>' + datos[i].nombrePlan + '</td>';
            html += '<td>' + datos[i].marcaTerminal + '</td></tr>';
        });
        html += '</table>';
        document.getElementById('resultado').innerHTML=html;
    }

    function mostrarMensaje(datos){
        alert(datos.texto);
    }

    $.getJSON("http://172.26.20.122:8080/DigicelSPP_Services/webresources/MaxCliente/getHistorialFacturacion",
	{ clienteId: $.urlParam('clientesID')},
	mostrarHistorial);

    $.getJSON("http://172.26.20.122:8080/DigicelSPP_Services/webresources/MaxCliente/getAnulacion",
	{ clienteId: $.urlParam('clientesID')},
	mostrarDatos);

    $("#btnAprobar").click(function(){
        alert('Las lineas fueron aprobadas satisfactoriamente');
        botonSiguienteAprobacionTemprana('aprobado');
    });

    $("#btnRechazar").click(function(){
        var urlJSONRechazar = "http://172.26.20.122:8080/DigicelSPP_Services/webresources/BuscarSolicitud/getApruebaSolicitudTemprana";
        console.log(selected_value);
        $.getJSON(urlJSONRechazar, { lineascuentaid: selected_value.substring(0, (selected_value.length - 1)) }, mostrarMensaje);
        botonSiguienteAprobacionTemprana('NoAprobado');
    });

});
