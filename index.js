var restify = require('restify');

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host:'codeshouse.com.br',
        user:'codes475_admin',
        password:'Admin@ti',
        database:'codes475_desenv'
    }
});

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


server.get("/all", function(req, res, next) {
    knex('curso_jogo').then(dados => {
      res.send(dados);
    }, next);
  
  });

server.post("/save", function(req, resp, next){
    knex('curso_jogo')
    .insert(req.body)
    .then(dados => {
        return resp.send(dados);
    }, next);
});



server.get(/\/(.*)?.*/,restify.plugins.serveStatic({
    directory: './dist',
    default: 'index.html',
}));

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});