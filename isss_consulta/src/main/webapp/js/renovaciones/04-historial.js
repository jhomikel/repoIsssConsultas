$(document).ready(function() {

    //cargaCredenciales();
    //cargaPaginaIniciaTarea();
    //obtieneNombreCliente(codigoCliente);
    //obtieneDetallesInstanciaProceso($.urlParam('processid'));
    
    var numAfiliado = $.urlParam('clientesID');
    
    var settingAfiliado = {
        "async": true,
        "crossDomain": true,
        "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.atencion/afiliado/" + numAfiliado,
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "82fef902-b7bb-e36f-13b5-7778d83f8789"
        },
        "processData": false,
        "data": ""
      }

      $.ajax(settingAfiliado).done(function (datos) {
        console.log("Datos encontrados " + datos.length);
        html = '<div class="table-responsive"><table id="tblHistorico" class="tablasJSON table table-striped">';
        html += '<caption class=encabezado><h3>Ultimas 10 consultas del afiliado '+ datos[0].codcita.numafiliacion.numafiliacion +'</h3></caption>';
        html += '<thead><tr>'
        html += '<th>Codigo</th>';
        html += '<th>Fecha</th>';
        html += '<th>Tipo</th>';
        html += '<th>Medico</th>';
        html += '</tr></thead>';
        html += '<tbody>';
        $.each(datos, function (i, value) {
            html += '<tr>';
            html += '<td>'+ datos[i].codatencion +'</td>';
            html += '<td>'+ datos[i].fechaatencion +'</td>';
            html += '<td>'+ datos[i].tipohoja +'</td>';
            html += '<td>'+ datos[i].codcita.codmedico.nombres +' '+ datos[i].codcita.codmedico.apellidos +'</td>';
            html += '</tr>';
        });
        html += '<tr><td colspan="4" align="center"><br><br><a href="#">Ver historico completo</a></td></tr>'
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        
        document.getElementById('historial').innerHTML = html;  
        
        $('table tbody tr').click(function(){
            var codDiagnostico = $(this).find("td").eq(0).text();
            console.log(codDiagnostico);
            
            var settingsDiagnostico = {
            "async": true,
            "crossDomain": true,
            "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.detalle/atencion/" + codDiagnostico,
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "cache-control": "no-cache",
              "postman-token": "9ffceab7-7eab-9d74-0ad6-3ac1ae4a3c05"
            },
            "processData": false,
            "data": ""
          }

          $.ajax(settingsDiagnostico).done(function (response) {
                var html2 = '';
                $.each(response, function (j, value) {
                    html2 += '<tr>';
                    html2 += '<td>'+ response[j].coddetalle +'</td>';
                    html2 += '<td>'+ response[j].tipo +'</td>';
                    html2 += '<td>'+ response[j].principal +'</td>';
                    html2 += '<td>'+ response[j].cod4.descripciondiagnostico +'</td>';
                    html2 += '<td>'+ response[j].observaciones +'</td>';
                    html2 += '</tr>';
                });
                document.getElementById('tbodyDiagnostico').innerHTML = html2;  
                $('#myModalDiagnostico').modal('show')
          });
        });
      });


	$('#btnSiguiente').click(seleccionarLineas);
        
        $("#btnTerminar").click(function () {
	    var r = confirm("Esta seguro que desea salir?");
	    if (r === true) {
	        window.location = "../tareas/tareas-pendientes.html";
	    }
	});

	$("#btnTerminar").click(function () {
	    var r = confirm("Esta seguro que desea salir?");
	    if (r === true) {
	        window.location = "../tareas/tareas-pendientes.html";
	    }
	});

});
