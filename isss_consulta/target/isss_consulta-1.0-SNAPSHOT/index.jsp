<%-- 
    Document   : index
    Created on : 06-09-2016, 12:00:22 PM
    Author     : Datum
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="javax.servlet.http.HttpServletRequest" %>
﻿<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Digicel</title>
    <meta name="description" content="Write an awesome description for your new site here. You can edit this line in _config.yml. It will appear in your document head meta (for Google search results) and in your feed.xml site description.
">

    <link rel="stylesheet" href="./css/main.css">
    <link rel="canonical" href="/">
    <link rel="alternate" type="application/rss+xml" title="Your awesome title" href="/feed.xml">
</head>
<%!
    String userIsss = null; 
    String passIsss = null;
    String rolIsss = null;
%>
<%
    if(request.getUserPrincipal() != null){
            userIsss = request.getUserPrincipal().getName();
            if(request.isUserInRole("recepcionista"))
                rolIsss = "recepcionista";
            if(request.isUserInRole("enfermera"))
                rolIsss = "enfermera";
            if(request.isUserInRole("doctor"))
                rolIsss = "doctor";
            if(request.isUserInRole("farmaceutico"))
                rolIsss = "farmaceutico";
            
            //Crear cookies
            Cookie cookie = null;
            cookie = new Cookie("userIsss", userIsss);
            response.addCookie(cookie);
            cookie = new Cookie("rolIsss", rolIsss);
            response.addCookie(cookie);
            
            response.sendRedirect("/isss_consulta/index.html");
    }
    
%>

<body>
    <h1>ISSS</h1>
    
</body>

</html>