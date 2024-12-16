'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 3000
  });

  server.route({
    method: 'GET',
    path: '/home',
    handler: (_, h) => {
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
