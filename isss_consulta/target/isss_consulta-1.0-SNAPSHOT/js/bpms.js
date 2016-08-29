    //DIGICEL
window.server = 'http://192.168.56.102:8080';
window.processDeployment = 'UnidadISSS:ConsultaPrj:1.0';
window.processDefinitionID = 'ConsultaPrj.ProcessConsulta';
//window.usuario = 'mmayen';
window.passwd = 'J$123456'
console.log('vars seteadas en bpms.js');

//PRUEBAS LOCALES VM
//window.server = 'http://localhost:8080';
//window.processDeployment = 'bpmDemostracion:ejemploSubida:1.0';
//window.processDefinitionID = 'ejemploSubida.demoAPI2';
//window.usuario = 'bpmadmin';
//window.passwd = 'J$123456'

$.iniciaProcesoEmail = function (processDefinitionID, processDeployment, clienteID, correo) {
    $.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true,
        },
        cache: true,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(window.usuario + ':' + window.passwd));
        },
        url: server + '/business-central/rest/runtime/' + processDeployment + '/process/' + processDefinitionID + '/start',
        data: {
            "map_cod_cliente": '"' + clienteID + '"',
            "map_dir_correo": correo
        },
        success: function (data) {
            console.log('Proceso creado con ID: ' + data.id);
            //console.log(data.id);
            //processID = data.id;
        },
        error: function () {
            console.log('Error creando proceso')
        }
    })
}


var iniciaProceso = function (processDefinitionID, processDeployment, dataMappings) {
    console.log('usuario a utilizar: ' + window.usuario);
    console.log('password: ' + window.passwd);
    $.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true,
        },
        cache: true,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(window.usuario + ':' + window.passwd));
        },
        url: server + '/business-central/rest/runtime/' + processDeployment + '/process/' + processDefinitionID + '/start',
        data: dataMappings,
        success: function (data) {
            console.log('Proceso iniciado con exito, ID=' + data.id);
            console.log('Obteniendo tarea recien creada...');
            botonSiguiente(data.id);
            //obtieneTareaPorProceso(data.id, 1);
        },
        error: function () {
            console.log('Error ejecutando metodo iniciaProceso');
            //para pruebas offline
            //console.log('pruebas offline: Inicia Proceso =====')
            //var json = {
            //    "process-id": "ejemploSubida.demoAPI2",
            //    "id": "26244",
            //    "state": "1",
            //    "parentProcessInstanceId": "0",
            //    "status": "SUCCESS",
            //    "url": "/business-central/rest/runtime/bpmDemostracion:ejemploSubida:1.0/process/ejemploSubida.demoAPI2/start"
            //};
            //console.log(json);
            //console.log(json.id);
            //var bpms = {
            //    codCliente: $('#clientes_clienteId').val(),
            //    processID: json.id
            //};
            ////lo convierto a JSON
            //bpms = JSON.stringify(bpms);
            ////por si lo quiero encriptar
            ////bpms = btoa(bpms);
            ////lo guardo en el localStorage
            //localStorage.setItem('bpmsls', bpms);
            //console.log('funcion guardar en localStorage completada');
            //console.log(bpms);
        }
    })
}

var obtieneTareaPorProceso = function(processID, bandCompletar) {
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true,
        },
        cache: true,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(window.usuario + ':' + window.passwd));
        },
        url: server + '/business-central/rest/task/query',
        data: {
            "processInstanceId": processID
        },
        success: function (data) {
            //console.log(data);
            $.each(data.taskSummaryList, function (index, element) {
                if (element.status == 'Reserved' || element.status == 'Ready') {
                    console.log('Iniciando tarea encontrada con ID=' + element.id);
                    iniciaTarea(element.id, processID, bandCompletar);
                }
                if (element.status == 'InProgress') {
                    console.log('Tarea con ID ' + element.id + ' encontrada en proceso, variable seteada');
                    taskID = element.id;
                }
            });
        },
        error: function () {
            console.log('Error ejecutando metodo obtieneTareaPorProceso');
        }
    })
}

