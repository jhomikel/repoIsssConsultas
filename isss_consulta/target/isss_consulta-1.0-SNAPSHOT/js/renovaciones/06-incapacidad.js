$(document).ready(function(){

    //cargaCredenciales();
    //cargaPaginaIniciaTarea();
    //obtieneNombreCliente(codigoCliente);
    //obtieneDetallesInstanciaProceso($.urlParam('processid'));
    
    var codAtencion = $.urlParam('processid');
    
    var fecha = new Date();
    var fechaSttr = fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();
    $("#txtFechaIni").val(fechaSttr);
    
    $("#btnSiguiente").click(function(){
        var dias = $("#txtNDias").val();
        var dirigidoa = $("#txtDirigidoA").val();
        var motivo = $("#txtMotivo").val();
        console.log(dias);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.incapacidad",
            "method": "POST",
            "headers": {
              "content-type": "application/json",
              "cache-control": "no-cache",
              "postman-token": "b7a39788-6140-0ad5-68c9-6f0d2f5f7d3b"
            },
            "processData": false,
            "data": "{\n\
                        \"fechaini\": \""+ fecha.getTime() +"\",\n\
                        \"dias\": "+ dias +",\n\
                        \"dirigidoa\": \""+ dirigidoa +"\",\n\
                        \"motivo\": \""+ motivo +"\",\n\
                        \"codatencion\": {\n\
                            \"codatencion\": "+ codAtencion +"\n\
                        }\n\
                    }"
          }

          $.ajax(settings).done(function (response) {
            alert('La incapacidad fue registrada satisfactoriamente');
          });
        
    } );
    
    $("#btnTerminar").click($.botonTerminar);

});