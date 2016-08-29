$(document).ready(function () {

    cargaCredenciales();

    $("#afiliado_num").jStepper();
    $("#btnBuscar").click(function () {
        var afiliadonum = $("#afiliado_num").val();
        var jsonUrl = "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.cita/afiliado/";
        if (afiliadonum.length > 0) {
            $.getJSON(jsonUrl + afiliadonum,
                    mostrarDatosAfiliado);
        }
    });

    function mostrarDatosAfiliado(datos) {
        html = '<div class="table-responsive"><table class="table table-striped">';
        html += '<caption class="encabezado">DATOS ENCONTRADOS</caption>';
        html += '<tbody><tr><td>Numero de afiliaci&oacute;n:</td><td id="cliente_numeroAfiliacion">' + datos[0].numafiliacion.numafiliacion + '</td></tr>';
        html += '<tr><td>Nombres:</td><td>' + datos[0].numafiliacion.nombres + '</td></tr>';
        html += '<tr><td>Apellidos:</td><td>' + datos[0].numafiliacion.apellidos + '</td></tr>';
        html += '<tr><td id="cliente_DUI">DUI:</td><td>' + datos[0].numafiliacion.dui + '</td></tr>';
        html += '<tr><td>Sexo:</td><td>' + datos[0].numafiliacion.sexo + '</td></tr>';
        html += '<tr><td>Ocupaci&oacute;n:</td><td>' + datos[0].numafiliacion.ocupacion + '</td></tr>';
        html += '<tr><td>Departamento:</td><td>' + datos[0].numafiliacion.departamento + '</td></tr>';
        html += '<tr><td>Municipio:</td><td>' + datos[0].numafiliacion.municipio + '</td></tr>';
        html += '<tr><td>Direcci&oacute;n:</td><td>' + datos[0].numafiliacion.direccion + '</td></tr>';
        html += '<tr><td colspan=2 align=center>CITAS PENDIENTES</td></tr>';
        $.each(datos, function (i, value) {
            html += '<tr><td>Cita ' + datos[i].codcita + '</td>';
            html += '<td>' + datos[i].fechacita + ' - ' + datos[i].horacita + '</td>';
            html += '</tr>';
        });
        html += '</tbody></table></div>';
        $("#resultado").html(html);
        $('#clientes_numeroAfiliacion').val(datos[0].numafiliacion.numafiliacion);
        $('#clientes_DUI').val(datos[0].numafiliacion.dui);
        $('#clientes_nombreAfiliado').val(datos[0].numafiliacion.nombres + ' ' + datos[0].numafiliacion.apellidos);
    };

    $("#btnSiguiente").click(botonSiguientePaso1);
    $("#btnTerminar").click(function () {
        var r = confirm("Esta seguro que desea salir?");
        if (r === true) {
            window.location = "../tareas/tareas-pendientes.html";
        }
    });
});
