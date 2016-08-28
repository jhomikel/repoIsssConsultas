$(document).ready(function(){

    //cargaCredenciales();
    //cargaPaginaIniciaTarea();
    //obtieneNombreCliente(codigoCliente);
    obtieneDetallesInstanciaProceso($.urlParam('processid'));
    
    $("#btnSiguiente").click(function(){
        
        var temperatura = $("#Temperatura").val();
        var fc = $("#FC").val();
        var fr = $("#FR").val();
        var peso = $("#Peso").val();
        var talla = $("#Talla").val();
        var tsistolica = $("#TSistolica").val();
        var tdiastolica = $("#TDiastolica").val();
        var codatencion = $.urlParam('processid');
        
        //Operación botón siguiente
    });

    $("#btnTerminar").click(function () {
        var r = confirm("Esta seguro que desea salir?");
        if (r === true) {
            window.location = "../tareas/tareas-pendientes.html";
        }
    });

});