var iniciaTarea = function(tareaID, processID, bandCompletar) {//if bandCompletar = 1 completa la tarea justo despues de iniciarla
    console.log('usuario a utilizar: ' + window.usuario);
    console.log('password: ' + window.passwd);
    $.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true,
        },
        cache: true,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(window.usuario + ':' + window.passwd));
        },
        url: server + '/business-central/rest/task/' + tareaID + '/start',
        success: function (data) {
            //console.log(data);
            if (data.status == 'SUCCESS') {
                console.log('Tarea con ID ' + tareaID + ' iniciada');
                taskID = tareaID;
            }
            if (bandCompletar == 1) {
                console.log('completando tarea recien iniciada...');
                var parametros = {
                    "map_cod_cliente": '"' + $('#clientes_clienteId').val() + '"',
                    "map_nit_cliente": '"' + $('#clientes_nithidden').val() + '"',
                    "map_nombreCliente": '"' + $('#clientes_nombrehidden').val() + '"'
                };
                completaTarea(tareaID, processID, parametros, bandCompletar);
            }
        },
        error: function () {
            console.log('Error ejecutando metodo iniciaTarea');
        }
    })
}

var completaTarea = function(taskID, processID, dataMappings, bandCompletar) {
    console.log('usuario a utilizar: ' + window.usuario);
    console.log('password: ' + window.passwd);
    $.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true,
        },
        cache: true,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(window.usuario + ':' + window.passwd));
        },
        url: server + '/business-central/rest/task/' + taskID + '/complete',
        data: dataMappings,
        success: function (data) {
            //console.log(data);
            if (data.status == 'SUCCESS') {
                console.log('Tarea con ID ' + taskID + ' completada');
            }
            if (bandCompletar == 1) {
                botonSiguiente(processID);
            }
            //$.siguientePaso(processID, $("#paso_siguiente").val(), $('#clientes_clienteId').val());
        },
        error: function () {
            console.log('Error ejecutando metodo completaTarea');
        }
    })
}


