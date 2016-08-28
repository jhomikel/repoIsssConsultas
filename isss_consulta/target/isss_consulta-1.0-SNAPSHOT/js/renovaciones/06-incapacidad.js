$(document).ready(function(){

    cargaCredenciales();
    cargaPaginaIniciaTarea();
    obtieneNombreCliente(codigoCliente);
    obtieneDetallesInstanciaProceso($.urlParam('processid'));
	
    $("#salario").jStepper();
    $("#comisiones").jStepper();
    $("#ingremesas").jStepper();
    $("#horasextra").jStepper();
    $("#interesesyalquileres").jStepper();
    $("#dividendos").jStepper();
    $("#otros").jStepper();
    $("#gastosdevida").jStepper();
    $("#dctoley").jStepper();
    $("#otrosegresos").jStepper();

	//var urlExterno = $("#direccion_url").val();
	//var varsFrecuentes = "?processid=" + processid + "&clientesID=" + codigoCliente;
	//var iframeUrl = urlExterno + varsFrecuentes;

    $("#btnSiguiente").click(function(){
        //console.log('click en siguiente');
        var ingresosEgresos = {
            'map_salario': $("#salario").val(),
            'map_comisiones': $("#comisiones").val(),
            'map_ingreso_remesas': $("#ingremesas").val(),
            'map_horas_extra': $("#horasextra").val(),
            'map_intereses_alquileres': $("#interesesyalquileres").val(),
            'map_dividendos': $("#dividendos").val(),
            'map_otros': $("#otros").val(),
            'map_gastos_vida': $("#gastosdevida").val(),
            'map_descuentos_ley': $("#dctoley").val(),
            'map_otros_egresos': $("#otrosegresos").val()
        }

        //console.log(ingresosEgresos);

        botonSiguiente('', ingresosEgresos);
    } );
	$("#btnTerminar").click($.botonTerminar);

});