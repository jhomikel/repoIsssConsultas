$(document).ready(function () {

    cargaCredenciales();
    
    var SelectNumAfiliado = '';

    $("#afiliado_num").jStepper();
    $("#btnBuscar").click(function () {
        SelectNumAfiliado = $("#afiliado_num").val();
        var jsonUrl = "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.cita/afiliado/";
        if (SelectNumAfiliado.length > 0) {
            $.getJSON(jsonUrl + SelectNumAfiliado,
                    mostrarDatosAfiliado);
        }
    });
    
    var fecha = new Date();
    var fechaSttr = '' + fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear() + '</h2>';
    document.getElementById('fechaCitaBusqueda').innerHTML = fechaSttr;
    
    var settingsCitasDiarias = {
        "async": true,
        "crossDomain": true,
        "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.cita/citasAhora",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "e99413ae-71f1-1772-9825-949c1cdfa87b"
        },
        "processData": false,
        "data": ""
      }

      $.ajax(settingsCitasDiarias).done(function (responseAfiliado) {
          html2 = '';
          $.each(responseAfiliado, function (j, value) {
             html2 += '<tr>'; 
             html2 += '<td>'+ responseAfiliado[j].numafiliacion.numafiliacion +'</td>';
             html2 += '<td>'+ responseAfiliado[j].numafiliacion.apellidos +'</td>';
             html2 += '<td>'+ responseAfiliado[j].numafiliacion.nombres +'</td>';
             html2 += '<tr>'; 
          });
          document.getElementById('tblBodyCitas').innerHTML = html2;
          
          $('table tbody tr').click(function(){
            SelectNumAfiliado = $(this).find("td").eq(0).text();
            console.log(SelectNumAfiliado);
            var jsonUrl = "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.cita/afiliado/";
            if (SelectNumAfiliado.length > 0) {
                $.getJSON(jsonUrl + SelectNumAfiliado,
                        mostrarDatosAfiliado);
            }
        });
      });
    
    

    function mostrarDatosAfiliado(datos) {
        html = '<div class="table-responsive"><table class="table table-striped">';
        html += '<caption class="encabezado">DATOS ENCONTRADOS</caption>';
        html += '<tbody>';
        if(datos[0].numafiliacion.sexo === 'M'){
            html += '<tr><td rowspan="10"><img src="../images/hombre_foto.jpg"></td></tr>';
        } else {
            html += '<tr><td rowspan="10"><img src="../images/mujer_foto.jpg"></td></tr>';
        }
        html += '<tr><td>Numero de afiliaci&oacute;n:</td><td id="cliente_numeroAfiliacion">' + datos[0].numafiliacion.numafiliacion + '</td></tr>';
        html += '<tr><td>Nombres:</td><td>' + datos[0].numafiliacion.nombres + '</td></tr>';
        html += '<tr><td>Apellidos:</td><td>' + datos[0].numafiliacion.apellidos + '</td></tr>';
        html += '<tr><td id="cliente_DUI">DUI:</td><td>' + datos[0].numafiliacion.dui + '</td></tr>';
        html += '<tr><td>Sexo:</td><td>' + datos[0].numafiliacion.sexo + '</td></tr>';
        html += '<tr><td>Ocupaci&oacute;n:</td><td>' + datos[0].numafiliacion.ocupacion + '</td></tr>';
        html += '<tr><td>Departamento:</td><td>' + datos[0].numafiliacion.departamento + '</td></tr>';
        html += '<tr><td>Municipio:</td><td>' + datos[0].numafiliacion.municipio + '</td></tr>';
        html += '<tr><td>Direcci&oacute;n:</td><td>' + datos[0].numafiliacion.direccion + '</td></tr>';
        html += '<tr><td colspan=3 align=center>CITAS PENDIENTES</td></tr>';
        $.each(datos, function (i, value) {
            html += '<tr><td>Cita ' + datos[i].codcita + '</td>';
            html += '<td>' + datos[i].fechacita + '</td>';
            html += '<td>' + datos[i].horacita + '</td>';
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