function obtieneTareas(potentialOwner, estado) {

    //obtieneVariablesProceso('12345', 'nombre cliente', '26308', 'IDDeployment');
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true,
        },
        cache: true,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(window.usuario + ':' + window.passwd));
        },
        url: server + '/business-central/rest/task/query',
        data: {
            "potentialOwner": potentialOwner
        },
        success: function (data) {
            //$('#resultado').html(JSON.stringify(data));
            $.each(data.taskSummaryList, function (index, element) {
                if (estado == 'pendientes') {
                    if (element.status == 'Reserved' || element.status == 'Ready') {
                        console.log(element.id);
                        obtieneVariablesProceso(element);
                    }
                }
                else {//cuando estan en proceso
                    if (element.status == 'InProgress') {
                        console.log(element.id);
                        obtieneVariablesProceso(element);
                    }
                }
                
            });
        },
        error: function () {
            //para pruebas offline de formateo
            console.log('pruebas offline Obtiene tareas ===');
            var json = {
                "status": null,
                "url": null,
                "index": null,
                "commandName": null,
                "taskSummaryList": [
                   {
                       "@class": "org.kie.services.client.serialization.jaxb.impl.task.JaxbTaskSummary",
                       "id": 801,
                       "name": "Tarea 1",
                       "subject": "",
                       "description": "../renovaciones/02-detalle-cuenta.html",
                       "status": "InProgress",
                       "priority": 0,
                       "skipable": true,
                       "actualOwnerId": "bpmadmin",
                       "createdById": "bpmadmin",
                       "createdOn": 1463584786190,
                       "activationTime": 1463584786190,
                       "expirationTime": null,
                       "processInstanceId": 26209,
                       "processId": "ejemploSubida.demoAPI2",
                       "processSessionId": 546,
                       "deploymentId": "bpmDemostracion:ejemploSubida:1.0",
                       "quickTaskSummary": false,
                       "parentId": -1,
                       "potentialOwners": null
                   },
                   {
                       "@class": "org.kie.services.client.serialization.jaxb.impl.task.JaxbTaskSummary",
                       "id": 802,
                       "name": "Tarea 1",
                       "subject": "",
                       "description": "",
                       "status": "Completed",
                       "priority": 0,
                       "skipable": true,
                       "actualOwnerId": "bpmadmin",
                       "createdById": "bpmadmin",
                       "createdOn": 1463584800605,
                       "activationTime": 1463584800605,
                       "expirationTime": null,
                       "processInstanceId": 26210,
                       "processId": "ejemploSubida.demoAPI2",
                       "processSessionId": 546,
                       "deploymentId": "bpmDemostracion:ejemploSubida:1.0",
                       "quickTaskSummary": false,
                       "parentId": -1,
                       "potentialOwners": null
                   },
                   {
                       "@class": "org.kie.services.client.serialization.jaxb.impl.task.JaxbTaskSummary",
                       "id": 803,
                       "name": "Tarea 1",
                       "subject": "",
                       "description": "../renovaciones/01-busqueda-clientes.html",
                       "status": "Reserved",
                       "priority": 0,
                       "skipable": true,
                       "actualOwnerId": "bpmadmin",
                       "createdById": "bpmadmin",
                       "createdOn": 1463584801398,
                       "activationTime": 1463584801398,
                       "expirationTime": null,
                       "processInstanceId": 26211,
                       "processId": "ejemploSubida.demoAPI2",
                       "processSessionId": 546,
                       "deploymentId": "bpmDemostracion:ejemploSubida:1.0",
                       "quickTaskSummary": false,
                       "parentId": -1,
                       "potentialOwners": null
                   },
                   {
                       "@class": "org.kie.services.client.serialization.jaxb.impl.task.JaxbTaskSummary",
                       "id": 804,
                       "name": "Tarea 2",
                       "subject": "",
                       "description": "../renovaciones/02-detalle-cuenta.html",
                       "status": "Ready",
                       "priority": 0,
                       "skipable": true,
                       "actualOwnerId": "bpmadmin",
                       "createdById": "bpmadmin",
                       "createdOn": 1463584825180,
                       "activationTime": 1463584825180,
                       "expirationTime": null,
                       "processInstanceId": 26210,
                       "processId": "ejemploSubida.demoAPI2",
                       "processSessionId": 546,
                       "deploymentId": "bpmDemostracion:ejemploSubida:1.0",
                       "quickTaskSummary": false,
                       "parentId": -1,
                       "potentialOwners": null
                   }
                ],
                "pageNumber": null,
                "pageSize": null
            };
            $.each(json.taskSummaryList, function (index, element) {
                if (estado == 'pendientes') {
                    if (element.status == 'Reserved' || element.status == 'Ready') {
                        console.log('ENCONTRE UNA TAREA RESERVADO O READY');
                        obtieneVariablesProceso(element);
                        //console.log('processInstanceId: ' + element.processInstanceId + ' deploymentId: ' + element.deploymentId);
                    }
                }
                else {
                    if (element.status == 'InProgress') {
                        console.log('ENCONTRE UNA TAREA INPROGRESS');
                        obtieneVariablesProceso(element);
                        //console.log('processInstanceId: ' + element.processInstanceId + ' deploymentId: ' + element.deploymentId);
                    }
                }
                
            });
        }
    })
}

//taskElement es el json completo de la tarea, procVariables son todas las variables del proceso al cual pertenece esa tarea
function construyeLinea(taskElement, procVariables) {
    var cod_afiliado = procVariables.variables.afiliadoID;
    var dui_afiliado = procVariables.variables.DUI;
    var nombre_cliente = procVariables.variables.nombreAfiliado;
    var procID = taskElement.processInstanceId;
    var URLtaskForm = taskElement.description;
    var estado = taskElement.status;
    console.log('URL: ' + taskElement.description);
    console.log('processID: ' + procID);
    console.log('cod_cliente: ' + cod_afiliado);
    console.log('nit_cliente: ' + dui_afiliado);
    console.log('nombreCliente: ' + nombre_cliente);
    $('#tablaTareas').append($('<tr>').append(
                '<td>' + taskElement.id + '</td>' +
                '<td>' + taskElement.name + '</td>' +
                '<td>' + nombre_cliente + ': ' + cod_afiliado + '</td>' +
                '<td>' + dui_afiliado + '</td>' +
                '<td>' + taskElement.priority + '</td>' +
                '<td>' + (taskElement.status == 'Reserved' || 'Ready' ? 'Pendiente' : 'En Proceso') + '</td>' +
                '<td>' + formatoFechaISO(taskElement.createdOn) + '</td>'
                    ).attr({
                        'class': 'clickableRow',
                        'onclick': 'window.location="' + URLtaskForm + '?clientesID=' + cod_afiliado + '&processid=' + procID + '&taskID=' + taskElement.id + '&estado=' + estado + '"'
                    })
                );
}

