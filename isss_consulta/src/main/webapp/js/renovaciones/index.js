$(document).ready(function() {

    //cargaCredenciales();

    var usuarioDigicel = $.cookie("userIsss");
    var rolDigicel = $.cookie("rolIsss");
    localStorage.setItem("usuarioAPP", usuarioDigicel);
    localStorage.setItem("rolAPP", rolDigicel);
    console.log("Cookie Usuario: " + localStorage.getItem("usuarioAPP"));
    console.log("Cookie Rol: " + localStorage.getItem("rolAPP"));
});
