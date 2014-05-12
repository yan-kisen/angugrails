<%@ page contentType="text/html;charset=UTF-8" %>
<html>
    <head>
        <meta name="layout" content="angular-app"/>
        <r:require module="angugrails" />
    </head>

    <body>
        <div class="container">
            <div ui-view="navigation"></div>
            <div id="flash-message" ui-view="alert"></div>
            <div id="content" ui-view="content"></div>
        </div>
    </body>
</html>
