<%@ page contentType="text/html;charset=UTF-8" %>
<html>
    <head>
        <meta name="layout" content="angular-app"/>
        <r:require module="angugrails" />
    </head>

    <body>
        <div class="row">
            <div class="col-sm-12 col-md-12">

                <div ui-view="navigation"></div>
                <div ui-view="flash"></div>
                <div ui-view="content"></div>
            </div>
        </div>
    </body>
</html>