function obtieneVariablesProceso(taskElement) {
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true,
        },
        cache: true,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(window.usuario + ':' + window.passwd));
        },
        url: server + '/business-central/rest/runtime/' + taskElement.deploymentId + '/withvars/process/instance/' + taskElement.processInstanceId,
        success: function (data) {
            construyeLinea(taskElement, data);
            //$('#resultado').html(JSON.stringify(data));
        },
        error: function () {
            console.log('Error ejecutando metodo obtieneVariablesProceso');
        }
    })
}

function obtieneVariablePaso4() {//le mando el deployment id que es x:x:x y el processid
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true,
        },
        cache: true,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(window.usuario + ':' + window.passwd));
        },
        url: server + '/business-central/rest/runtime/' + window.processDeployment + '/withvars/process/instance/' + processid,
        success: function (data) {
            console.log(data.variables.autorizarLC);
            if(data.variables.autorizarLC == 'No_CC'){//Se va a IMEIs, caso por defecto
                //redirijo
                var pasoSiguiente = $("#paso_siguiente").val();
                window.location = pasoSiguiente + "?processid=" + processid + "&clientesID=" + codigoCliente;
            }
            else{//caso alterantivo, voy para ingresos/egresos
                $("#paso_siguiente").val('05-adicionar-actualizar-ingresos-egresos.html');
                var pasoSiguiente = $("#paso_siguiente").val();
                window.location = pasoSiguiente + "?processid=" + processid + "&clientesID=" + codigoCliente;
            }
        },
        error: function () {
            //para pruebas offline de formateo
            console.log('Error llamando a metodo');
        }
    })
}

function obtieneDetallesInstanciaProceso(processInstanceID) {
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true,
        },
        cache: true,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(window.usuario + ':' + window.passwd));
        },
        url: server + '/business-central/rest/history/instance/' + processInstanceID,
        success: function (data) {
            //tengo que setear el reloj saco la diferencia entre la fecha obtenida y ahora
            console.log(data.start);
            var fechaIni = new Date(data.start);
            var fechaPresente = new Date();
            console.log('Fecha inicial: ' + fechaIni);
            console.log('Fecha ahora: ' + fechaPresente);
            var diff = fechaIni - fechaPresente;
            console.log(diff);
            var date = new Date().addSeconds(diff / 1000) / 1000;

            $('.timer').countid({
                clock: true,
                dateTime: date,
                dateTplRemaining: "%H:%M:%S",
                dateTplElapsed: "%H:%M:%S",
                complete: function (el) {
                    el.animate({ 'font-size': '18px' });
                }
            });
        },
        error: function () {
            //para pruebas offline de formateo
            console.log('pruebas offline obtiene Variables ==');
            var json = {
                "process-instance-id": "26123",
                "process-id": "RenovacionLineas.Digicel_Renovacion",
                "start": "2016-06-07T10:34:02.897-06:00",
                "status": "1",
                "parent-process-instance-id": "-1",
                "outcome": {
                    "@nil": "true"
                },
                "identity": "mmayen",
                "process-version": "1.0",
                "process-name": "Digicel_Renovacion",
                "external-id": "bpmDigicel:RenovacionLineas:1.0",
                "process-instance-description": "Digicel_Renovacion"
            };
            
            //tengo que setear el reloj saco la diferencia entre la fecha obtenida y ahora
            console.log(json.start);
            var fechaIni = new Date(json.start);
            var fechaPresente = new Date();
            console.log('Fecha inicial: ' + fechaIni);
            console.log('Fecha ahora: ' + fechaPresente);
            var diff = fechaIni - fechaPresente;
            console.log(diff);
            var date = new Date().addSeconds(diff/1000) / 1000;

            $('.timer').countid({
                clock: true,
                dateTime: date,
                dateTplRemaining: "%H:%M:%S",
                dateTplElapsed: "%H:%M:%S",
                complete: function (el) {
                    el.animate({ 'font-size': '18px' });
                }
            });

        }
    })
}

