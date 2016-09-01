$(document).ready(function(){

    //cargaCredenciales();
    //cargaPaginaIniciaTarea();
    //obtieneNombreCliente(codigoCliente);
    //obtieneDetallesInstanciaProceso($.urlParam('processid'));

	var numAfiliacion = $.urlParam('clientesID');
        var codProceso = $.urlParam('processid');
        var codDetalleProceso;
        
        var tipoDiagnostico = '';
        var periodicidad = '';
        var codDiagnostico;
        var observaciones = '';
        var suscripcion = '';
        var diagnosticosJSON = [
            "A000-COLERA DEBIDO A VIBRIO CHOLERAE O1, BIOTIPO CHOLERAE",
            "A001-COLERA DEBIDO A VIBRIO CHOLERAE O1, BIOTIPO EL TOR",
            "A009-COLERA NO ESPECIFICADO",
            "A010-FIEBRE TIFOIDEA",
            "A011-FIEBRE PARATIFOIDEA A",
            "A012-FIEBRE PARATIFOIDEA B",
            "A013-FIEBRE PARATIFOIDEA C",
            "A014-FIEBRE PARATIFOIDEA, NO ESPECIFICADA",
            "A90-FIEBRE DEL DENGUE CLASICO",
            "A91-FIEBRE DEL DENGUE HEMORRAGICO",
            "A920-ENFERMEDAD POR VIRUS CHIKUNGUNYA",
            "A923-FIEBRE DEL OESTE DEL NILO",
            "A928-OTRAS FIEBRES VIRALES ESPECIFICADAS TRANSMITIDAS POR MOSQUITOS",
            "A929-FIEBRE VIRAL TRANSMITIDA POR MOSQUITO, SIN OTRA ESPECIFICACION"
        ];
        
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
            html += '<div class="col-md-5 col-md-offset-1">';
            html += 'Codigo de afiliaci&oacute;n: <b>' + datos.codcita.numafiliacion.numafiliacion + '</b><br>';
            html += 'Tipo de afiliado: <b>' + datos.codcita.tipo + '</b><br>';
            html += '</div>';
            html += '<div class="col-md-5 col-md-offset-1">';
            html += 'Ocupaci&oacute;n del afiliado: <b>' + datos.codcita.numafiliacion.ocupacion + '</b><br>';            
            html += 'Tipo de consulta: <b>' + datos.codcita.codmedico.codespecialidad.nombespecialidad + '</b><br>';          
            html += '</div>';
            html += '</div>';
            html += '</div>';
            document.getElementById('atencion').innerHTML = html;          
          });
          
          //Popular tabla de detalle de consulta
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.detalle/atencion/" + codProceso,
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "cache-control": "no-cache",
              "postman-token": "c6a74f6e-c1b2-f555-27d9-78595ce29fbe"
            },
            "processData": false,
            "data": ""
          }

          $.ajax(settings).done(function (datos) {
              html2 = '';
                  $.each(datos, function (i, value) {
                      html2 += '<tr>';
                      html2 += '<td>'+ datos[i].coddetalle +'</td>';
                      html2 += '<td>'+ datos[i].tipo +'</td>';
                      html2 += '<td>'+ datos[i].principal +'</td>';
                      html2 += '<td>'+ datos[i].cod4.descripciondiagnostico +'</td>';
                      html2 += '<td>'+ datos[i].observaciones +'</td>';
                      html2 += '</tr>';
                  });
                  document.getElementById('tblBodyPrescripcion').innerHTML = html2; 
                  
                  $('table tbody tr').click(function(){
                        codDetalleProceso = $(this).find("td").eq(0).text();
                        console.log("Prescripción " + codDetalleProceso);
                        document.getElementById('codDetDiagnistico').innerHTML = codDetalleProceso; 
                        
                        $('#myModalPrescripcion').modal('show');
                    });
          });
          
          //Popular la lista de medicamentos
          $("#selTipoPrescripcion" ).on('change', function()  {
              var tipo = this.value;
              console.log(tipo);
              var settingMedicina = {
                "async": true,
                "crossDomain": true,
                "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.medicamento/tipoM/" + tipo,
                "method": "GET",
                "headers": {
                  "content-type": "application/json",
                  "cache-control": "no-cache",
                  "postman-token": "64b989ae-2312-6dff-9836-b193e21e12a8"
                },
                "processData": false,
                "data": ""
              }

              $.ajax(settingMedicina).done(function (responseMed) {
                  html4 = '<label for="selDescMedicamento">Seleccione el nombre del medicamento</label>';
                  html4 += '<select class="form-control" id="selDescMedicamento">';
                  html4 += '<option value="sel">Seleccione</option>';
                  $.each(responseMed, function (k, value) {
                      html4 += '<option value="'+ responseMed[k].codmedicamento +'">'+ responseMed[k].descripcion +'</option>';
                  });
                  html4 += '</select>';
                  document.getElementById('comboMedicamento').innerHTML = html4; 
              });
          });

        $("#btnIncorporarDiagnostico").click(function(){
            codDiagnostico = $("input:checked[name='radCheckDiagnostico']").val();
            console.log(codDiagnostico);
            $("#txtDiagnosticoSel").val(codDiagnostico);
        });
        
        $("#btnInsertarPrescripcion").click(function(){
            var fechaIni = $("#txtFechaIni").val();
            var fechaFin = $("#txtFechaFin").val();
            var tipoMedi = $("#selTipoPrescripcion").val();
            var codMedi = $("#selDescMedicamento").val();
            var cantidad = $("#txtCantidad").val();
            console.log(fechaIni + '-' + fechaFin + '-' + tipoMedi + '-' + codMedi + '-' + cantidad);
            var fecha1 = new Date(fechaIni);
            var fecha2 = new Date(fechaFin);
            
            var settingsPrescripcion = {
                "async": true,
                "crossDomain": true,
                "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.prescripcion",
                "method": "POST",
                "headers": {
                  "content-type": "application/json",
                  "cache-control": "no-cache",
                  "postman-token": "d46c1d3d-11ce-8610-fe07-609f3d481a1b"
                },
                "processData": false,
                "data": "{\n\
                            \"fechaini\": \""+ fecha1.getTime() +"\",\n\
                            \"fechafin\": \""+ fecha2.getTime()  +"\",\n\
                            \"cant\": "+ cantidad +",\n\
                            \"servicio\": \""+ tipoMedi +"\",\n\
                            \"coddetalle\":{\n\
                                \"coddetalle\":"+ codDetalleProceso +"\n\
                            },\n\
                            \"codmedicamento\": {\n\
                                \"codmedicamento\": "+ codMedi +"\n\
                            }\n\
                        }"
              }

              $.ajax(settingsPrescripcion).done(function (response) {
                  alert('La prescripción se inserto satisfactoriamente');                 
              });
            
        });

        $("#btnRegistrarDetalle").click(function(){
            var tipo = $("#TipoDiagnostico").val();
            var principal = $("#EstadoDiagnostico").val();
            var diagnosticoSel = $("#txtDiagnosticoSel").val();
            
            var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.detalle",
            "method": "POST",
            "headers": {
              "content-type": "application/json",
              "cache-control": "no-cache",
              "postman-token": "56083bb9-ca95-72b5-9b54-cd40ce40d132"
            },
            "processData": false,
            "data": "{\n\
                        \"tipo\":\""+ tipo +"\",\n\
                        \"principal\":\"" + principal +"\",\n\
                        \"servicio\":\"MEDICINA INTERNA\",\n\
                        \"codatencion\": {\n\
                            \"codatencion\":"+ codProceso +"\n\
                            },\n\
                        \"cod4\": {\n\
                            \"cod4\": \""+ diagnosticoSel +"\"\
                    }\n\
                }"
          }

          $.ajax(settings).done(function (response) {
            alert('Se ingreso un diagnostico satisfactoriamente');
            
            //Refrescar la tabla detalle de diagnosticos
            var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.detalle/atencion/" + codProceso,
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "cache-control": "no-cache",
              "postman-token": "c6a74f6e-c1b2-f555-27d9-78595ce29fbe"
            },
            "processData": false,
            "data": ""
          }

          $.ajax(settings).done(function (datos) {
              html3 = '';
                  $.each(datos, function (i, value) {
                      html3 += '<tr>';
                      html3 += '<td>'+ datos[i].coddetalle +'</td>';
                      html3 += '<td>'+ datos[i].tipo +'</td>';
                      html3 += '<td>'+ datos[i].principal +'</td>';
                      html3 += '<td>'+ datos[i].cod4.descripciondiagnostico +'</td>';
                      html3 += '<td>'+ datos[i].observaciones +'</td>';
                      html3 += '<td></td>';
                      html3 += '<td></td>';
                      html3 += '</tr>';
                  });
                  document.getElementById('tblBodyPrescripcion').innerHTML = html3; 
          });
            
          });
            
        });

        $('input.typeahead').typeahead({
		name: 'diagnosticos',
		local: diagnosticosJSON
	});
            
	$("#btnInsertarDiagnostico").click(function(){
            if ($("input[name='opTipoDiag']").is(':checked')) {
                tipoDiagnostico = $("input[name='opTipoDiag']:checked").val();               
            } 
            periodicidad = $("#selPrincipal").val();
            codDiagnostico = $("#txtCodDiagnostico").val().split("-");
            observaciones = $("#txtObservaciones").val();
            
            console.log("Tipo " + tipoDiagnostico);
            console.log("Periodicidad " + periodicidad);
            console.log("Codigo de diagostico " + codDiagnostico[0]);
            console.log("Observaciones " + observaciones)
            
            var insertarDetalle = {
                "async": true,
                "crossDomain": true,
                "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.detalle",
                "method": "POST",
                "headers": {
                  "content-type": "application/json",
                  "cache-control": "no-cache",
                  "postman-token": "21b0e6f1-ffe2-138c-08ac-19d189c0ee02"
                },
                "processData": false,
                "data": "{\n\
                            \"tipo\": \""+ tipoDiagnostico +"\",\n\
                            \"principal\": \""+ periodicidad +"\",\n\
                            \"servicio\": \"MEDICINA INTERNA\",\n\
                            \"observaciones\": \""+ observaciones +"\",\n\
                            \"codatencion\": {\n\
                                \"codatencion\": "+ codProceso +"\n\
                                    },\n\
                            \"cod4\": {\n\
                                \"cod4\": \""+ codDiagnostico[0] +"\"\n\
                                }\n\
                        }"
              }

              $.ajax(insertarDetalle).done(function (response) {
                alert ('Los datos fueron insertados satisfactoriamente');
                $("#txtObservaciones").val('');
                $("#txtCodDiagnostico").val('');
              });
        });
        
        $("#btnSiguiente").click(function(){
            
        });
        
	$("#btnTerminar").click($.botonTerminar);

});
