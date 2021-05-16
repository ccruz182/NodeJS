const express = require('express');
const bodyParser = require('body-parser');


const ServiceRegistry = require('./lib/ServiceRegistry');

const service = express();
service.use(bodyParser.json());


module.exports = (config) => {
  const log = config.log();
  const serviceRegistry = new ServiceRegistry(log);

  // Add a request logging middleware in development mode
  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  service.get('/services', (req, res, next) => {
    const registeredServices = serviceRegistry.getRegisteredServices();

    return res.json({'response': {registeredServices}})
  })

  service.post('/services', (req, res, next) => {
    const body = req.body;

    const serviceIP = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    const serviceInformation = {...body, ip: serviceIP};

    const serviceKey = serviceRegistry.register(serviceInformation);

    return res.json({'response': {serviceKey}})
  })

  service.delete('/services', (req, res, next) => {
    const body = req.body;
    
    const serviceIP = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    const serviceInformation = {...body, ip: serviceIP};

    const deletedServiceKey = serviceRegistry.unregister(serviceInformation);

    return res.json({'response': {deletedServiceKey}})
  })

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return service;
};