function obtieneVariablesIngresoEgreso() {//le mando el deployment id que es x:x:x y el processid (esto ya esta en la URL y lo seteo en cargapaginainiciatarea)
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true,
        },
        cache: true,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(window.usuario + ':' + window.passwd));
        },
        url: server + '/business-central/rest/runtime/' + window.processDeployment + '/withvars/process/instance/' + processid,
        success: function (data) {
            var htmlinterno = '';
            console.log(data);
            //console.log(data.variables.autorizarLC);
            if (data.variables.salario !== undefined) {
                htmlinterno += '<br id="txtSalario">Salario: <b>' + data.variables.salario + '</b>';
            }
            if (data.variables.comisiones !== undefined) {
                htmlinterno += '<br id="txtComision">Comisiones: <b>' + data.variables.comisiones + '</b>';
            }
            if (data.variables.ingreso_remesas !== undefined) {
                htmlinterno += '<br id="txtRemesas">Remesas: <b>' + data.variables.ingreso_remesas + '</b>';
            }
            if (data.variables.horas_extra !== undefined) {
                htmlinterno += '<br id="txtHorasExtra">Horas extra: <b>' + data.variables.horas_extra + '</b>';
            }
            if (data.variables.intereses_alquileres !== undefined) {
                htmlinterno += '<br id="txtInteres">Intereses: <b>' + data.variables.intereses_alquileres + '</b>';
            }
            if (data.variables.dividendos !== undefined) {
                htmlinterno += '<br id="txtDividendos">Dividendos: <b>' + data.variables.dividendos + '</b>';
            }
            if (data.variables.otros !== undefined) {
                htmlinterno += '<br id="txtOtrosIng">Otros: <b>' + data.variables.otros + '</b>';
            }
            console.log(htmlinterno);
            $('#ingresostd').html(htmlinterno);
            //FIN INGRESOS
            var htmlinternoegresos = '';
            if (data.variables.gastos_vida !== undefined) {
                htmlinternoegresos += '<br id="txtVida">Gastos de vida: <b>' + data.variables.gastos_vida + '</b>';
            }
            if (data.variables.descuentos_ley !== undefined) {
                htmlinternoegresos += '<br id="txtLey">Descuentos de ley: <b>' + data.variables.descuentos_ley + '</b>';
            }
            if (data.variables.otros_egresos !== undefined) {
                htmlinternoegresos += '<br id="txtOtrosEg">Otros: <b>' + data.variables.otros_egresos + '</b>';
            }
            console.log(htmlinternoegresos);
            $('#egresostd').html(htmlinternoegresos);
            //INCREMENTO LC
            if (data.variables.incrementoLC !== undefined) {
                $('#incrementoLC').html(data.variables.incrementoLC);
            }
           
            
        },
        error: function () {
            //para pruebas offline de formateo
            console.log('Error llamando a metodo');
        }
    })
}


function obtieneTareasIndex() {
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true,
        },
        cache: true,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(window.usuario + ':' + window.passwd));
        },
        url: server + '/business-central/rest/task/query',
        //data: {
        //    "potentialOwner": potentialOwner
        //},
        success: function (data) {
            var countCompletadas = 0;
            var countEnProceso = 0;
            var countPendientes = 0;
            //$('#resultado').html(JSON.stringify(data));
            $.each(data.taskSummaryList, function (index, element) {
                if (element.status == 'Reserved' || element.status == 'Ready') {
                    countPendientes++;
                }
                if (element.status == 'InProgress') {
                    countEnProceso++;
                }
                if (element.status == 'Completed') {
                    countCompletadas++;
                }
            });
            //seteo los valores en el DOM
            console.log('pendientes, proceso, completadas=' + countPendientes + ',' + countEnProceso + ',' + countCompletadas);
            $('#countCompletadas').text(countCompletadas);
            $('#countEnProceso').text(countEnProceso);
            $('#countPendientes').text(countPendientes);
        },
        error: function () {
            //para pruebas offline de formateo
            console.log('Error ejecutando metodo obtieneTareasIndex');
            var countCompletadas = 25;
            var countEnProceso = 14;
            var countPendientes = 9;
            console.log('pendientes, proceso, completadas=' + countPendientes + ',' + countEnProceso + ',' + countCompletadas);
            $('#countCompletadas').text(countCompletadas);
            $('#countEnProceso').text(countEnProceso);
            $('#countPendientes').text(countPendientes);
        }
    })
}