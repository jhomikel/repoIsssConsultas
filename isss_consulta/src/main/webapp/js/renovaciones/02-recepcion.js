$(document).ready(function () {

    // Cargar credenciales
    //cargaCredenciales();
    //cargaPaginaIniciaTarea();
    //obtieneNombreCliente(codigoAfiliado);
    //obtieneDetallesInstanciaProceso($.urlParam('processid'));

    var processid = $.urlParam('processid');
    var codigoAfiliado = $.urlParam('afiliadoID');
    var varsFrecuentes = "?processid=" + processid + "&afiliadoID=" + codigoAfiliado;
    var codigoCita = 0;
    
    var fecha = new Date();
    var fechaSttr = '<h2>Cita programada: ' + fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear() + '</h2>';
    document.getElementById('MostrarFecha').innerHTML = fechaSttr;

    $.getJSON("http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.cita/fechacita",
	{   
            numafiliacion: codigoAfiliado,
            fechacita: fecha.getFullYear() + '-' + (fecha.getMonth() +1) + '-' + fecha.getDate()
        },
	mostrarDatosCita);

    function mostrarDatosCita(datos) {
        html = '<div class="table-responsive"><table class="tablasJSON table table-striped">';
        html += '<caption class=encabezado><h4>CITA</h4></caption>';
        html += '<tr><th>ITEM</th>';
        html += '<th>DESCRIPCION</th></tr>';
        $.each(datos, function (i, value) {
            codigoCita = datos[i].codcita;
            html += '<tr><td>Tipo de cita</td><td>' + datos[i].tipo + '</td></tr>';
            html += '<tr><td>Fecha de la solicitud</td><td>' + datos[i].fechasolicitud + '</td></tr>';
            html += '<tr><td>Fecha de la cita</td><td>' + datos[i].fechacita + '</td></tr>';
            html += '<tr><td>Hora de la cita</td><td>' + datos[i].horacita + '</td></tr>';
            html += '<tr><td>Clinica de la cita</td><td>' + datos[i].clinica + '</td></tr>';
            html += '<tr><td>Especialidad</td><td>' + datos[i].codmedico.codespecialidad.nombespecialidad + '</td></tr>';
            html += '<tr><td>Nombre del medico</td><td>' + datos[i].codmedico.nombres + '</td></tr>';
            html += '<tr><td>Apellido del medico</td><td>' + datos[i].codmedico.apellidos + '</td></tr>';
            html += '</table>';
        });
        html += '</div>';
        document.getElementById('citas').innerHTML = html;

    };


    $("#btnSiguiente").click(function iniciarCita(){
        //botonSiguiente;
        //Recuperar el número del proceso
        
        var processid = 25953;
        
        var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://192.168.56.102:8080/ISSS_Servicios/webresources/entidades.atencion",
                "method": "POST",
                "headers": {
                  "content-type": "application/json",
                  "cache-control": "no-cache",
                  "postman-token": "3075258f-be72-fd00-b378-06db8d7bbe0c"
                },
                "processData": false,
                "data": "{\n\
                            \"codatencion\":" + processid + ",\n\
                            \"fechaatencion\":" + fecha.getTime() + ",\n\
                            \"tipohoja\":\"HOJA SUBSECUENTE\",\n\
                            \"codcita\":{\n\
                                \"codcita\":" + codigoCita + "\n\
                                    }\n\
                        }"
          }

          $.ajax(settings).done(function (response) {
            alert('Cita ingresada satisfactoriamente');
          });
    });
    $("#btnTerminar").click(function () {
        var r = confirm("Esta seguro que desea salir?");
        if (r === true) {
            window.location = "../tareas/tareas-pendientes.html";
        }
    });

});