//DIGICEL
window.server = 'http://172.26.20.122:8080';
window.processDeployment = 'bpmDigicel:RenovacionLineas:1.0';
window.processDefinitionID = 'RenovacionLineas.Digicel_Renovacion';
window.usuario = 'mmayen';
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


var iniciaProceso = function (processDefinitionID, processDeployment) {
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
        success: function (data) {
            //console.log(data);
            console.log('Proceso iniciado con exito, ID=' + data.id);
            //processID = data.id;
            //guardo las variables processID y clientID en localStorage (validar que no se pueda usar este boton (btnTerminar) si no ha cargado un clientID)
            //var bpms = {
            //    codCliente: $('#clientes_clienteId').val(),
            //    processID: data.id
            //};
            ////lo convierto a JSON
            //bpms = JSON.stringify(bpms);
            ////por si lo quiero encriptar
            ////bpms = btoa(bpms);
            ////lo guardo en el localStorage
            //localStorage.setItem('bpmsls', bpms);
            //console.log('funcion guardar en localStorage completada');
            //console.log(bpms);
            console.log('Obteniendo tarea recien creada...');
            obtieneTareaPorProceso(data.id, 1);
        },
        error: function () {
            //para pruebas offline
            console.log('pruebas offline: Inicia Proceso =====')
            var json = {
                "process-id": "ejemploSubida.demoAPI2",
                "id": "26244",
                "state": "1",
                "parentProcessInstanceId": "0",
                "status": "SUCCESS",
                "url": "/business-central/rest/runtime/bpmDemostracion:ejemploSubida:1.0/process/ejemploSubida.demoAPI2/start"
            };
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

            console.log('Obteniendo tarea recien creada...');
            obtieneTareaPorProceso(json.id, 1);

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
            });
        },
        error: function () {
            //para pruebas offline de formateo
            console.log('pruebas Offline Obtiene Tarea =====');
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
                       "description": "",
                       "status": "Reserved",
                       "priority": 0,
                       "skipable": true,
                       "actualOwnerId": "bpmadmin",
                       "createdById": "bpmadmin",
                       "createdOn": 1463584786190,
                       "activationTime": 1463584786190,
                       "expirationTime": null,
                       "processInstanceId": 26243,
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
                if (element.status == 'Reserved') {
                    console.log('Iniciando tarea encontrada con ID=' + element.id);
                    iniciaTarea(element.id, processID, bandCompletar);
                }
            });
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
                    "map_cod_cliente": '"' + $('#clientes_clienteId').val() + '"'
                };
                completaTarea(tareaID, processID, parametros, bandCompletar);
            }
        },
        error: function () {
            //para pruebas offline de formateo
            console.log('pruebas Offline Inicia Tarea =====');
            var json = {
                "status": "SUCCESS",
                "url": "/business-central/rest/task/841/start"
            };
            console.log(json);
            if (json.status == 'SUCCESS') {
                console.log('Tarea con ID ' + tareaID + ' iniciada');
                taskID = tareaID;
            }
            if (bandCompletar == 1) {
                console.log('completando tarea recien iniciada...');
                parametros = {
                    "map_cod_cliente": '"' + $('#clientes_clienteId').val() + '"'
                };
                completaTarea(tareaID, processID, parametros, bandCompletar);
            }
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
            //para pruebas offline de formateo
            console.log('pruebas Offline Completar Tarea =====');
            var json = {
                "status": "SUCCESS",
                "url": "/business-central/rest/task/842/complete",
                "message": null
            };
            //console.log(json);
            if (json.status == 'SUCCESS') {
                console.log('Tarea con ID ' + taskID + ' completada');
            }
            //$.siguientePaso(processID, $("#paso_siguiente").val(), $('#clientes_clienteId').val());
            if (bandCompletar == 1) {
                botonSiguiente(processID);
            }
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
    var cod_cliente = procVariables.variables.cod_cliente;
    var procID = taskElement.processInstanceId;
    var URLtaskForm = taskElement.description;
    var estado = taskElement.status;
    console.log('URL: ' + taskElement.description);
    console.log('processID: ' + procID);
    console.log('cod_cliente: ' + cod_cliente);
    $('#tablaTareas').append($('<tr>').append(
                '<td>' + taskElement.id + '</td>' +
                '<td>' + taskElement.name + '</td>' +
                '<td>' + 'ID de Cliente: ' + cod_cliente + '</td>' +
                '<td>' + taskElement.priority + '</td>' +
                '<td>' + (taskElement.status == 'Reserved' || 'Ready' ? 'Pendiente' : 'En Proceso') + '</td>' +
                '<td>' + new Date(taskElement.createdOn) + '</td>'
                    ).attr({
                        'class': 'clickableRow',
                        'onclick': 'window.location="' + URLtaskForm + '?clientesID=' + cod_cliente + '&processid=' + procID + '&taskID=' + taskElement.id + '&estado=' + estado + '"'
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
            //para pruebas offline de formateo
            console.log('pruebas offline obtiene Variables ==');
            var json = {
                "status": "SUCCESS",
                "url": "/business-central/rest/runtime/bpmDemostracion:ejemploSubida:1.0/withvars/process/instance/26308",
                "variables": [
                   {
                       "key": "cod_cliente",
                       "value": "123456"
                   },
                   {
                       "key": "initiator",
                       "value": "bpmadmin"
                   }
                ],
                "processInstance": {
                    "process-id": "ejemploSubida.demoAPI2",
                    "id": "26308",
                    "state": "1",
                    "parentProcessInstanceId": "0"
                }
            };
            construyeLinea(taskElement, json);
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
                htmlinterno += '<br id="txtSalario">Salario: <b>0.00</b>';
            }
            if (data.variables.comisiones !== undefined) {
                htmlinterno += '<br id="txtComision">Comisiones: <b>0.00</b>';
            }
            if (data.variables.ingreso_remesas !== undefined) {
                htmlinterno += '<br id="txtRemesas">Remesas: <b>0.00</b>';
            }
            if (data.variables.horas_extra !== undefined) {
                htmlinterno += '<br id="txtHorasExtra">Horas extra: <b>0.00</b>';
            }
            if (data.variables.intereses_alquileres !== undefined) {
                htmlinterno += '<br id="txtInteres">Intereses: <b>0.00</b>';
            }
            if (data.variables.dividendos !== undefined) {
                htmlinterno += '<br id="txtDividendos">Dividendos: <b>0.00</b>';
            }
            if (data.variables.otros !== undefined) {
                htmlinterno += '<br id="txtOtrosIng">Otros: <b>0.00</b>';
            }
            $('#ingresostd').html = htmlinterno;
            //FIN INGRESOS
            var htmlinternoegresos = '';
            if (data.variables.gastos_vida !== undefined) {
                htmlinternoegresos += '<br id="txtVida">Gastos de vida: <b>0.00</b>';
            }
            if (data.variables.descuentos_ley !== undefined) {
                htmlinternoegresos += '<br id="txtLey">Descuentos de ley: <b>0.00</b>';
            }
            if (data.variables.otros_egresos !== undefined) {
                htmlinternoegresos += '<br id="txtOtrosEg">Otros: <b>0.00</b>';
            }
            $('#egresostd').html = htmlinternoegresos;
            
        },
        error: function () {
            //para pruebas offline de formateo
            console.log('Error llamando a metodo');
        }
    })
}