'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 3000
  });

  server.ext('onRequest', (req, h) => {
    if (req.info.remoteAddress === '127.0.0.1'
      || req.info.remoteAddress === '::1') {
      return h
        .response('You cannot make request')
        .code(403)
        .takeover();
    }

    return h.continue;
  });

  server.route({
    method: 'GET',
    path: '/home',
    handler: (req, h) => {
      if (req.info.remoteAddress === '127.0.0.1' // blocks IPv4
        || req.info.remoteAddress === '::1') { // blocks IPv6
        return h
          .response('You cannot make request')
          .code(403);
      }

      return h
        .response('Welcome to my home 🚣')
        .code(200);
    }
  });

  await server.start();

  // eslint-disable-next-line no-console
  console.log('Server is running on %s', server.info.uri);
};

init();
