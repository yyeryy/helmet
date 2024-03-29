const express = require('express');
const helmet = require('helmet');
const app = express();

//CÓDIGO PERSONAL

//Evitar la utilizacion de la cabecera 'X-Powered-By: Express'
app.use(helmet.hidePoweredBy());

//Evitar la utilizacion de iframes para ataques
app.use(helmet.frameguard({
    action: 'deny'
}));

//Evitar ataques XSS
app.use(helmet.xssFilter());

//noSniff
app.use(helmet.noSniff());

//Prevencion para internet explorer(Navegador de poca confianza)
app.use(helmet.ieNoOpen());

//Utilizacion de HSTS
app.use(helmet.hsts({
    maxAge: 7776000, //90 dias en segundos
    force: true
}));

//Deshabilitar el DNS(Tiene penalizacion de rendimiento)
app.use(helmet.dnsPrefetchControl());

//Deshabilitar almacenamiento de cache(Tiene penalizacion de rendimiento)
app.use(helmet.noCache());

//Content security policy para no ejecutar nada externo
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-cdn.com"],
    }
}));

//Utiliza todos los middleware de helmet execpto noCache() y contentSecurityPolicy()
//app.use(helmet())

//Ejemplo de uso desactivando dnsPrefetchControl y configurando el frameguard
/*app.use(helmet({
    frameguard: {         // configure
      action: 'deny'
    },
    contentSecurityPolicy: {    // enable and configure
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ['style.com'],
      }
    },
    dnsPrefetchControl: false     // disable
  }))*/






































//Codigo dado
module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`);
});
