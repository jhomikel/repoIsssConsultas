$(document).ready(function() {

    cargaCredenciales();
    cargaPaginaIniciaTarea();
    obtieneNombreCliente(codigoCliente);
    obtieneDetallesInstanciaProceso($.urlParam('processid'));


	function mostrarDatos(datos) {
		html = '<div class="table-responsive"><table class="tablasJSON table table-striped">';
		html += '<caption class="encabezado">LINEAS A RENOVAR</caption>';
		html += '<thead><tr class="trFila"><th class=thEncabezado>SEL.</th>';
		html += '<th class="thEncabezado">ID</th>';
		html += '<th class="thEncabezado">NUMERO</th>';
		html += '<th class="thEncabezado">BAN</th>';
		html += '<th class="thEncabezado">FECHA INI.</th>';
		html += '<th class="thEncabezado">FECHA FIN</th>';
		html += '<th class="thEncabezado">MESES PENDIENTES</th>';
		html += '<th class="thEncabezado">PLAN</th>';
		html += '<th class="thEncabezado">TERMINAL</th></tr></thead><tbody>';
		$.each(datos, function(i, value) {
                        var str1 = datos[i].lineascuentaid;
                        var str2 = datos[i].mesesPendientes;
			html += '<tr class="trFila"><td class="tdCelda"><input type=checkbox id=selLineaCuentaId name=selLineaCuentaId value=' + str1.concat(str2) + '></td>';
			html += '<td class="tdCelda">' + datos[i].lineascuentaid + '</td>';
			html += '<td class="tdCelda">' + datos[i].msisdn + '</td>';
			html += '<td class="tdCelda">' + datos[i].ban + '</td>';
			html += '<td class="tdCelda">' + datos[i].fechaInicio + '</td>';
			html += '<td class="tdCelda">' + datos[i].fechaFin + '</td>';
			html += '<td class="tdCelda">' + datos[i].mesesPendientes + '</td>';
			html += '<td class="tdCelda">' + datos[i].nombrePlan + '</td>';
			html += '<td class="tdCelda">' + datos[i].marcaTerminal + '</td></tr>';
		});
		html += '</tbody></table></div>';
		$("#resultado").html(html);

	}

	$(window).load(function() {
		$.getJSON("http://172.26.20.122:8080/DigicelSPP_Services/webresources/MaxCliente/getSolicitud", {
			clienteId: codigoCliente
		}, mostrarDatos);
	});

	//$('#btnSeleccionar').click($.seleccionarLineas);

	$('#btnSiguiente').click(seleccionarLineas);

	$("#btnTerminar").click(function () {
	    var r = confirm("Esta seguro que desea salir?");
	    if (r === true) {
	        window.location = "../tareas/tareas-pendientes.html";
	    }
	});

});
