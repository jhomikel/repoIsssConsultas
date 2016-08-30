$(document).ready(function(){

    cargaCredenciales();
    cargaPaginaIniciaTarea();
    obtieneNombreCliente($.urlParam('clientesID'));
    obtieneDetallesInstanciaProceso($.urlParam('processid'));
    
    $("#btnSiguiente").click(function(){
        
        var temperatura = $("#Temperatura").val();
        var fc = $("#FC").val();
        var fr = $("#FR").val();
        var peso = $("#Peso").val();
        var tsistolica = $("#TSistolica").val();
        var tdiastolica = $("#TDiastolica").val();
        var codatencion = $.urlParam('processid');
        
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.signos",
            "method": "POST",
            "headers": {
              "content-type": "application/json",
              "cache-control": "no-cache",
              "postman-token": "bbfeb3dd-14a3-6ae2-a0c5-ceebcd2d2734"
            },
            "processData": false,
            "data": "{\n\
                            \"temperatura\":" + temperatura + ",\n\
                            \"fc\":" + fc + ",\n\
                            \"fr\":" + fr + ",\n\
                            \"peso\":" + peso + ",\n\
                            \"tsistolica\":" + tsistolica + ",\n\
                            \"tdiastolica\":" + tdiastolica + ",\n\
                            \"codatencion\":{\n\
                                \"codatencion\":" + codatencion + "\n\
                            }\n\
                     }"
          }

          $.ajax(settings).done(function (response) {
              alert('Signos ingresados satisfactoriamente');
              botonSiguiente($.urlParam('processid'), '');
          });
        
    });

    $("#btnTerminar").click(function () {
        var r = confirm("Esta seguro que desea salir?");
        if (r === true) {
            window.location = "../tareas/tareas-pendientes.html";
        }
    });

});
