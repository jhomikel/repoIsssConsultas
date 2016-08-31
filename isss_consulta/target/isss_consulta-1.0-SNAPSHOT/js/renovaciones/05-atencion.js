$(document).ready(function(){

    //cargaCredenciales();
    //cargaPaginaIniciaTarea();
    //obtieneNombreCliente(codigoCliente);
    //obtieneDetallesInstanciaProceso($.urlParam('processid'));

	var numAfiliacion = $.urlParam('clientesID');
        var codProceso = $.urlParam('processid');
        
        var tipoDiagnostico = '';
        var periodicidad = '';
        var codDiagnostico = '';
        var suscripcion = '';
        var diagnosticosJSON = [
            "A000 - COLERA DEBIDO A VIBRIO CHOLERAE O1, BIOTIPO CHOLERAE",
            "A001 - COLERA DEBIDO A VIBRIO CHOLERAE O1, BIOTIPO EL TOR",
            "A009 - COLERA NO ESPECIFICADO",
            "A010 - FIEBRE TIFOIDEA",
            "A011 - FIEBRE PARATIFOIDEA A",
            "A012 - FIEBRE PARATIFOIDEA B",
            "A013 - FIEBRE PARATIFOIDEA C",
            "A014 - FIEBRE PARATIFOIDEA, NO ESPECIFICADA",
            "A90 - FIEBRE DEL DENGUE CLASICO",
            "A91 - FIEBRE DEL DENGUE HEMORRAGICO",
            "A920 - ENFERMEDAD POR VIRUS CHIKUNGUNYA",
            "A923 - FIEBRE DEL OESTE DEL NILO",
            "A928 - OTRAS FIEBRES VIRALES ESPECIFICADAS TRANSMITIDAS POR MOSQUITOS",
            "A929 - FIEBRE VIRAL TRANSMITIDA POR MOSQUITO, SIN OTRA ESPECIFICACION"
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
          
          //Popular tabla
//          var settings = {
//            "async": true,
//            "crossDomain": true,
//            "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.detalle/atencion/" + codProceso,
//            "method": "GET",
//            "headers": {
//              "content-type": "application/json",
//              "cache-control": "no-cache",
//              "postman-token": "c6a74f6e-c1b2-f555-27d9-78595ce29fbe"
//            },
//            "processData": false,
//            "data": ""
//          }
//
//          $.ajax(settings).done(function (datos) {
//              html2 = '';
//                  $.each(datos, function (i, value) {
//                      html2 += '<tr>';
//                      html2 += '<td>'+ datos[i].coddetalle +'</td>';
//                      html2 += '<td>'+ datos[i].tipo +'</td>';
//                      html2 += '<td>'+ datos[i].principal +'</td>';
//                      html2 += '<td>'+ datos[i].servicio +'</td>';
//                      html2 += '<td>'+ datos[i].cod4.descripciondiagnostico +'</td>';
//                      html2 += '</tr>';
//                  });
//                  document.getElementById('CuerpoDetalleAtencion').innerHTML = html2; 
//          });

        $("#btnIncorporarDiagnostico").click(function(){
            codDiagnostico = $("input:checked[name='radCheckDiagnostico']").val();
            console.log(codDiagnostico);
            $("#txtDiagnosticoSel").val(codDiagnostico);
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
                      html2 += '<td>'+ datos[i].servicio +'</td>';
                      html2 += '<td>'+ datos[i].cod4.descripciondiagnostico +'</td>';
                      html2 += '</tr>';
                  });
                  document.getElementById('CuerpoDetalleAtencion').innerHTML = html2; 
          });
            
          });
            
        });

        $('input.typeahead').typeahead({
		name: 'diagnosticos',
		local: diagnosticosJSON
	});
            
	$("#btnSiguiente").click(function(){
            if ($("input[name='opTipoDiag']").is(':checked')) {
                tipoDiagnostico = $("input[name='opTipoDiag']:checked").val();               
            } 
            periodicidad = $("#selPrincipal").val();
            console.log("Tipo " + tipoDiagnostico);
            console.log("Periodicidad " + periodicidad);
        });
        
	$("#btnTerminar").click($.botonTerminar);

});
